import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>
        AI Resume Analyzer
      </h1>

      <p style={styles.subtitle}>
        Upload your resume and get instant AI-powered feedback, ATS score, and improvement suggestions.
      </p>

      <div style={styles.card}>
        <h2>What this tool does</h2>
        <ul>
          <li>✔ AI Resume Scoring (ATS Score)</li>
          <li>✔ Skill Gap Detection</li>
          <li>✔ Resume Improvement Suggestions</li>
          <li>✔ PDF Upload & Instant Analysis</li>
        </ul>
      </div>

      <div style={styles.buttons}>
        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/login")}
        >
          Login / Register
        </button>
      </div>

    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    textAlign: "center",
    padding: "20px",
    background: "#f7f7f7",
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "16px",
    maxWidth: "600px",
    marginBottom: "20px",
    color: "#555",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    textAlign: "left",
  },

  buttons: {
    display: "flex",
    gap: "10px",
  },

  primaryBtn: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "10px 20px",
    background: "white",
    color: "black",
    border: "1px solid black",
    cursor: "pointer",
  },
};

export default Home;