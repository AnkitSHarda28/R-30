import React, { useState, useEffect } from "react";
import "./App.css";

// Helper function to get the current day of the year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [timeLeftThisYear, setTimeLeftThisYear] = useState({});
  const [quote, setQuote] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for password authentication
  const [passwordInput, setPasswordInput] = useState(""); // New state for storing user input

  const retirementDate = new Date("2029-12-28T00:00:00"); // Fixed retirement date
  const endOfYearDate = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59); // End of current year

  const quotes = [
    "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Dream big. Start small. Act now.",
    "You don't have to be great to start, but you have to start to be great.",
    "The future depends on what you do today.",
    "Believe in yourself and all that you are.",
    "Great things never come from comfort zones.",
    "Your time is limited, don’t waste it living someone else’s life.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date(); // Local time of the user
      const difference = retirementDate - now;
      const yearEndDifference = endOfYearDate - now;

      // Calculate days, hours, minutes, seconds left until retirement
      let timeLeftData = {};
      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      // Calculate days left until the end of the current year
      let timeLeftYearData = {};
      if (yearEndDifference > 0) {
        timeLeftYearData = {
          days: Math.floor(yearEndDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((yearEndDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((yearEndDifference / 1000 / 60) % 60),
          seconds: Math.floor((yearEndDifference / 1000) % 60),
        };
      }

      setTimeLeft(timeLeftData);
      setTimeLeftThisYear(timeLeftYearData);
    };

    const updateQuote = () => {
      const dayOfYear = getDayOfYear();
      const quoteOfTheDay = quotes[dayOfYear % quotes.length]; // Cycle through quotes based on the day of the year
      setQuote(quoteOfTheDay);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    updateQuote(); // Update quote once per day

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, [quotes]);

  // Handle password authentication
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "JournyR1") {
      setIsAuthenticated(true); // If password is correct, set isAuthenticated to true
    } else {
      alert("Incorrect password! Please try again.");
    }
  };

  // If the user hasn't authenticated, show the password input form
  if (!isAuthenticated) {
    return (
      <div className="password-container">
        <h2 className="password-heading">
          🔒 Enter Password to Access the Countdown
        </h2>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter password"
            className="password-input"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePasswordSubmit(e); // Handle 'Enter' key press
            }}
          />
          <button type="submit" className="submit-button">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  // Once authenticated, show the actual app content
  return (
    <div className="app-container">
      <h1 className="heading">Ankit, your time Until Retirement</h1>
      <div className="countdown">
        <div className="countdown-item">
          <span className="time-value">{timeLeft.days || "0"}</span> Days
        </div>
        <div className="countdown-item">
          <span className="time-value">{timeLeft.hours || "0"}</span> Hours
        </div>
        <div className="countdown-item">
          <span className="time-value">{timeLeft.minutes || "0"}</span> Minutes
        </div>
        <div className="countdown-item">
          <span className="time-value">{timeLeft.seconds || "0"}</span> Seconds
        </div>
      </div>

      <div className="motivation">
        <p>{quote}</p> {/* Display the quote of the day */}
      </div>

      <div className="year-end-countdown">
        <h2 className="subheading">Time Left Until This Year Ends</h2>
        <p>
          <strong>{timeLeftThisYear.days || "0"}</strong> more days, until this
          year finishes!
        </p>
      </div>
    </div>
  );
}

export default App;
