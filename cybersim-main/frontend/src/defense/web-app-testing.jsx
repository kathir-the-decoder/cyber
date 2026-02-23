import React, { useState, useEffect } from 'react';
import '../labs.css';

const WebAppTestingLab = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [labCompleted, setLabCompleted] = useState(false);
  const [vulnerabilitiesFound, setVulnerabilitiesFound] = useState([]);

  const steps = [
    {
      title: "Reconnaissance & Information Gathering",
      description: "Start by gathering information about the target web application.",
      expectedCommand: "nmap -sV -p 80,443 target.webapp.local",
      hint: "Use 'nmap -sV -p 80,443 target.webapp.local' to scan web ports",
      successMessage: "Great! You've identified open web services. Found Apache 2.4.41 on port 80.",
      points: 20
    },
    {
      title: "Directory and File Discovery",
      description: "Discover hidden directories and files that might contain sensitive information.",
      expectedCommand: "dirb http://target.webapp.local /usr/share/dirb/wordlists/common.txt",
      hint: "Use 'dirb http://target.webapp.local /usr/share/dirb/wordlists/common.txt' to find directories",
      successMessage: "Excellent! Found several directories: /admin, /backup, /config. These need investigation.",
      points: 25
    },
    {
      title: "SSL/TLS Security Assessment",
      description: "Test the SSL/TLS configuration for security weaknesses.",
      expectedCommand: "sslscan target.webapp.local:443",
      hint: "Use 'sslscan target.webapp.local:443' to analyze SSL configuration",
      successMessage: "Good! SSL scan reveals weak cipher suites and outdated TLS versions.",
      points: 25
    },
    {
      title: "Web Application Vulnerability Scanning",
      description: "Use automated tools to identify common web vulnerabilities.",
      expectedCommand: "nikto -h http://target.webapp.local",
      hint: "Use 'nikto -h http://target.webapp.local' to scan for web vulnerabilities",
      successMessage: "Perfect! Nikto found multiple vulnerabilities including outdated software and misconfigurations.",
      points: 30
    },
    {
      title: "SQL Injection Testing",
      description: "Test input fields for SQL injection vulnerabilities.",
      expectedCommand: "sqlmap -u 'http://target.webapp.local/login.php' --forms --batch",
      hint: "Use 'sqlmap -u 'http://target.webapp.local/login.php' --forms --batch' to test for SQL injection",
      successMessage: "Critical finding! SQL injection vulnerability detected in login form.",
      points: 35
    },
    {
      title: "Cross-Site Scripting (XSS) Testing",
      description: "Test for XSS vulnerabilities in user input fields.",
      expectedCommand: "xsser -u 'http://target.webapp.local/search.php?q=test'",
      hint: "Use 'xsser -u 'http://target.webapp.local/search.php?q=test'' to test for XSS",
      successMessage: "XSS vulnerability confirmed! The search parameter is vulnerable to script injection.",
      points: 35
    }
  ];

  useEffect(() => {
    setTerminalOutput([
      "🔍 Web Application Security Testing Lab",
      "=====================================",
      "",
      "Welcome to the Web Application Security Testing Lab!",
      "Learn to identify and assess web application vulnerabilities.",
      "",
      "Target: http://target.webapp.local",
      "Objective: Perform comprehensive security testing including:",
      "• Information gathering and reconnaissance",
      "• Directory and file discovery",
      "• SSL/TLS security assessment",
      "• Automated vulnerability scanning",
      "• Manual testing for injection flaws",
      "",
      `Step ${currentStep + 1}/${steps.length}: ${steps[currentStep].title}`,
      steps[currentStep].description,
      "",
      "Type your command below:"
    ]);
  }, [currentStep]);

  const handleCommand = (command) => {
    const currentStepData = steps[currentStep];
    const newOutput = [...terminalOutput, `$ ${command}`];

    if (command.toLowerCase().trim() === currentStepData.expectedCommand.toLowerCase()) {
      newOutput.push("✅ " + currentStepData.successMessage);
      newOutput.push(`🎯 Points earned: ${currentStepData.points}`);
      
      // Add vulnerability to findings
      const vulnerability = {
        step: currentStep + 1,
        title: currentStepData.title,
        severity: currentStep >= 4 ? 'Critical' : currentStep >= 2 ? 'High' : 'Medium'
      };
      setVulnerabilitiesFound([...vulnerabilitiesFound, vulnerability]);
      
      const newScore = score + currentStepData.points;
      setScore(newScore);

      if (currentStep < steps.length - 1) {
        newOutput.push("");
        newOutput.push(`Step ${currentStep + 2}/${steps.length}: ${steps[currentStep + 1].title}`);
        newOutput.push(steps[currentStep + 1].description);
        newOutput.push("");
        setCurrentStep(currentStep + 1);
      } else {
        newOutput.push("");
        newOutput.push("🎉 Web Application Security Assessment Complete!");
        newOutput.push(`🏆 Final Score: ${newScore}/170 points`);
        newOutput.push("");
        newOutput.push("📊 VULNERABILITY ASSESSMENT REPORT");
        newOutput.push("==================================");
        newOutput.push("Critical Vulnerabilities Found:");
        newOutput.push("• SQL Injection in login form");
        newOutput.push("• Cross-Site Scripting (XSS) in search");
        newOutput.push("• Weak SSL/TLS configuration");
        newOutput.push("• Exposed sensitive directories");
        newOutput.push("");
        newOutput.push("🚨 Immediate Actions Required:");
        newOutput.push("1. Patch SQL injection vulnerabilities");
        newOutput.push("2. Implement input validation and output encoding");
        newOutput.push("3. Update SSL/TLS configuration");
        newOutput.push("4. Secure exposed directories");
        newOutput.push("5. Update outdated software components");
        setLabCompleted(true);
      }
    } else if (command.toLowerCase().trim() === 'hint') {
      newOutput.push("💡 Hint: " + currentStepData.hint);
    } else if (command.toLowerCase().trim() === 'help') {
      newOutput.push("Available commands:");
      newOutput.push("• hint - Get a hint for the current step");
      newOutput.push("• help - Show this help message");
      newOutput.push("• clear - Clear the terminal");
      newOutput.push("• report - Show current findings");
    } else if (command.toLowerCase().trim() === 'report') {
      newOutput.push("📋 Current Vulnerability Findings:");
      vulnerabilitiesFound.forEach((vuln, index) => {
        newOutput.push(`${index + 1}. ${vuln.title} - Severity: ${vuln.severity}`);
      });
    } else if (command.toLowerCase().trim() === 'clear') {
      setTerminalOutput([]);
      return;
    } else {
      newOutput.push("❌ Incorrect command. Type 'hint' for help or 'help' for available commands.");
    }

    setTerminalOutput(newOutput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleCommand(userInput.trim());
      setUserInput('');
    }
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <div className="lab-title">
          <span className="lab-icon">🔍</span>
          <div>
            <h1>Web Application Security Testing</h1>
            <p>Comprehensive security assessment of web applications</p>
          </div>
        </div>
        <div className="lab-controls">
          <div className="lab-score">Score: {score}/170</div>
          <button onClick={onClose} className="btn ghost">Exit Lab</button>
        </div>
      </div>

      <div className="lab-content">
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-title">🔍 Security Testing Terminal</div>
            <div className="terminal-status">
              Step {currentStep + 1}/{steps.length} | 
              {labCompleted ? ' ✅ Assessment Complete' : ' 🔄 Testing in Progress'}
            </div>
          </div>
          
          <div className="terminal-body">
            <div className="terminal-output">
              {terminalOutput.map((line, index) => (
                <div key={index} className="terminal-line">
                  {line}
                </div>
              ))}
            </div>
            
            {!labCompleted && (
              <form onSubmit={handleSubmit} className="terminal-input-form">
                <div className="terminal-input-line">
                  <span className="terminal-prompt">security-tester@webapp:~$ </span>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="terminal-input"
                    placeholder="Enter your command..."
                    autoFocus
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="lab-sidebar">
          <div className="lab-progress">
            <h3>🎯 Testing Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentStep + (labCompleted ? 1 : 0)) / steps.length) * 100}%` }}
              ></div>
            </div>
            <p>{currentStep + (labCompleted ? 1 : 0)}/{steps.length} tests completed</p>
          </div>

          <div className="lab-objectives">
            <h3>🔍 Testing Checklist</h3>
            <ul>
              {steps.map((step, index) => (
                <li key={index} className={index < currentStep ? 'completed' : index === currentStep ? 'current' : ''}>
                  {step.title}
                  {index < currentStep && <span className="checkmark">✅</span>}
                  {index === currentStep && <span className="current-marker">👈</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="vulnerability-summary">
            <h3>🚨 Vulnerabilities Found</h3>
            {vulnerabilitiesFound.length > 0 ? (
              <ul>
                {vulnerabilitiesFound.map((vuln, index) => (
                  <li key={index} className={`vuln-${vuln.severity.toLowerCase()}`}>
                    <span className="vuln-severity">{vuln.severity}</span>
                    <span className="vuln-title">{vuln.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No vulnerabilities found yet...</p>
            )}
          </div>

          <div className="lab-tips">
            <h3>💡 Testing Tips</h3>
            <ul>
              <li>Always start with reconnaissance</li>
              <li>Use both automated and manual testing</li>
              <li>Document all findings with evidence</li>
              <li>Test for OWASP Top 10 vulnerabilities</li>
              <li>Verify findings to avoid false positives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAppTestingLab;