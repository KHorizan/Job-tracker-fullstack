import { useState } from "react";
import "../../Styles/EmployerSettings.css";

function EmployerSettings() {
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    description: "",
    logo: null
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
    console.log("Employer settings:", form);
  };

  return (
    <div className="settings-page">
      <h2>Employer Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">

        <input name="companyName" placeholder="Company Name" onChange={handleChange} />
        <input name="website" placeholder="Company Website" onChange={handleChange} />
        <input name="industry" placeholder="Industry" onChange={handleChange} />
        <input name="companySize" placeholder="Company Size" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Company Description"
          onChange={handleChange}
        />

        <label>Upload Company Logo</label>
        <input type="file" name="logo" onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EmployerSettings;