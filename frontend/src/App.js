import React, { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to analyze code" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Code Quality Assistant</h1>

      <label>Γλώσσα:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>

      <br />

      <textarea
        rows="8"
        cols="50"
        placeholder="Γράψε τον κώδικά σου εδώ..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br />
      <button onClick={analyzeCode} disabled={loading}>
        {loading ? "Ανάλυση..." : "Ανάλυση Κώδικα"}
      </button>

      {result && result.analysis && (
  <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
    <h3>Αποτελέσματα Ανάλυσης:</h3>
    {result.analysis.length > 0 ? (
      <ul>
        {result.analysis.map((item, index) => (
          <li key={index} style={{ color: item.message.includes("E0001") ? "red" : "black" }}>
            <strong>{item.message}</strong>
          </li>
        ))}
      </ul>
    ) : (
      <p>✅ Δεν βρέθηκαν σφάλματα!</p>
    )}
  </div>
)}

    </div>
  );
}

export default App;
