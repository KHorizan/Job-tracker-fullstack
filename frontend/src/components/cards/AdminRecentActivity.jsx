import React from "react";
import "../../Styles/AdminSections.css";

const RecentActivity = ({ data }) => {
  return (
    <div className="recent-activity-card">
      <h3>Recent Activity</h3>

      <table className="activity-table">
        <thead>
          <tr>
            <th>Recent Job</th>
            <th>Employer</th>
            <th>Candidate</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.jobTitle}</td>
              <td>{item.employer}</td>
              <td>{item.candidate}</td>
              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;