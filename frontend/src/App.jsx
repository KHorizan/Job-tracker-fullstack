import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Topbar title="Dashboard" />
        <div className="page-content">
          {/* Dashboard content will go here */}
        </div>
      </div>
    </div>
  );
}

export default App;
