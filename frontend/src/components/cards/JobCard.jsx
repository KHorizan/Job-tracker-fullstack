import { useNavigate } from "react-router-dom";
import { useApplied } from "../../context/AppliedContext";
import api from "../../services/api";
import "../../Styles/JobCard.css";

function JobCard({ job, onApply }) {
  const navigate = useNavigate();
  const { isApplied, markApplied } = useApplied();

  const applied = isApplied(job._id);
  const jobTypeClass = job.jobType?.toLowerCase().replace(/\s+/g, "-") || "";

  const handleApply = async () => {
    try {
      await api.post(`/applications/${job._id}`);
      markApplied(job._id);    // update context state
      onApply?.(job._id);      // update BrowseJobs state
      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location-type">
        {job.location} • <span className={`job-type ${jobTypeClass}`}>{job.jobType}</span>
      </p>

      <div className="job-card-actions">
        <button disabled={applied} className="apply-btn" onClick={handleApply}>
          {applied ? "Applied" : "Apply"}
        </button>
        <button className="details-btn" onClick={() => navigate(`/jobs/${job._id}`)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
