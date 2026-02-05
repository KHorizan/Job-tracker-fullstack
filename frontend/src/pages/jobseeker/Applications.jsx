import React, { useState, useEffect } from "react";
import api from "../../services/api";
import ApplicationTableBase from "../../components/tables/ApplicationsTable/ApplicationTableBase";
import ApplicationRow from "../../components/tables/ApplicationsTable/ApplicationRow";
import "../../Styles/Applications.css";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    jobType: "",
    company: "",
  });
  const ITEMS_PER_PAGE = 8;
  const [page, setPage] = useState(1);

  const columns = [
    "Company",
    "Job Title",
    "Location",
    "Job Type",
    "Status",
    "Applied On",
    "Salary",
    "Actions",
  ];

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await api.get("/applications");


      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("API ERROR:", err.response || err);
      setError(err.response?.data?.message || err.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter Logic //
  const filteredApplications = applications.filter((app) => {
    return (
      (filters.status === "" || app.status === filters.status) &&
      (filters.jobType === "" || app.job.jobType === filters.jobType) &&
      (filters.company === "" ||
        app.job.company.toLowerCase().includes(filters.company.toLowerCase()))
    );
  });

  //Pagination Logic //
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = filteredApplications.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1); // Reset page when filters change
  }, [filters]);

  const resetFilters = () => {
    setFilters({ status: "", jobType: "", company: "" });
  };

  // UI //
  return (
    <div className="applications-page">
      {/* Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Filter by company"
          value={filters.company}
          onChange={(e) =>
            setFilters({ ...filters, company: e.target.value })
          }
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={filters.jobType}
          onChange={(e) =>
            setFilters({ ...filters, jobType: e.target.value })
          }
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <button className="reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* Count */}
      <p className="results-count">
        Showing {paginatedApplications.length} of {filteredApplications.length} applications
      </p>

      {/* States */}
      {loading && <p>Loading applications...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <>
        {applications.length === 0 ? (
    <p className="no-applications">No applications yet.</p> // New user / no applications
   ) : filteredApplications.length === 0 ? (
  <p className="no-filter">No applications match your filters.</p> // Filter applied but no match
   ) : (
  <ApplicationTableBase columns={columns}>
    {paginatedApplications.map((app) => (
      <ApplicationRow
        key={app._id}
        application={app}
        columns={columns}
      />
    ))}
  </ApplicationTableBase>
          )}
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
