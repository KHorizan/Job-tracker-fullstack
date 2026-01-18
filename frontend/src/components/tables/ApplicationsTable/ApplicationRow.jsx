import StatusBadge from "./StatusBadge";

function ApplicationRow({application,variant}){
    return(
            <tr className="row">

                {/* because we usedd popluate in the backend */}
                <td>{application.job.company}</td>
                <td>{application.job.title}</td>
                <td><StatusBadge status={application.status} /></td>
                <td>{new Date(application.appliedOn).toLocaleDateString()}</td>

                {variant==="full"&&(
                    <td>
                        {/*edit/delete button later*/}
                    </td>
                )}
            </tr>
    )

};
export default ApplicationRow;