import { useState } from "react";
import "../../Styles/JobSeekerSettings.css";

function JobSeekerSettings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    location: "",
    resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Jobseeker settings:", form);
  };

  return (
    <div className="settings-page">
      <h2>Jobseeker Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
        <input name="location" placeholder="Preferred Location" onChange={handleChange} />

        <label>Upload Resume</label>
        <input type="file" name="resume" onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default JobSeekerSettings;