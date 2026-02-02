import StatusBadge from "./StatusBadge";
import "../../../Styles/ApplicationRow.css";

const COLUMN_MAP = {
  "Company": "job.company",
  "Job Title": "job.title",
  "Location": "job.location",
  "Job Type": "job.type",
  "Salary": "job.salary",
  "Applied On": "appliedOn",
  "Status": "status",
  "Actions": "actions",
};

function ApplicationRow({ application, columns ,variant="full"}) {
  return (
    <tr className={`app-row ${variant}`}>
      {columns.map((col) => {
       
        if (col === "Status") {
          return (
            <td key={col}>
              <StatusBadge status={application.status} />
            </td>
          );
        }

        // Handle Actions buttons
        if (col === "Actions") {
           if (variant === "compact") return null;
          return (
            <td key={col}>
              <button className="view-btn">View</button>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Withdraw</button>
            </td>
          );
        }

       
        const path = COLUMN_MAP[col];
        if (!path) return <td key={col}>-</td>;

        const keys = path.split(".");
        let value = keys.reduce((acc, key) => (acc ? acc[key] : undefined), application);

        if (col === "Applied On" && value) {
          value = new Date(value).toLocaleDateString();
        }

        return <td key={col}>{value ?? "-"}</td>;
      })}
    </tr>
  );
}

export default ApplicationRow;
