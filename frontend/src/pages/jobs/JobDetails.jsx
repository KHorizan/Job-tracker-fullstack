import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApplied } from "../../context/AppliedContext";
import api from "../../services/api";
import "../../Styles/JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const { isApplied, markApplied } = useApplied();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const applied = isApplied(id);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post(`/applications/${job._id}`);
      markApplied(job._id);
      setJob({ ...job, applied: true }); // update UI
      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) return <p className="jobs-status">Loading job details...</p>;
  if (error) return <p className="jobs-status error">{error}</p>;
  if (!job) return <p className="jobs-status empty">Job not found</p>;

  return (
    <div className="job-details-wrapper">
      <div className="job-details-card">
        <div className="job-header">
          <h2>{job.title}</h2>
          <p className="company">{job.company}</p>
        </div>

        <div className="job-meta">
          {job.location && <span>📍 {job.location}</span>}
          {job.jobType && <span className="tag">{job.jobType}</span>}
        </div>

        {job.description && (
          <section>
            <h4>Description</h4>
            <p>{job.description}</p>
          </section>
        )}

        {job.skills?.length > 0 && (
          <section>
            <h4>Skills</h4>
            <div className="skills">
              {job.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {job.experience && (
          <section>
            <h4>Experience</h4>
            <p>{job.experience}</p>
          </section>
        )}

        {job.salary && (
          <section>
            <h4>Salary</h4>
            <p>{job.salary}</p>
          </section>
        )}

        <div className="job-actions">
          <button className="apply-btn" disabled={applied} onClick={handleApply}>
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
