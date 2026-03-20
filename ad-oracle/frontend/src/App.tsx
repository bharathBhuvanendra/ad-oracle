import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {~
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",~
      body: formData,
    });

    const data = await response.json();
    console.log("Server response:", data);
  } catch (error) {
    console.error("Upload error:", error);
  }
};

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ad Oracle</h1>
      <p>Upload an ad image and get AI-powered creative insights.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpload} style={{ marginTop: "1rem" }}>
      Upload
      </button>

      <div style={{ marginTop: "1rem" }}>
        {selectedFile ? (
          <p>
            Selected file: <strong>{selectedFile.name}</strong>
          </p>
        ) : (
          <p>No file selected yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
