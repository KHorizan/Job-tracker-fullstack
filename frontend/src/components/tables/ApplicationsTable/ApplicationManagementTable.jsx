import React,{ useState } from "react";
import ApplicationTableBase from "../ApplicationsTable/ApplicationTableBase";
import "../../../Styles/ApplicationManagementTable.css";

const ApplicationManagementTable = ({ applications,updateApplication }) => {
  const [openId, setOpenId] = useState(null);
  const [apps, setApps] = useState(applications);

  const columns = ["Candidate", "Position", "Applied On", "Status", "Actions"];

  const toggleRow = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleChangeStatus = (id, newStatus) => {
    updateApplication(id, { status: newStatus }).then(() => {
      setApps((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    });
  };


  const handleShortlist = (id) => {
    updateApplication(id, { shortlisted: true }).then(() => {
      setApps((prev) =>
        prev.map((app) => (app.id === id ? { ...app, shortlisted: true } : app))
      );
    });
  };

  
  const handleReject = (id) => {
    updateApplication(id, { status: "Rejected" }).then(() => {
      setApps((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app))
      );
    });
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
            <select
                value={app.status}
                onClick={(e) => e.stopPropagation()} // Prevent row toggle
                onChange={(e) => handleChangeStatus(app.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
              </select>
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
                    <button onClick={(e) => { e.stopPropagation(); handleShortlist(app.id); }}>
                Shortlist
              </button>
                     <button onClick={(e) => { e.stopPropagation(); handleReject(app.id); }}>
                Reject
              </button>
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