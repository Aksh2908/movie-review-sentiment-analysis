import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AudioReview() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [transcription, setTranscription] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "audio/mpeg") {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
      setError("");
    } else {
      setAudioFile(null);
      setAudioURL("");
      setError("Please select a valid .mp3 file.");
    }
  };

  // Clear the selected file and results
  const handleClear = () => {
    setAudioFile(null);
    setAudioURL("");
    setTranscription("");
    setSentiment("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // Analyze the uploaded audio
  const handleAnalyze = async () => {
    if (!audioFile) return;
    setLoading(true);
    setTranscription("");
    setSentiment("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("audio", audioFile);
      const response = await axios.post("http://localhost:5000/api/reviews/audio", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setTranscription(response.data.transcription);
      setSentiment(response.data.sentiment);

      // Optional: After a short delay, navigate to stats page so user sees updated stats
      setTimeout(() => navigate("/stats"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Could not analyze audio. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom right, #e0f2fe, #f0fdfa)" }}>
      <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2rem", width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Analyze Audio Review</h2>
        <input
          type="file"
          accept=".mp3,audio/mpeg"
          onChange={handleFileChange}
          ref={inputRef}
          style={{ marginBottom: "1rem" }}
        />
        {audioFile && (
          <div style={{ width: "100%", marginBottom: "1rem", textAlign: "center" }}>
            <audio controls src={audioURL} style={{ width: "100%" }} />
            <div style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>{audioFile.name}</div>
            <button onClick={handleClear} style={{ marginRight: "0.5rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem 1rem", cursor: "pointer" }}>
              Clear
            </button>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem 1rem", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Analyzing..." : "Analyze Audio"}
            </button>
          </div>
        )}
        {!audioFile && (
          <div style={{ color: "#888", marginBottom: "1rem" }}>No file selected yet.</div>
        )}
        {transcription && (
          <div style={{ marginTop: "1rem", background: "#f1f5f9", padding: "1rem", borderRadius: "12px", width: "100%" }}>
            <div style={{ fontWeight: "bold" }}>Transcription:</div>
            <div style={{ fontStyle: "italic" }}>{transcription}</div>
            <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
              Sentiment: <span style={{ color: sentiment === "positive" ? "#22c55e" : "#ef4444" }}>{sentiment}</span>
            </div>
          </div>
        )}
        {error && (
          <div style={{ marginTop: "1rem", background: "#fee2e2", color: "#b91c1c", padding: "1rem", borderRadius: "12px", width: "100%" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
