import React, { useState } from "react";
import { 
  Container, TextField, Button, Select, MenuItem, Typography, Paper, 
  CircularProgress, IconButton, CssBaseline, ThemeProvider, createTheme 
} from "@mui/material";
import { Brightness4, Brightness7, Code } from "@mui/icons-material";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" style={{ marginTop: "40px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4">
              <Code /> Code Quality Assistant
            </Typography>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </div>

          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            fullWidth
            style={{ marginBottom: "20px" }}
          >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="javascript">JavaScript</MenuItem>
          </Select>

          <TextField
            label="Γράψε τον κώδικα εδώ..."
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={analyzeCode}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Ανάλυση Κώδικα"}
          </Button>

          {result && result.analysis && (
            <Paper style={{ marginTop: "20px", padding: "10px", backgroundColor: darkMode ? "#333" : "#f9f9f9" }}>
              <Typography variant="h6">Αποτελέσματα Ανάλυσης:</Typography>
              {result.analysis.length > 0 ? (
                <ul>
                  {result.analysis.map((item, index) => (
                    <li key={index} style={{ color: item.message.includes("E0001") ? "red" : "black" }}>
                      <strong>{item.message}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography color="green">✅ Δεν βρέθηκαν σφάλματα!</Typography>
              )}
            </Paper>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
