import{Routes, Route}  from "react-router-dom";
import Login from  "./pages/auth/Login.jsx";
import Register from  "./pages/auth/Register.jsx";
import Dashboard from "./pages/jobseeker/dashboard.jsx";
import "./Styles/App.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

function App() {
   return (
    <Routes>
      <Route path ="/login" element={<Login />} />
      <Route path ="/register" element={<Register />} />


      <Route 
        element={
       <ProtectedRoute allowedRoles={["jobseeker"]}>
        <AppLayout />
      </ProtectedRoute>
      }
      >
        <Route path ="/dashboard" element={<Dashboard />} />
    </Route >
      
    </Routes>
   );
}

export default App;
