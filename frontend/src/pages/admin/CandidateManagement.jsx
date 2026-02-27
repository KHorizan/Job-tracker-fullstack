import { useState, useMemo } from "react";
import ApplicationTableBase from "../../components/tables/ApplicationsTable/ApplicationTableBase";
import ApplicationRow from "../../components/tables/ApplicationsTable/ApplicationRow";
import JobFilters from "../../components/filters/JobFilters";

//  function CandidateManagement({ applications=[], jobs=[] }) {
function CandidateManagement(){
  const [filters, setFilters] = useState({
    search: "",
    job: "",
    status: ""
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;



    const dummyJobs = [
  { _id: "j1", title: "Frontend Developer" },
  { _id: "j2", title: "Backend Developer" },
  { _id: "j3", title: "UI/UX Designer" },
  { _id: "j4", title: "Data Analyst" }
];

const dummyApplications = [
  {
    _id: "a1",
    candidate: { name: "Rahul Sharma" },
    job: { title: "Frontend Developer" },
    status: "Pending",
    appliedAt: "2026-02-01"
  },
  {
    _id: "a2",
    candidate: { name: "Priya Verma" },
    job: { title: "Backend Developer" },
    status: "Shortlisted",
    appliedAt: "2026-02-02"
  },
  {
    _id: "a3",
    candidate: { name: "Arjun Mehta" },
    job: { title: "UI/UX Designer" },
    status: "Interview",
    appliedAt: "2026-02-03"
  },
  {
    _id: "a4",
    candidate: { name: "Sneha Kapoor" },
    job: { title: "Frontend Developer" },
    status: "Rejected",
    appliedAt: "2026-02-04"
  },
  {
    _id: "a5",
    candidate: { name: "Vikram Singh" },
    job: { title: "Data Analyst" },
    status: "Pending",
    appliedAt: "2026-02-05"
  },
  {
    _id: "a6",
    candidate: { name: "Neha Gupta" },
    job: { title: "Backend Developer" },
    status: "Interview",
    appliedAt: "2026-02-06"
  },
  {
    _id: "a7",
    candidate: { name: "Karan Patel" },
    job: { title: "Frontend Developer" },
    status: "Shortlisted",
    appliedAt: "2026-02-07"
  },
  {
    _id: "a8",
    candidate: { name: "Ananya Rao" },
    job: { title: "UI/UX Designer" },
    status: "Pending",
    appliedAt: "2026-02-08"
  },
  {
    _id: "a9",
    candidate: { name: "Rohit Nair" },
    job: { title: "Data Analyst" },
    status: "Rejected",
    appliedAt: "2026-02-09"
  },
  {
    _id: "a10",
    candidate: { name: "Meera Iyer" },
    job: { title: "Backend Developer" },
    status: "Interview",
    appliedAt: "2026-02-10"
  },
  {
    _id: "a11",
    candidate: { name: "Aditya Joshi" },
    job: { title: "Frontend Developer" },
    status: "Pending",
    appliedAt: "2026-02-11"
  }
];
  
  const applications = dummyApplications;
  const jobs = dummyJobs;
  /* -------------------- FILTER CONFIG -------------------- */

  const filterConfig = [
    { type: "input", name: "search", placeholder: "Search candidates..." },
    {
      type: "select",
      name: "job",
      defaultOption: "Job: All Jobs",
      options: jobs.map(j => j.title)
    },
    {
      type: "select",
      name: "status",
      defaultOption: "Status: All",
      options: ["Pending", "Shortlisted", "Interview", "Rejected"]
    }
  ];

  /* -------------------- TABLE CONFIG -------------------- */

  const columns = [
    "Candidate",
    "Position / Employer",
    "Status",
    "Applied",
    "Actions"
  ];

  const columnMap = {
    "Candidate": "candidate.name",
    "Position / Employer": "job.title",
    "Status": "status",
    "Applied": "appliedAt"
  };

  /* -------------------- FILTER LOGIC -------------------- */

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      return (
        app.candidate.name
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        (filters.job ? app.job.title === filters.job : true) &&
        (filters.status ? app.status === filters.status : true)
      );
    });
  }, [applications, filters]);

  /* -------------------- PAGINATION -------------------- */

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginatedApplications = filteredApplications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /* -------------------- ACTIONS -------------------- */

  const actions = [
    {
      label: "View",
      onClick: (app) => console.log("View", app._id)
    },
    {
      label: "Update Status",
      onClick: (app) => console.log("Update", app._id)
    },
    {
      label: "Delete",
      onClick: (app) => console.log("Delete", app._id)
    }
  ];

  /* -------------------- RENDER -------------------- */

  return (
    <div className="candidate-management">

 
      {/* FILTERS */}
      <JobFilters
        filters={filters}
        setFilters={setFilters}
        config={filterConfig}
        setPage={setPage}
      />

      {/* TABLE */}
      <ApplicationTableBase columns={columns}>
        {paginatedApplications.map(app => (
          <ApplicationRow
            key={app._id}
            application={app}
            columns={columns}
            columnMap={columnMap}
            actions={actions}
          />
        ))}
      </ApplicationTableBase>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default CandidateManagement;