import { useState } from "react";

export default function Predictor() {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      // Convert comma-separated input into float array
      const values = input.split(",").map(v => parseFloat(v.trim()));

      if (values.length !== 60 || values.some(isNaN)) {
        throw new Error("Input must contain exactly 60 numeric values");
      }

      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setPrediction(data.prediction);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>AI Price Prediction</h2>

      <textarea
        rows={4}
        placeholder="Enter 60 values, comma-separated"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={runPrediction} disabled={loading}>
        {loading ? "Predicting..." : "Run Prediction"}
      </button>

      {prediction !== null && (
        <p><strong>Prediction:</strong> {prediction}</p>
      )}

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}
