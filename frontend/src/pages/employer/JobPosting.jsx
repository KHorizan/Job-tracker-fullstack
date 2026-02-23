// src/pages/Employer/PostJob.jsx
import React, { useState } from "react";
import "../../Styles/JobPosting.css";
const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    type: "",
    department: "",
    location: "",
    remote: false,
    salaryMin: "",
    salaryMax: "",
    experience: "",
    description: "",
    responsibilities: "",
    skills: [],
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData({
      ...jobData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillsChange = (e) => {
    setJobData({ ...jobData, skills: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", jobData);
    // API call here
  };


  return (
    <div className="post-job-page">
      <h2 className="page-title">Post a Job</h2>

      <div className="post-job-container">
        {/* Form Section */}
        <form className="post-job-form" onSubmit={handleSubmit}>
          <div className="form-left">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="type"
                value={jobData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={jobData.department}
                onChange={handleChange}
                placeholder="Enter department"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="remote"
                  checked={jobData.remote}
                  onChange={handleChange}
                />
                Remote Option
              </label>
            </div>

            <div className="form-group salary-range">
              <label>Salary Range</label>
              <div className="salary-inputs">
                <input
                  type="number"
                  name="salaryMin"
                  value={jobData.salaryMin}
                  onChange={handleChange}
                  placeholder="Min"
                />
                <span>–</span>
                <input
                  type="number"
                  name="salaryMax"
                  value={jobData.salaryMax}
                  onChange={handleChange}
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Experience Required</label>
              <input
                type="text"
                name="experience"
                value={jobData.experience}
                onChange={handleChange}
                placeholder="E.g. 2-5 years"
              />
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Write job description..."
                rows="6"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Responsibilities</label>
              <textarea
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleChange}
                placeholder="List responsibilities..."
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Skills / Requirements</label>
              <input
                type="text"
                name="skills"
                value={jobData.skills}
                onChange={handleSkillsChange}
                placeholder="Separate skills with commas"
              />
            </div>

            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={jobData.deadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Post Job
            </button>
          </div>
        </form>

        {/* Live Preview Section */}
        <div className="job-preview">
          <h3>Live Preview</h3>
          <div className="preview-card">
            <h2>{jobData.title || "Job Title"}</h2>
            <div className="badges">
              <span className="badge">{jobData.type || "Full-time"}</span>
              <span className="badge">{jobData.remote ? "Remote" : "On-site"}</span>
            </div>
            <p>
              <strong>Location:</strong> {jobData.location || "City, Country"} |{" "}
              <strong>Salary:</strong> {jobData.salaryMin || 0} – {jobData.salaryMax || 0} |
              <strong> Experience:</strong> {jobData.experience || "N/A"}
            </p>
            <h4>Description:</h4>
            <p>{jobData.description || "Job description here..."}</p>
            <h4>Responsibilities:</h4>
            <p>{jobData.responsibilities || "Responsibilities here..."}</p>
            <h4>Skills:</h4>
            <div className="skills-tags">
              {jobData.skills.length > 0
                ? jobData.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))
                : "Required skills..."}
            </div>
            <p><strong>Deadline:</strong> {jobData.deadline || "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;

