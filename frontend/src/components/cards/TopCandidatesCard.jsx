import React from "react";
import "../../Styles/TopCandidateCard.css";

const candidates = [
  { name: "Emily Clark", role: "Frontend Developer" },
  { name: "Michael Brown", role: "Backend Developer" },
  { name: "Sophia Lee", role: "UI/UX Designer" },
];

function TopCandidatesCard() {
  return (
    <div className="top-candidates-card">
      <h3>Top Candidates</h3>

      <ul>
      {candidates.map((c, idx) => (
       <li key={idx} className="candidate-item">
        <div className="candidate-left">
          <div className="candidate-avatar">
            {c.name.charAt(0)}
          </div>

      <div className="candidate-info">
        <span className="candidate-name">{c.name}</span>
        <span className="candidate-role">{c.role}</span>
      </div>
      </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopCandidatesCard;
