
import { useState } from "react";
import ApplicationManagementTable from "../../components/tables/ApplicationsTable/ApplicationManagementTable";
import ApplicationKanban from "../../components/cards/ApplicationKanban";

import ApplicationFilter from "../../components/Filters/ApplicationsFilter";
import "../../Styles/ApplicationManagement.css";

const ApplicationManagement = () => {
  const [viewType, setViewType] = useState("table");

  const [filters, setFilters] = useState({
  job: "all",
  status: "all",
  search: "",
});


  const [applications, setApplications] = useState([
    { id: 1, candidate: { name: "John Doe" }, job: { title: "Frontend Developer" }, appliedAt: "2026-02-15", status: "Pending" },
    { id: 2, candidate: { name: "Priya Smith" }, job: { title: "Backend Developer" }, appliedAt: "2026-02-10", status: "Pending" },
    { id: 3, candidate: { name: "Poonam Devi" }, job: { title: "Backend Developer" }, appliedAt: "2026-02-10", status: "Rejected" },
    { id: 4, candidate: { name: "Saloni Rauthan" }, job: { title: "Backend Developer" }, appliedAt: "2026-02-10", status: "Rejected" },
    { id: 5, candidate: { name: "Kashish Smith" }, job: { title: "Backend Developer" }, appliedAt: "2026-02-10", status: "Interview" },
    { id: 6, candidate: { name: "Anjali Rauthan" }, job: { title: "Backend Developer" }, appliedAt: "2026-02-10", status: "Pending" },
    { id: 7, candidate: { name: "Mohit Raj" }, job: { title: "Backend Developer" }, appliedAt: "2026-02-10", status: "Interview" },
  ]);

  const updateApplication = (id, data) => {
    return new Promise((resolve) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...data } : app))
      );
      resolve(true);
    });
  };

    
  const filteredApplications = applications.filter((app) => {
  const matchJob =
    filters.job === "all" ||
    app.job.title === filters.job;

  const matchStatus =
    filters.status === "all" ||
    app.status === filters.status;

  const matchSearch =
    app.candidate.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

  return matchJob && matchStatus && matchSearch;
});

  return (
    <div className="applications-header">
      <div className="header-top">
       <h4>Manage Applications</h4>

   
        <div className="view-switch">
          <button
            className={viewType === "table" ? "active" : ""}
            onClick={() => setViewType("table")}
          >
            Table
          </button>
          <button
            className={viewType === "kanban" ? "active" : ""}
            onClick={() => setViewType("kanban")}
          >
            Kanban
          </button>
        </div>
      </div>
      <ApplicationFilter
  filters={filters}
  setFilters={setFilters}
  jobs={[...new Set(applications.map((a) => a.job.title))]}
/>
<div className="applications-content">
  {viewType === "table" ? (
    <ApplicationManagementTable applications={filteredApplications}   updateApplication={updateApplication}/>
  ) : (
    <ApplicationKanban applications={filteredApplications} />
  )}
</div>
</div>
  );
};

export default ApplicationManagement;