import  { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../Styles/ApplicationKanban.css";

const statuses = ["Pending", "Interview", "Rejected"];

const ApplicationKanban = ({ applications }) => {
  const [apps, setApps] = useState(applications);
  const [selected, setSelected] = useState(null);

  // Organize applications by status
  const columns = Object.fromEntries(
    statuses.map((status) => [status, apps.filter((a) => a.status === status)])
  );

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const appId = parseInt(draggableId);

    // Only update if moved to different column
    if (destination.droppableId !== source.droppableId) {
      setApps((prev) =>
        prev.map((a) =>
          a.id === appId ? { ...a, status: destination.droppableId } : a
        )
      );
    }
  };

  return (
    <div className="kanban-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h4>{status}</h4>
                  {columns[status].map((app, index) => (
                    <Draggable
                      key={app.id}
                      draggableId={app.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="kanban-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => setSelected(app)}
                        >
                          <strong>{app.candidate.name}</strong>
                          <p>{app.job.title}</p>
                          <p className="applied-date">
                            Applied:{" "}
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                          <span
                            className={`status-badge ${app.status.toLowerCase()}`}
                          >
                            {app.status}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Drawer for details */}
      {selected && (
        <div className="kanban-drawer">
          <button
            className="drawer-close"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <h3>{selected.candidate.name}</h3>
          <p>
            <strong>Position:</strong> {selected.job.title}
          </p>
          <p>
            <strong>Applied:</strong>{" "}
            {new Date(selected.appliedAt).toLocaleDateString()}
          </p>
          <p>
            <span
              className={`status-badge ${selected.status.toLowerCase()}`}
            >
              {selected.status}
            </span>
          </p>
          <div className="drawer-actions">
            <button className="btn view">View Profile</button>
            <button className="btn shortlist">Shortlist</button>
            <button className="btn reject">Reject</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationKanban;