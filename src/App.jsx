import React, { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// App.css
const styles = `
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f5a623;
  --background-color: #f8f9fa;
  --text-color: #333;
  --card-background: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --error-color: #e74c3c;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
}

.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* --- Login Page --- */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, var(--primary-color), #50e3c2);
}

.login-form {
  background: var(--card-background);
  padding: 2.5rem 3rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.password-wrapper {
  position: relative;
}

.password-toggle {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #999;
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.password-strength {
  height: 5px;
  width: 0%;
  background-color: var(--error-color);
  border-radius: 5px;
  transition: width 0.3s, background-color 0.3s;
}

.strength-weak { width: 33%; background-color: var(--error-color); }
.strength-medium { width: 66%; background-color: #f39c12; }
.strength-strong { width: 100%; background-color: #2ecc71; }

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:disabled {
    background-color: #a0c8f0;
    cursor: not-allowed;
}

.login-button:hover:not(:disabled) {
  background-color: #357ABD;
}


/* --- Dashboard --- */
.dashboard-layout {
  display: flex;
  width: 100%;
}

.sidebar {
  width: 250px;
  background: var(--card-background);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  transition: width 0.3s;
  flex-shrink: 0;
}

.sidebar-header {
    padding: 0 1.5rem 2rem 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
}

.nav-item {
  padding: 1rem 1.5rem;
  color: #555;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
}

.nav-item:hover, .nav-item.active {
  background-color: #eef5ff;
  color: var(--primary-color);
  border-right: 3px solid var(--primary-color);
}

.nav-item .icon {
    margin-right: 1rem;
}

.logout-button {
  margin-top: auto;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
  color: #555;
  font-size: 1rem;
  display: flex;
  align-items: center;
}
.logout-button:hover {
    background-color: #fbecec;
    color: var(--error-color);
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

.welcome-banner {
  background: linear-gradient(135deg, var(--primary-color), #50e3c2);
  color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
}

.summary-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.widget {
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
}

.widget h3 {
  margin-top: 0;
  color: #555;
}

.widget .value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
}
.widget .sub-value {
    font-size: 1rem;
    color: #666;
}

.loading-text {
    font-size: 1rem;
    color: #777;
}

/* --- Report Page --- */
.report-section {
  background: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
}

.report-section h2 {
  margin-top: 0;
  color: var(--primary-color);
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.summary-item {
    text-align: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
}

.summary-item .label {
    font-size: 0.9rem;
    color: #666;
}

.summary-item .value {
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--text-color);
}

/* --- Reminders Page --- */
.reminders-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
}

.medication-management-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}


.medication-list, .add-med-form-container, .ai-suggestion-container {
    background: var(--card-background);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.medication-list h2, .add-med-form-container h2, .ai-suggestion-container h2 {
    margin-top: 0;
    color: var(--primary-color);
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
}

.medication-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    gap: 1rem;
}
.medication-item:last-child {
    border-bottom: none;
}

.med-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
}

.med-info .med-name {
    font-weight: bold;
    font-size: 1.1rem;
}
.med-info .med-dosage {
    color: #666;
    font-size: 0.9rem;
}

.med-time {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--secondary-color);
    flex-shrink: 0;
}

.remove-med-button {
    background: none;
    border: 1px solid #ffdddd;
    color: var(--error-color);
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, color 0.2s;
    flex-shrink: 0;
}

.remove-med-button:hover {
    background-color: #fbecec;
}

.add-med-form .form-group {
    margin-bottom: 1rem;
}

.disclaimer {
    font-size: 0.8rem;
    color: #888;
    background-color: #fcfcfc;
    border: 1px solid #eee;
    padding: 0.5rem;
    border-radius: 4px;
    margin-top: 1rem;
}

.ai-suggestion {
    margin-top: 1rem;
    background-color: #eef5ff;
    padding: 1rem;
    border-radius: 4px;
    border-left: 3px solid var(--primary-color);
}

/* --- Adherence Chart --- */
.chart-container {
    width: 100%;
    max-width: 450px;
    margin: 1rem auto;
}

.chart-container svg {
    width: 100%;
    height: auto;
}

.chart-bar-rect {
    transition: height 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.chart-bar-group:hover .chart-bar-rect {
    fill: var(--secondary-color);
}
.chart-grid-line {
    stroke: #e0e0e0;
    stroke-dasharray: 2,2;
}
.chart-axis-label {
    font-size: 12px;
    fill: #666;
}
.chart-bar-value {
    font-size: 12px;
    fill: #333;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s;
}

.chart-bar-group:hover .chart-bar-value {
    opacity: 1;
}

/* AI Insights Section */
.ai-insights ul {
    list-style: none;
    padding: 0;
}

.ai-insights li {
    background-color: #eef5ff;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    border-left: 3px solid var(--primary-color);
}


@media (max-width: 992px) {
    .reminders-container {
        grid-template-columns: 1fr;
    }
}
`;

// ============================================================================
// --- SERVICES ---
// ============================================================================

/**
 * A centralized service for making calls to the Gemini API.
 * Includes automatic retries with exponential backoff.
 */
const GeminiService = {
    callGemini: async (prompt, maxRetries = 3) => {
        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;   
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                const result = await response.json();
                
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    // This case handles situations where the API returns a response, but it's empty or malformed.
                    // It could be due to safety settings blocking the response.
                    return "The AI could not generate a response. This may be due to the content of the prompt.";
                }
            } catch (error) {
                console.error(`Attempt ${i + 1} failed:`, error);
                if (i === maxRetries - 1) { // Last retry failed
                    throw error; // Re-throw the last error
                }
                // Exponential backoff: 1s, 2s, 4s
                const delay = Math.pow(2, i) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    },

    fetchAiInsights: (medications, adherenceData) => {
        const medicationList = medications.map(m => `- ${m.name} (${m.dosage}) at ${m.time}`).join('\n');
        const adherenceList = adherenceData.map(d => `- ${d.day}: ${d.adherence}%`).join('\n');
        const prompt = `
            Act as a healthcare assistant AI. Based on the user's medication schedule and weekly adherence report, provide a few short, actionable, and respectful suggestions.

            Medication Schedule:
            ${medicationList}

            Weekly Adherence Report (% taken):
            ${adherenceList}

            Keep the tone respectful, short, and actionable. Provide the insights as a bulleted list. Start the response directly with the bullet points.
        `;
        return GeminiService.callGemini(prompt);
    },
    
    fetchHealthScore: (medications, adherenceData) => {
        const avgAdherence = adherenceData.reduce((acc, curr) => acc + curr.adherence, 0) / adherenceData.length;
        const prompt = `
            Act as a health analyst. Based on the user's number of medications and their average weekly adherence, calculate a "Health Score" from 0 to 100. Also provide a one-sentence justification.

            - Number of medications: ${medications.length}
            - Average weekly adherence: ${avgAdherence.toFixed(0)}%

            The score should be higher for better adherence and a manageable number of medications.
            
            Respond in this exact format: "SCORE|JUSTIFICATION". For example: "85|Your adherence is strong, which is great for managing your health."
        `;
         return GeminiService.callGemini(prompt);
    },

    fetchMedicationSuggestion: (symptoms) => {
        const prompt = `
            Act as a helpful AI assistant. A user is asking for a suggestion for an over-the-counter medication based on their symptoms. 
            Symptoms: "${symptoms}"
            
            Suggest one or two common, generic over-the-counter medications that might help.
            IMPORTANT: Do not give dosages.
            Start your response with the medication name(s). For example: "Ibuprofen or Acetaminophen."
        `;
        return GeminiService.callGemini(prompt);
    }
};


// ============================================================================
// --- COMPONENTS ---
// ============================================================================


// Login.js
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) return "Invalid email format.";
    return "";
  };

  const checkPasswordStrength = (password) => {
    let strength = '';
    if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters.");
        strength = '';
    } else if (password.length < 10) {
        strength = 'weak';
        setPasswordError("");
    } else {
        const hasNumbers = /\d/.test(password);
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        if (hasNumbers && hasLetters && hasSymbols) {
            strength = 'strong';
            setPasswordError("");
        } else if (hasNumbers && hasLetters) {
            strength = 'medium';
            setPasswordError("");
        } else {
            strength = 'weak';
            setPasswordError("");
        }
    }
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!newPassword) {
      setPasswordError("Password is required.");
      setPasswordStrength('');
    } else {
      checkPasswordStrength(newPassword);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError("Email is required.");
    } else {
      setEmailError(validateEmail(e.target.value));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);
    
    if(!password) {
        setPasswordError("Password is required.");
    }

    if (!emailValidationError && password && passwordStrength !== '') {
      onLogin('DemoUser'); // Mock login
    }
  };
  
  const getStrengthClass = () => {
    switch(passwordStrength) {
      case 'weak': return 'strength-weak';
      case 'medium': return 'strength-medium';
      case 'strong': return 'strength-strong';
      default: return '';
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>AI Health Assist</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setEmailError(validateEmail(email))}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
           <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          {password && <div className={`password-strength ${getStrengthClass()}`}></div>}
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

// Dashboard.js
const Dashboard = ({ user, medications }) => {
    const [healthScore, setHealthScore] = useState({ score: "...", justification: "Calculating..." });
    const [isLoading, setIsLoading] = useState(true);

    const adherenceData = [
        { day: 'Mon', adherence: 95 }, { day: 'Tue', adherence: 100 },
        { day: 'Wed', adherence: 80 }, { day: 'Thu', adherence: 90 },
        { day: 'Fri', adherence: 100 }, { day: 'Sat', adherence: 75 },
        { day: 'Sun', adherence: 85 },
    ];

    useEffect(() => {
        const getHealthScore = async () => {
            setIsLoading(true);
            try {
                const response = await GeminiService.fetchHealthScore(medications, adherenceData);
                const parts = response.split('|');
                if (parts.length === 2 && !isNaN(parseInt(parts[0]))) {
                     setHealthScore({ score: `${parts[0].trim()}/100`, justification: parts[1].trim() });
                } else {
                     setHealthScore({ score: "N/A", justification: "Could not parse AI response." });
                }
            } catch (error) {
                console.error("Failed to fetch health score:", error);
                setHealthScore({ score: "N/A", justification: "Could not calculate score." });
            } finally {
                setIsLoading(false);
            }
        };
        getHealthScore();
    }, [medications]);

    const getNextMedication = () => {
        if (!medications || medications.length === 0) {
            return { name: "No medications scheduled", time: null };
        }
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const upcomingMeds = medications
            .map(med => ({
                ...med,
                medTime: parseInt(med.time.split(':')[0]) * 60 + parseInt(med.time.split(':')[1])
            }))
            .filter(med => med.medTime > currentTime)
            .sort((a, b) => a.medTime - b.medTime);

        if (upcomingMeds.length > 0) return upcomingMeds[0];
        
        const sortedMeds = [...medications].sort((a, b) => a.time.localeCompare(b.time));
        return { ...sortedMeds[0], isTomorrow: true };
    };

    const nextMed = getNextMedication();

  return (
    <>
      <div className="welcome-banner">
        <h1>Welcome back, {user}!</h1>
        <p>Here is your health snapshot for today.</p>
      </div>
      <div className="summary-widgets">
        <div className="widget">
          <h3>Next Medication</h3>
            <p className="value">{nextMed.name}</p>
            {nextMed.time && <p className="sub-value">{nextMed.isTomorrow ? 'Tomorrow' : 'Today'} at {nextMed.time}</p>}
        </div>
        <div className="widget">
          <h3>Health Score</h3>
          {isLoading ? (
            <p className="loading-text">Calculating...</p>
          ) : (
            <>
                <p className="value">{healthScore.score}</p>
                <p className="sub-value">{healthScore.justification}</p>
            </>
          )}
        </div>
        <div className="widget">
          <h3>Missed Doses</h3>
          <p className="value">3</p>
          <p className="sub-value">In the last 7 days</p>
        </div>
      </div>
    </>
  );
};

// AdherenceChart.js
const AdherenceChart = ({ data }) => {
    const [animated, setAnimated] = useState(false);
    const chartHeight = 200;
    const chartWidth = 400;
    const barWidth = 35;
    const yAxisLabelWidth = 40;
    const xAxisLabelHeight = 20;

    const maxValue = 120;
    const xScale = (chartWidth - yAxisLabelWidth) / data.length;

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="chart-container">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet" aria-label="Weekly medication adherence chart">
                <g>
                    {[0, 25, 50, 75, 100].map(val => {
                        const y = chartHeight - xAxisLabelHeight - ((chartHeight - xAxisLabelHeight) * val / maxValue);
                        return (
                            <g key={val}>
                                <line x1={yAxisLabelWidth} y1={y} x2={chartWidth} y2={y} className="chart-grid-line" />
                                <text x={yAxisLabelWidth - 10} y={y + 4} textAnchor="end" className="chart-axis-label">{val}%</text>
                            </g>
                        )
                    })}
                </g>
                <g>
                    {data.map((item, index) => {
                        const barHeight = (item.adherence / maxValue) * (chartHeight - xAxisLabelHeight);
                        const x = yAxisLabelWidth + index * xScale + (xScale - barWidth) / 2;
                        const y = chartHeight - xAxisLabelHeight - (animated ? barHeight : 0);

                        return (
                            <g key={item.day} className="chart-bar-group">
                                <title>{`${item.day}: ${item.adherence}%`}</title>
                                <rect 
                                    x={x} 
                                    y={y} 
                                    width={barWidth} 
                                    height={animated ? barHeight : 0} 
                                    rx="4" 
                                    fill="var(--primary-color)" 
                                    className="chart-bar-rect" 
                                />
                                <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" className="chart-bar-value">{item.adherence}%</text>
                                <text x={x + barWidth / 2} y={chartHeight - 5} textAnchor="middle" className="chart-axis-label">{item.day}</text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};


// Report.js
const Report = ({ medications }) => {
    const [aiInsights, setAiInsights] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const adherenceData = [
        { day: 'Mon', adherence: 95 }, { day: 'Tue', adherence: 100 },
        { day: 'Wed', adherence: 80 }, { day: 'Thu', adherence: 90 },
        { day: 'Fri', adherence: 100 }, { day: 'Sat', adherence: 75 },
        { day: 'Sun', adherence: 85 },
    ];

    useEffect(() => {
        const getInsights = async () => {
            if (medications.length === 0) {
                setAiInsights("Add medications to your schedule to receive AI insights.");
                setIsLoading(false);
                return;
            }
            
            setIsLoading(true);
            try {
                const insightsText = await GeminiService.fetchAiInsights(medications, adherenceData);
                setAiInsights(insightsText);
            } catch (error) {
                console.error("Failed to fetch AI insights:", error);
                setAiInsights("There was an error generating insights. Please check your connection or try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        getInsights();
    }, [medications]);

    const renderInsights = (text) => {
        return text.split('\n').map((item, index) => {
            item = item.trim().replace(/^[\*\-]\s*/, '');
            if (item) return <li key={index}>{item}</li>;
            return null;
        });
    };

    return (
    <div>
        <h1>Health Reports</h1>
        <div className="report-section">
            <h2>User Medication Summary</h2>
            <div className="summary-grid">
                <div className="summary-item">
                    <div className="label">Total Medications</div>
                    <div className="value">{medications.length}</div>
                </div>
                <div className="summary-item">
                    <div className="label">Adherence</div>
                    <div className="value">92%</div>
                </div>
                <div className="summary-item">
                    <div className="label">Missed Doses</div>
                    <div className="value">3</div>
                </div>
            </div>
            <h3>Weekly Adherence Timeline</h3>
            <AdherenceChart data={adherenceData} />
        </div>
        <div className="report-section ai-insights">
            <h2>AI Insights</h2>
            {isLoading ? <p className="loading-text">Generating personalized insights...</p> : <ul>{renderInsights(aiInsights)}</ul>}
        </div>
    </div>
  );
};

// Reminders.js
const Reminders = ({ medications, addMedication, removeMedication }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState('09:00');
    
    const [symptoms, setSymptoms] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if(!name || !dosage || !time) return;
        addMedication({ name, dosage, time });
        setName('');
        setDosage('');
        setTime('09:00');
    };
    
    const handleSuggestionSubmit = async (e) => {
        e.preventDefault();
        if(!symptoms) return;
        setIsLoadingSuggestion(true);
        setSuggestion('');
        try {
            const result = await GeminiService.fetchMedicationSuggestion(symptoms);
            setSuggestion(result);
        } catch (error) {
            console.error("Failed to fetch suggestion", error);
            setSuggestion("Sorry, I couldn't fetch a suggestion at this time.");
        } finally {
            setIsLoadingSuggestion(false);
        }
    };

    const sortedMeds = [...medications].sort((a,b) => a.time.localeCompare(b.time));

    return (
        <div className="reminders-container">
            <div className="medication-management-column">
                <div className="add-med-form-container">
                    <h2>Add New Medication</h2>
                    <form className="add-med-form" onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="medName">Medication Name</label>
                            <input type="text" id="medName" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Aspirin"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dosage">Dosage</label>
                            <input type="text" id="dosage" value={dosage} onChange={e => setDosage(e.target.value)} placeholder="e.g., 1 tablet"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)}/>
                        </div>
                        <button type="submit" className="login-button">Add Medication</button>
                    </form>
                </div>
                 <div className="ai-suggestion-container">
                    <h2>AI Medication Helper</h2>
                    <form onSubmit={handleSuggestionSubmit}>
                        <div className="form-group">
                            <label htmlFor="symptoms">Describe your symptoms</label>
                            <textarea id="symptoms" rows="3" value={symptoms} onChange={e => setSymptoms(e.target.value)} placeholder="e.g., I have a headache and a sore throat"></textarea>
                        </div>
                        <button type="submit" className="login-button" disabled={isLoadingSuggestion}>
                            {isLoadingSuggestion ? 'Getting Suggestion...' : 'Get Suggestion'}
                        </button>
                    </form>
                    {suggestion && (
                        <div className="ai-suggestion">
                           <p><strong>Suggestion:</strong> {suggestion}</p>
                        </div>
                    )}
                     <p className="disclaimer"><strong>Disclaimer:</strong> This is an AI-powered suggestion and not medical advice. Please consult with a healthcare professional before taking any medication.</p>
                </div>
            </div>
            <div className="medication-list">
                <h2>Your Medication Schedule</h2>
                {sortedMeds.length > 0 ? (
                    sortedMeds.map(med => (
                        <div key={med.id} className="medication-item">
                           <div className="med-details">
                                <div className="med-info">
                                    <div className="med-name">{med.name}</div>
                                    <div className="med-dosage">{med.dosage}</div>
                                </div>
                                <div className="med-time">{med.time}</div>
                           </div>
                           <button onClick={() => removeMedication(med.id)} className="remove-med-button">X</button>
                        </div>
                    ))
                ) : (
                    <p>You have no medications scheduled. Add one to get started!</p>
                )}
            </div>
        </div>
    );
};

// Sidebar.js
const Sidebar = ({ onLogout, navigateTo, currentRoute }) => {
    const getNavItemClass = (path) => `nav-item ${currentRoute === path ? 'active' : ''}`;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">Health Assist</div>
            <nav>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('/dashboard'); }} className={getNavItemClass('/dashboard')}>
                    <span className="icon">🏠</span> Home
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('/reminders'); }} className={getNavItemClass('/reminders')}>
                   <span className="icon">⏰</span> Medications
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('/reports'); }} className={getNavItemClass('/reports')}>
                   <span className="icon">📊</span> Reports
                </a>
            </nav>
            <button onClick={onLogout} className="logout-button">
                 <span className="icon">🚪</span> Logout
            </button>
        </aside>
    );
};


