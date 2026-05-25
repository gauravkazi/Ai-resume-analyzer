import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch history
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/resume/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHistory(res.data);
    } catch (err) {
      console.log("History error:", err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5001/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(res.data.analysis);
      fetchHistory();
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <h1 className="title">AI Resume Analyzer Dashboard</h1>

      {/* UPLOAD BOX */}
      <div className="upload-box">
        <input type="file" accept=".pdf" onChange={handleFileChange} />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Upload Resume"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {/* ANALYSIS RESULT */}
      {analysis && (
        <div className="analysis-box">
          <h2>AI Analysis</h2>
          <p>{analysis}</p>
        </div>
      )}

      {/* HISTORY */}
      <div className="history-section">
        <h2>Previous Analyses</h2>

        {history.length === 0 ? (
          <p>No previous uploads found</p>
        ) : (
          history.map((item) => (
            <div key={item._id} className="history-card">
              <h4>{item.fileName}</h4>
              <p><strong>Score:</strong> {item.score}</p>
              <p><strong>Feedback:</strong> {item.feedback}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;