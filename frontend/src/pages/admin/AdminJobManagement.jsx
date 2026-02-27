import { useState, useMemo } from "react";
import ApplicationTableBase from "../../components/tables/ApplicationsTable/ApplicationTableBase";
import ApplicationRow from "../../components/tables/ApplicationsTable/ApplicationRow";
import JobFilters from "../../components/filters/JobFilters";;


// function AdminJobManagement({ jobs=[] }) {
function AdminJobManagement(){

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: ""
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const dummyJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    status: "Active",
    category: "IT",
    applicantCount: 14,
    createdAt: "2026-02-01"
  },
  {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    category: "IT",
    applicantCount: 8,
    createdAt: "2026-01-15"
  },
  {
    _id: "3",
    title: "UI/UX Designer",
    status: "Active",
    category: "Marketing",
    applicantCount: 5,
    createdAt: "2026-02-10"
  },
  {
    _id: "4",
    title: "Digital Marketing Executive",
    status: "Active",
    category: "Marketing",
    applicantCount: 11,
    createdAt: "2026-02-05"
  },
  {
    _id: "5",
    title: "Sales Manager",
    status: "Closed",
    category: "Sales",
    applicantCount: 6,
    createdAt: "2026-01-28"
  },
  {
    _id: "6",
    title: "DevOps Engineer",
    status: "Active",
    category: "IT",
    applicantCount: 9,
    createdAt: "2026-02-12"
  },
  {
    _id: "7",
    title: "HR Executive",
    status: "Active",
    category: "Marketing",
    applicantCount: 4,
    createdAt: "2026-02-08"
  },
  {
    _id: "8",
    title: "Data Analyst",
    status: "Closed",
    category: "IT",
    applicantCount: 7,
    createdAt: "2026-01-30"
  },
  {
    _id: "9",
    title: "Product Manager",
    status: "Active",
    category: "IT",
    applicantCount: 10,
    createdAt: "2026-02-03"
  },
  {
    _id: "10",
    title: "Content Writer",
    status: "Active",
    category: "Marketing",
    applicantCount: 3,
    createdAt: "2026-02-14"
  },
  {
    _id: "11",
    title: "QA Engineer",
    status: "Closed",
    category: "IT",
    applicantCount: 5,
    createdAt: "2026-01-25"
  }
];
const jobs = dummyJobs;
  /* -------------------- FILTER CONFIG -------------------- */

  const filterConfig = [
    { type: "input", name: "search", placeholder: "Search job listings..." },
    {
      type: "select",
      name: "status",
      defaultOption: "Status: All",
      options: ["Active", "Closed"]
    },
    {
      type: "select",
      name: "category",
      defaultOption: "Category: All",
      options: ["IT", "Marketing", "Sales"]
    }
  ];

  /* -------------------- TABLE CONFIG -------------------- */

  const columns = [
    "Job Title / Company",
    "Applicants",
    "Status",
    "Posted",
    "Actions"
  ];

  const columnMap = {
    "Job Title / Company": "title",
    "Applicants": "applicantCount",
    "Status": "status",
    "Posted": "createdAt"
  };

  /* -------------------- FILTER LOGIC -------------------- */

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.status ? job.status === filters.status : true) &&
        (filters.category ? job.category === filters.category : true)
      );
    });
  }, [jobs, filters]);

  /* -------------------- PAGINATION -------------------- */

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /* -------------------- ACTIONS -------------------- */

  const actions = [
    {
      label: "View",
      onClick: (job) => console.log("View", job._id)
    },
    {
      label: "Edit",
      onClick: (job) => console.log("Edit", job._id)
    }
  ];

  /* -------------------- RENDER -------------------- */

  return (
    <div className="job-management">

 

      {/* FILTERS */}
      <JobFilters
        filters={filters}
        setFilters={setFilters}
        config={filterConfig}
        setPage={setPage}
      />

      {/* TABLE */}
      <ApplicationTableBase columns={columns}>
        {paginatedJobs.map(job => (
          <ApplicationRow
            key={job._id}
            application={job}
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

export default AdminJobManagement;