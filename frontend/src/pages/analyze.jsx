import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analyze.css";

const Analyze = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/analyze/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.log(err);
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
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    if (jobDescription) {
      formData.append("jobDescription", jobDescription);
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5001/api/analyze/resume", // ✅ correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(res.data); // ✅ correct - res.data has atsScore, skills etc directly
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-container">

      <h2 className="analyze-title">AI Resume Analyzer</h2>

      {/* UPLOAD */}
      <div className="upload-section">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <textarea
          placeholder="Paste job description here (optional)..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={4}
          style={{ width: "100%", marginTop: "10px", padding: "8px" }}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* ANALYSIS RESULT */}
      {analysis && (
        <div className="analysis-box">
          <h3>Analysis Result</h3>

          <p><strong>ATS Score:</strong> {analysis.atsScore}/100</p>

          <p><strong>Summary:</strong> {analysis.summary}</p>

          <p><strong>Skills Found:</strong></p>
          <ul>
            {analysis.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>

          <p><strong>Missing Skills:</strong></p>
          <ul>
            {analysis.missingSkills?.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>

          <p><strong>Suggestions:</strong></p>
          <ul>
            {analysis.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* HISTORY */}
      <div className="history-title">Previous Uploads</div>

      {history.length === 0 ? (
        <p style={{ textAlign: "center" }}>No history found</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="history-card">
            <p><strong>ATS Score:</strong> {item.atsScore}/100</p>
            <p><strong>Summary:</strong> {item.summary}</p>
            <p><strong>Skills:</strong> {item.skills?.join(", ")}</p>
          </div>
        ))
      )}

    </div>
  );
};

export default Analyze;