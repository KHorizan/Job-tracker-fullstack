import { useEffect, useState } from "react";
import JobFilters from "../../components/filters/JobFilters";
import JobCard from "../../components/cards/JobCard";
import api from "../../services/api";
import "../../Styles/BrowseJobs.css";

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
  search: "",
  location: "",
  jobType: ""
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs/browse", {
        params: { ...filters, page, limit: 10 },
      });
      setJobs(res.data?.jobs || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs", err);
      setJobs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters,page]);


  const handleApply = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, applied: true } : job
      )
    );
  };

  const filterConfig = [
  {
    type: "input",
    name: "search",
    placeholder: "Search Jobs..."
  },
  {
    type: "select",
    name: "location",
    defaultOption: "All Locations",
    options: ["Remote"]
  },
  {
    type: "select",
    name: "jobType",
    defaultOption: "All Types",
    options: ["Part-Time", "Full-Time"]
  }
];

  return (
    <div className="browse-jobs-page">
      <JobFilters
      filters={filters}
     setFilters={setFilters}
     config={filterConfig}
      setPage={setPage}
      />

      {loading && <p className="jobs-status">Loading jobs...</p>}
      {!loading && jobs.length === 0 && <p className="jobs-status empty">No jobs found.</p>}

      {!loading && jobs.length > 0 && (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onApply={handleApply} />
          ))}
        </div>
      )}

      {!loading && jobs.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default BrowseJobs;
