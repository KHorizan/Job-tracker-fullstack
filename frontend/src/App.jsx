import{Routes, Route}  from "react-router-dom";
import Login from  "./pages/auth/Login.jsx";
import Register from  "./pages/auth/Register.jsx";

import "./Styles/App.css";

function App() {
   return (
    <Routes>
      <Route path ="/login" element={<Login />} />
      <Route path ="/register" element={<Register />} />

    </Routes>
   );
}

export default App;
