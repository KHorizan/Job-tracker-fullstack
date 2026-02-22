import{Routes, Route}  from "react-router-dom";
import Login from  "./pages/auth/Login.jsx";
import Register from  "./pages/auth/Register.jsx";
import Dashboard from "./pages/jobseeker/dashboard.jsx";
import "./Styles/App.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import BrowseJobs from "./pages/jobseeker/BrowseJobs.jsx";
import JobDetails from "./pages/jobs/JobDetails.jsx";
import ApplicationsPage from "./pages/jobseeker/Applications.jsx";
import EmployerDashboard from "./pages/employer/EmployerDashboard.jsx";
import JobManagement from "./pages/employer/JobManagement.jsx";
import ApplicationManagement from "./pages/employer/ApplicationManagement.jsx";


function App() {
   return (
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />


  {/* Protected routes */}
  <Route element={<ProtectedRoute allowedRoles={["jobseeker"]} />}>
    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<BrowseJobs />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/jobManage" element={<JobManagement />} />
      <Route path="/appManage" element={<ApplicationManagement />} />

    </Route>
  </Route>

  <Route element={<ProtectedRoute allowedRoles={["jobseeker","employer","admin"]} />}>
    <Route element={<AppLayout />}>
      <Route path="/jobs/:id" element={<JobDetails />} />
    </Route>
  </Route>

   <Route element={<ProtectedRoute allowedRoles={["jobseeker","employer"]} />}>
    <Route element={<AppLayout />}>
    <Route path="/empdashboard" element={<EmployerDashboard/>}/>
    </Route>
  </Route>



</Routes>

   );
}

export default App;
