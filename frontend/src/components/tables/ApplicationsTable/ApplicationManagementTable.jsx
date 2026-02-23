import React,{ useState } from "react";
import ApplicationTableBase from "../ApplicationsTable/ApplicationTableBase";
import "../../../Styles/ApplicationManagementTable.css";

const ApplicationManagementTable = ({ applications }) => {
  const [openId, setOpenId] = useState(null);

  const columns = ["Candidate", "Position", "Applied On", "Status", "Actions"];

  const toggleRow = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <ApplicationTableBase columns={columns}>
      {applications.map((app) => (
        <React.Fragment key={app.id}>
          {/* Main Row */}
          <tr className="app-row" onClick={() => toggleRow(app.id)} style={{ cursor: "pointer" }}>
            <td>{app.candidate?.name}</td>
            <td>{app.job?.title}</td>
            <td>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "-"}</td>
           <td>
          <span className={`status-badge ${app.status.toLowerCase()}`}>
           {app.status}
          </span>
      </td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Change Status", app);
                }}
              >
                Change Status
              </button>
            </td>
          </tr>

          {/* Accordion Row */}
          {openId === app.id && (
            <tr className="accordion-row">
              <td colSpan="5">
                <div className="accordion-content">
                  <div className="accordion-top">
                    <div className="accordion-user">
                      <div className="avatar">{app.candidate?.name.charAt(0)}</div>
                      <div className="user-info">
                        <h5>{app.candidate?.name}</h5>
                        <p>{app.job?.title}</p>
                      </div>
                    </div>
                    <div className="accordion-meta">
                      <span className={`status-badge ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                      <span className="applied-date">
                        Applied: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "-"}
                      </span>
                    </div>
                  </div>
                  <div className="accordion-actions">
                    <button className="btn view">View Profile</button>
                    <button className="btn shortlist">Shortlist</button>
                    <button className="btn reject">Reject</button>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </ApplicationTableBase>
  );
};

export default ApplicationManagementTable;