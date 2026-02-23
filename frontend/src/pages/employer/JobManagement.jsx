import {useState,useEffect} from "react";
import JobFilters from "../../components/Filters/JobFilters";
import JobTable from "../../components/tables/JobTablesComponents/JobTable";
import api from "../../services/api";
import "../../Styles/JobManagement.css";

function JobManagement(){

    const fakeJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    status: "Open",
    type: "Full-Time",
    applicationCount: 12,
    createdAt: "2026-02-01",
    description: "Looking for a React developer with 2+ years experience.Looking for a React developer with 2+ years experience.Looking for a React developer with 2+ years experience.Looking for a React developer with 2+ years experience",
    salary: "6-10 LPA",
    location: "Remote"
  },
  {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
   {
    _id: "1",
    title: "Frontend Developer",
    status: "Open",
    type: "Full-Time",
    applicationCount: 12,
    createdAt: "2026-02-01",
    description: "Looking for a React developer with 2+ years experience.",
    salary: "6-10 LPA",
    location: "Remote"
  },
   {
    _id: "1",
    title: "Frontend Developer",
    status: "Open",
    type: "Full-Time",
    applicationCount: 12,
    createdAt: "2026-02-01",
    description: "Looking for a React developer with 2+ years experience.",
    salary: "6-10 LPA",
    location: "Remote"
  },
  {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
  {
    _id: "3",
    title: "UI/UX Designer",
    status: "Open",
    type: "Part-Time",
    applicationCount: 5,
    createdAt: "2026-02-05",
    description: "Figma expert required.",
    salary: "4-6 LPA",
    location: "Delhi"
  },
  {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
  {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
   {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
   {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
   {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
   {
    _id: "2",
    title: "Backend Developer",
    status: "Closed",
    type: "Full-Time",
    applicationCount: 8,
    createdAt: "2026-01-20",
    description: "Node.js + MongoDB experience required.",
    salary: "8-12 LPA",
    location: "Bangalore"
  },
];


 const[jobs,setJobs] = useState(fakeJobs);
 const[loading,setLoading] = useState(false);
 const[Filters,setFilters] = useState({
    search:"",
    status:"",
    sort:""
 });
 const[page,setPage] = useState(1);
 const[totalPages,setTotalPages] = useState(1);
 const [total, setTotal] = useState(50); 


const filterConfig=[
    {
      type:"input",
      name:"search",
      placeholder:"Search by title..."  
    },
    {
       type:"select", 
       name:"status",
       defaultOption:"All Status",
       options:["Active","Closed"]
    },
    {
        type:"select",
        name:"sort",
        defaultOption:"Sort By",
        options:["Newest","Applications"]
    }
];
 return (
    <div className="job-management-page">
      {/* Header */}
      <div className="job-header">
        <div>
          <h1 className="page-title">Manage Jobs</h1>
          <p className="page-subtitle">View and manage your posted job listings</p>
        </div>
        <button className="add-job-btn">+ Post New Job</button>
      </div>

      {/* Filters */}
      <div className="filters-wrapper">
        <JobFilters filters={Filters} setFilters={setFilters} config={filterConfig} setPage={setPage} />
      </div>

      {/* Loading / Empty */}
      {loading && <p className="status-text">Loading Jobs...</p>}
      {!loading && jobs.length === 0 && <p className="status-text-empty">No Jobs Found.</p>}

      {/* Jobs Count - Left/Right aligned above table */}
      {!loading && jobs.length > 0 && (
        <div className="jobs-count-wrapper">
          <span className="jobs-count-left">Showing {jobs.length} of {total} jobs</span>
          <span className="jobs-count-right">Total Jobs: {total}</span>
        </div>
      )}

      {/* Jobs Table */}
      {!loading && jobs.length > 0 && (
        <div className="jobs-section">
          <JobTable jobs={jobs} />
        </div>
      )}

      {/* Pagination */}
      {!loading && jobs.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button className="nav-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
          {(() => {
            const pages = [];
            const startPage = Math.max(2, page - 2);
            const endPage = Math.min(totalPages - 1, page + 2);

            pages.push(
              <button key={1} className={page === 1 ? "page-btn active" : "page-btn"} onClick={() => setPage(1)}>1</button>
            );

            if (startPage > 2) pages.push(<span key="start-ellipsis" className="ellipsis">...</span>);

            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button key={i} className={page === i ? "page-btn active" : "page-btn"} onClick={() => setPage(i)}>{i}</button>
              );
            }

            if (endPage < totalPages - 1) pages.push(<span key="end-ellipsis" className="ellipsis">...</span>);

            if (totalPages > 1) pages.push(
              <button key={totalPages} className={page === totalPages ? "page-btn active" : "page-btn"} onClick={() => setPage(totalPages)}>{totalPages}</button>
            );

            return pages;
          })()}
          <button className="nav-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
        </div>
      )}
    </div>
  );
}

export default JobManagement;