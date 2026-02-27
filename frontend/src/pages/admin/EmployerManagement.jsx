import { useState, useMemo } from "react";
import ApplicationTableBase from "../../components/tables/ApplicationsTable/ApplicationTableBase";
import ApplicationRow from "../../components/tables/ApplicationsTable/ApplicationRow";
import JobFilters from "../../components/filters/JobFilters";
import "../../Styles/EmployerManagement.css";
import { FiEye, FiEdit, FiTrash2, FiSlash, FiCheck } from "react-icons/fi";

function EmployerManagement() {
  const employers = [
    { _id: "1", name: "ABC Ltd", contactPerson: "John Doe", jobsCount: 5, status: "Active" },
    { _id: "2", name: "XYZ Corp", contactPerson: "Jane Smith", jobsCount: 3, status: "Inactive" },
    { _id: "3", name: "Tech Innovators", contactPerson: "Mark Lee", jobsCount: 8, status: "Active" },
    { _id: "4", name: "Global Solutions", contactPerson: "Sarah Kim", jobsCount: 2, status: "Active" },
    { _id: "5", name: "BrightPath", contactPerson: "Emily Ray", jobsCount: 6, status: "Inactive" },
  ];

  const columns = ["Employer", "Contact", "Jobs", "Status", "Actions"];

  const columnMap = {
    Employer: "name",
    Contact: "contactPerson",
    Jobs: "jobsCount",
  };

  /* ------------------ FILTER STATE ------------------ */
  const [filters, setFilters] = useState({ name: "", status: "" });

  const filteredEmployers = useMemo(() => {
    return employers.filter((emp) => {
      const matchName = emp.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchStatus = filters.status ? emp.status === filters.status : true;
      return matchName && matchStatus;
    });
  }, [filters, employers]);

  /* ------------------ PAGINATION ------------------ */
  const [page, setPage] = useState(1);
  const limit = 3;

  const totalPages = Math.ceil(filteredEmployers.length / limit);

  const paginatedData = filteredEmployers.slice(
    (page - 1) * limit,
    page * limit
  );

  /* ------------------ FILTER CONFIG ------------------ */
  const filterConfig = [
    { type: "input", name: "name", placeholder: "Search Employer" },
    {
      type: "select",
      name: "status",
      defaultOption: "All Status",
      options: ["Active", "Inactive"],
    },
  ];

  /* ------------------ ACTIONS ------------------ */
  const actions = [
    { label: <FiEye />, onClick: (emp) => console.log("View:", emp) },
    { label: <FiEdit />, onClick: (emp) => console.log("Edit:", emp) },
    {
      label: (emp) => emp.status === "Active" ? <FiSlash /> : <FiCheck />,
      onClick: (emp) => console.log("Toggle:", emp),
    },

  ];

  return (
    <div className="employer-page">

      {/* PAGE HEADER */}
      <div className="page-header">
       
        <p>Manage all registered employers</p>
      </div>

      {/* FILTERS */}
      <JobFilters
        filters={filters}
        setFilters={setFilters}
        config={filterConfig}
        setPage={setPage}
      />

      {/* TABLE */}
      <ApplicationTableBase columns={columns}>
        {paginatedData.map((emp) => (
          <ApplicationRow
            key={emp._id}
            application={emp}
            columns={columns}
            columnMap={columnMap}
            actions={actions.map((action) => ({
              ...action,
              label: typeof action.label === "function"
                ? action.label(emp)
                : action.label,
            }))}
          />
        ))}
      </ApplicationTableBase>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
        </div>
      )}
    </div>
  );
}

export default EmployerManagement;