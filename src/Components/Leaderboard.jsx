import { useState, useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://pokenode-56qg.onrender.com/leaderboard"
        );
        const data = await response.json();
        if (response.ok) {
          return data; // or set state in your component to update the UI
        } else {
          throw new Error("Failed to fetch leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard().then((data) => setLeaders(data));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard_title">Leaderboard</h2>
      <ul className="leaderboard-list">
        {leaders.map((leader, index) => (
          <li key={index}>
            <span className="leaderboard-player">{leader.playername}</span>
            <span className="leaderboard-score">{leader.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
