import React, { useState, useEffect } from 'react';
import { openai, DIAGNOSIS_PROMPT } from './lib/openai';
import {
  Leaf,
  Lock,
  Volume2,
  Square,
  ShieldCheck,
  Microscope,
  Info,
  ScrollText
} from 'lucide-react';

interface Prediction {
  plant_name: string;
  predicted_disease: string;
  category: string;
  confidence_score: string;
  biological_explanation: string;
  recommended_action: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Prediction | null>(null);
  const [stats, setStats] = useState<{ total: number; topPlant: string } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', phone: '' });

  useEffect(() => {
    // Check for local session
    const storedSession = localStorage.getItem('expert_session');
    const storedUser = localStorage.getItem('user_details');

    if (storedSession === 'active' && storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }

    loadStats();

    // Security Deterrents (Disable Inspect/Right-Click)
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const loadStats = () => {
    const historicalStats = localStorage.getItem('local_stats');
    if (historicalStats) {
      setStats(JSON.parse(historicalStats));
    } else {
      setStats({ total: 124, topPlant: 'Tomato' }); // Default placeholder stats
    }
  };

  const updateStats = () => {
    const newStats = {
      total: (stats?.total || 124) + 1,
      topPlant: result?.plant_name || stats?.topPlant || 'Tomato'
    };
    setStats(newStats);
    localStorage.setItem('local_stats', JSON.stringify(newStats));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Dummy Login: No authentication check, just establishment of local session
    setTimeout(() => {
      localStorage.setItem('user_details', JSON.stringify(userData));
      localStorage.setItem('expert_session', 'active');
      setIsLoggedIn(true);
      setLoading(false);
      speak(`Welcome ${userData.name}. Institutional access granted to Bhavan's Expert System.`);
    }, 800);
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      stopSpeaking();
      speak("Image received. Ready for expert analysis.");
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    stopSpeaking();
    speak("Consulting the expert diagnostic system. Please wait a moment.");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const base64Image = (reader.result as string).split(',')[1];

        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: DIAGNOSIS_PROMPT },
            {
              role: "user",
              content: [
                { type: "text", text: "Analyze this plant leaf image." },
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${base64Image}` }
                }
              ]
            }
          ],
          response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        if (content) {
          const data = JSON.parse(content) as Prediction;
          setResult(data);
          updateStats();
          speak(`Diagnosis complete. Identified ${data.predicted_disease} in ${data.plant_name}. ${data.biological_explanation}`);
        }
      };
    } catch (err: any) {
      alert(`System error: ${err.message}`);
      speak("Expert analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_details');
    localStorage.removeItem('expert_session');
    setIsLoggedIn(false);
    speak("Expert session terminated.");
  };


  if (!isLoggedIn) {
    return (
      <div className="login-screen animate-fade">
        <div className="glass-card login-form">
          <div className="college-logo-container" style={{ margin: '0 auto 1.5rem', width: '100px', height: '100px' }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: '100%', borderRadius: '50%' }} />
          </div>
          <p style={{ letterSpacing: '2px', fontWeight: '800', color: 'var(--secondary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Bhavan's Vivekananda College
          </p>
          <h2>Expert Diagnostic Portal</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Authorized Botanical Research Access</p>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="login-input"
              placeholder="Expert Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
            <input
              type="email"
              className="login-input"
              placeholder="Institutional Email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
            <input
              type="tel"
              className="login-input"
              placeholder="Registry Phone Number"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              required
            />
            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Authorize Access'}
            </button>
          </form>
          <div style={{ marginTop: '2.5rem', opacity: 0.4 }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Secure Gateway • Institutional Protocol v4.0 (Autonomous)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade">
      <header className="glass-card">
        <div className="college-logo-container">
          <img src="/logo.jpg" alt="Logo" style={{ width: '80px', borderRadius: '50%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ letterSpacing: '2px', fontWeight: '600', color: 'var(--secondary)' }}>BHAVAN'S VIVEKANANDA COLLEGE</p>
              <h1>Expert Diagnostic System</h1>
              <p>Professional Botanical Health & Disease Analysis</p>
            </div>
            <button onClick={handleLogout} className="tts-btn" style={{ color: '#ff6666' }}>
              <Lock size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        {!openai && (
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', borderColor: '#ff4444', background: 'rgba(255, 68, 68, 0.05)' }}>
            <h3 style={{ color: '#ff4444', marginBottom: '0.5rem' }}>⚠️ Configuration Required</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              Diagnosis features are disabled. Please set <strong>VITE_OPENAI_API_KEY</strong> in your .env file to enable expert analysis.
            </p>
          </div>
        )}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div className="upload-zone" onClick={() => document.getElementById('fileInput')?.click()}>
            <input type="file" id="fileInput" hidden onChange={handleImageChange} accept="image/*" />
            {preview ? (
              <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '15px', maxHeight: '400px' }} />
            ) : (
              <div style={{ padding: '2rem' }}>
                <Leaf size={64} style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }} />
                <h3>Diagnostic Submissions</h3>
                <p>Upload a clear leaf sample for analysis</p>
              </div>
            )}
          </div>

          {image && !loading && !result && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn-primary" onClick={handleUpload}>
                <ShieldCheck size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Run Health Diagnosis
              </button>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div className="spinner"></div>
              <p style={{ color: 'var(--secondary)' }}>Consulting Plant Health Expert...</p>
            </div>
          )}
        </div>

        {result && (
          <div className="animate-fade">
            <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
              <div className="result-header">
                <div>
                  <div className="badge">{result.category}</div>
                  <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{result.predicted_disease}</h2>
                  <p style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>Detected in {result.plant_name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>CONFIDENCE SCORE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>{result.confidence_score}</div>
                </div>
              </div>

              <div className="confidence-bar">
                <div className="confidence-fill" style={{ width: result.confidence_score }}></div>
              </div>

              <div className="tts-controls">
                <button className="tts-btn" onClick={() => speak(result.predicted_disease)}>
                  <Volume2 size={16} /> Re-play Diagnosis
                </button>
                {isSpeaking && (
                  <button className="tts-btn" onClick={stopSpeaking} style={{ color: '#ff4444' }}>
                    <Square size={16} /> Stop Audio
                  </button>
                )}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Microscope size={24} /> Biological Insight
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.1rem' }}>{result.biological_explanation}</p>
              </div>
              <div style={{ background: 'rgba(197, 160, 89, 0.1)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                <strong style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <ScrollText size={18} /> RECOMMENDED ACTION
                </strong>
                <p>{result.recommended_action}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {stats && (
        <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.8 }}>
          <div className="glass-card" style={{ display: 'inline-flex', gap: '3rem', padding: '1rem 3rem', borderRadius: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Info size={16} />
              <strong>{stats.total}</strong> Reports Generated
            </div>
            <div><strong>{stats.topPlant}</strong> Top Subject</div>
          </div>
        </footer>
      )}
    </div>
  );
}
