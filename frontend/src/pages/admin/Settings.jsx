import { useState } from "react";
import "../../Styles/AdminSettings.css";

function AdminSettings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    notifications: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin settings:", form);
  };

  return (
    <div className="settings-page">
      <h2>Admin Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />

        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={form.notifications}
            onChange={handleChange}
          />
          Enable System Notifications
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default AdminSettings;