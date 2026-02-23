import { useState } from "react";
import JobRow from "./JobRow";
import "../../../Styles/JobTable.css";

function JobTable({ jobs }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="desktop-table">
        <div className="table-wrapper">
          <table className="job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Type</th>
                <th>Applications</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <JobRow key={job._id} job={job} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mobile-cards">
        {jobs.map((job) => {
          const expanded = expandedCard === job._id;

          return (
            <div className="job-card" key={job._id}>
              <div
                className="card-header"
                onClick={() => toggleCard(job._id)}
              >
                <span
                  className={`expand-arrow ${expanded ? "rotate" : ""}`}
                >
                  ▶
                </span>
                <div>
                  <h3>{job.title}</h3>
                  <span
                    className={`status-badge ${job.status.toLowerCase()}`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>

              {expanded && (
                <div className="card-body">
                  <p><strong>Type:</strong> {job.type}</p>
                  <p><strong>Applications:</strong> {job.applicationCount}</p>
                  <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

                  <div className="detail-item">
                    <span className="detail-label">Description</span>
                    <p>{job.description}</p>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Salary</span>
                    <p>{job.salary}</p>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <p>{job.location}</p>
                  </div>

                  <div className="expand-actions">
                    <button className="view-btn">View Applications</button>
                    <button className="edit-btn">Edit Job</button>
                    <button className="close-btn">Close Job</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default JobTable;