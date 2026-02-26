import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/AdminSections.css";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="quick-actions-card">
      <h3>Quick Actions</h3>

      <div className="quick-actions-buttons">
        <button onClick={() => navigate("/admin/employers")}>
          Manage Employers
        </button>

        <button onClick={() => navigate("/admin/jobs")}>
          Manage Jobs
        </button>

        <button onClick={() => navigate("/admin/candidates")}>
          Manage Candidates
        </button>

        <button onClick={() => navigate("/admin/reports")}>
          View Reports
        </button>
      </div>
    </div>
  );
};

export default QuickActions;