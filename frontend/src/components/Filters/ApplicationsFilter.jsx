
import "../../Styles/ApplicationFilter.css";

const ApplicationFilter = ({ filters, setFilters, jobs }) => {
  return (
    <div className="filters-bar">
      <select
        value={filters.job}
        onChange={(e) =>
          setFilters({ ...filters, job: e.target.value })
        }
      >
        <option value="all">All Jobs</option>
        {jobs.map((job) => (
          <option key={job} value={job}>
            {job}a
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="all">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        type="text"
        placeholder="Search candidate..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />
    </div>
  );
};

export default ApplicationFilter;