import React from "react";
import StatusBadge from "./StatusBadge";
import "../../../Styles/ApplicationRow.css";

function ApplicationRow({ application, columns, columnMap, actions = [], variant = "full" }) {
  return (
    <tr className={`app-row ${variant}`}>
      {columns.map((col) => {
        // Status column uses StatusBadge
        if (col === "Status") {
          return (
            <td key={col}>
              <StatusBadge status={application.status} />
            </td>
          );
        }

        // Actions column renders dynamic buttons
        if (col === "Actions") {
          if (variant === "compact") return null;
          return (
            <td key={col}>
              {actions.map((act, idx) => (
                <button key={idx} onClick={(e) =>{e.stopPropagation();
                 act.onClick(application)}}>
                  {act.label}
                </button>
              ))}
            </td>
          );
        }

        // Dynamic data mapping
        const path = columnMap[col];
        if (!path) return <td key={col}>-</td>; // fallback if path not defined

        const keys = path.split(".");
        let value = keys.reduce((acc, key) => (acc ? acc[key] : undefined), application);

        // Format dates for "Applied On" column
        if (col.toLowerCase().includes("applied") && value) {
          value = new Date(value).toLocaleDateString();
        }

        return <td key={col}>{value ?? "-"}</td>;
      })}
    </tr>
  );
}

export default ApplicationRow;