// ============================================================================
// --- APP (Main Component) ---
// ============================================================================
const App = () => {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState('/');
  const [medications, setMedications] = useState([
      { id: 1, name: 'Lisinopril', dosage: '10mg Tablet', time: '08:00' },
      { id: 2, name: 'Metformin', dosage: '500mg Tablet', time: '20:00' },
      { id: 3, name: 'Vitamin D3', dosage: '1 Capsule', time: '08:30' },
  ]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      setRoute('/dashboard'); 
    }
  }, []);

  const navigateTo = (path) => {
    setRoute(path);
  };

  const handleLogin = (username) => {
    setUser(username);
    sessionStorage.setItem('user', username);
    navigateTo('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    navigateTo('/');
  };
  
  const addMedication = (med) => {
      const newMedication = { ...med, id: Date.now() };
      setMedications([...medications, newMedication]);
  };
  
  const removeMedication = (id) => {
      setMedications(medications.filter(med => med.id !== id));
  };

  const renderPageContent = () => {
    switch (route) {
      case '/dashboard':
        return <Dashboard user={user} medications={medications} />;
      case '/reminders':
        return <Reminders medications={medications} addMedication={addMedication} removeMedication={removeMedication} />;
      case '/reports':
        return <Report medications={medications} />;
      default:
        return <Dashboard user={user} medications={medications} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div className="dashboard-layout">
            <Sidebar onLogout={handleLogout} navigateTo={navigateTo} currentRoute={route} />
            <main className="main-content">
              {renderPageContent()}
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
