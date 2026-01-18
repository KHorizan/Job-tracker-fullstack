import "../../../Styles/ApplicationTableBase.css";

function ApplicationTableBase({columns,children}){
  return(
    <div className="application-container">
       <table className="table-container">
        <thead>
            <tr>
                {columns.map((col)=>(
                    <th key={col}>{col}</th>
                ))}
            </tr>
        </thead>

        <tbody>{children}</tbody>
       </table>
    </div>
  );
}
export default ApplicationTableBase;