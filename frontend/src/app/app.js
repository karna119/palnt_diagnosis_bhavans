
"use client";
import React, { useState, useEffect } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const resp = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });
      const data = await resp.json();
      setResult(data);
    } catch (err) {
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <img src="/logo.jpg" alt="Bhavan's College Logo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'contain', background: 'white' }} />
        <div style={{ textAlign: 'left' }}>
          <div className="college-name" style={{ margin: 0 }}>BHAVAN'S VIVEKANANDA COLLEGE</div>
          <h1 className="logo" style={{ margin: '0.2rem 0' }}>AI Plant Health Detection</h1>
          <p style={{ margin: 0 }}>Empowering Agriculture with Precision Artificial Intelligence</p>
        </div>
      </header>

      <main>
        <div className="prediction-section glass-card" style={{ padding: '2rem' }}>
          <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()}>
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
            {preview ? (
              <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '10px', maxHeight: '300px' }} />
            ) : (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
                <h3>Upload Plant Leaf Image</h3>
                <p>Drag and drop or click to browse</p>
              </div>
            )}
          </div>

          {image && !loading && !result && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button className="btn-primary" onClick={handleUpload}>Analyze Health Status</button>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <div className="spinner">Analyzing Image (Xception Model v1.0)...</div>
            </div>
          )}

          {result && result.detail && (
            <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1rem', border: '1px solid #ffcdd2', background: '#ffebee' }}>
              <h3 style={{ color: '#c62828' }}>Analysis Error</h3>
              <p style={{ color: '#b71c1c' }}>{result.detail}</p>
              <button className="btn-primary" style={{ marginTop: '1rem', background: '#c62828' }} onClick={() => setResult(null)}>Try Again</button>
            </div>
          )}

          {result && !result.detail && (
            <div className="prediction-results">
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <span className={`badge badge-${(result.category || 'unknown').toLowerCase()}`}>{result.category || 'Unknown'}</span>
                <h2 style={{ marginTop: '0.5rem', color: 'var(--primary)' }}>{result.plant_name}</h2>
                <h3 style={{ color: 'var(--text-muted)' }}>{result.predicted_disease}</h3>

                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Confidence Score</span>
                    <span style={{ fontWeight: 'bold' }}>{result.confidence_score}</span>
                  </div>
                  <div className="confidence-bar">
                    <div className="confidence-fill" style={{ width: result.confidence_score }}></div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h4>Symptoms</h4>
                  <p style={{ fontSize: '0.9rem' }}>{result.symptoms}</p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem' }}>Biological Insight</h3>

                <div style={{ marginTop: '1rem' }}>
                  <strong>Scientific Reason:</strong>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{result.biological_explanation}</p>
                </div>

                <div style={{ marginTop: '1.5rem', background: '#fff3e0', padding: '1rem', borderRadius: '10px' }}>
                  <strong style={{ color: '#e65100' }}>⚠️ Recommended Action:</strong>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{result.recommended_action}</p>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <strong>Precaution:</strong>
                  <p style={{ fontSize: '0.9rem' }}>{result.precaution}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {stats && (
          <section style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>System Dashboard</h2>
            <div className="prediction-results">
              <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3>{stats.total_predictions}</h3>
                <p>Total AI Diagnostics</p>
              </div>
              <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3>{stats.model_accuracy}</h3>
                <p>Inference Accuracy</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer style={{ marginTop: '5rem', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
        <p>© 2026 Bhavan's Vivekananda College - Department of Computer Science & Biotechnology</p>
        <p style={{ fontSize: '0.8rem' }}>AI Plant Health System Project | Version 1.0.0 (Production Ready)</p>
      </footer>
    </div>
  );
}
