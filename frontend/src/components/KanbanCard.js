import React from "react";
import "./KanbanCard.css";
import img from "../images/leetcodee.png";
import np1 from "../images/Done.svg";
import np5 from "../images/To-do.svg";
import np2 from "../images/in-progress.svg";
import np3 from "../images/Cancelled.svg";
import np4 from "../images/Backlog.svg";
import featureImg from "../images/Done.svg"; // Assuming this is the feature image
import up from "../images/SVG - Urgent Priority grey.svg"

const KanbanCard = ({ ticket, users, groupBy }) => {
  console.log(groupBy);
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];

  // Map statuses to corresponding images
  const statusImages = {
    "Backlog": np4,
    "Todo": np5,
    "In progress": np2,
    "Done": np1,
    "Cancel": np3
  };

  const user = users.find(user => user.id === ticket.userId);

  // Function to truncate title if it has more than 8 words
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "...";
    }
    return title;
  };

  return (
    <div className="kanban-card">
      {groupBy === "user" ? (
        <>
          <div className="kanban-card-header">
            <h3>{ticket.id}</h3>
          </div>
          <div className="kanban-card-title">
            <h3>{truncateTitle(ticket.title)}</h3>
          </div>
          <div className="kanban-card-body">
            <img src={featureImg} alt="Ticket" className="kanban-card-image" />
            <div className="kanban-card-details">
              <img src={featureImg} alt="Tag" className="kanban-card-tag-image" />
              <p>{ticket.tag.join(", ")}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="kanban-card-header">
            <h3>{ticket.id}</h3>
            <img src={featureImg} alt="Ticket" />
          </div>
          <div className="car">
            <h3>
              {/* Only show the status image if groupBy is NOT 'status' */}
              {groupBy !== "status" && (
                <img
                  src={statusImages[ticket.status]} // Correctly map status to image
                  alt={ticket.status}
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              )}
              {truncateTitle(ticket.title)}
            </h3>
            {/* <p>Status: {ticket.status}}</p> */}
            {/* <p>Priority: {priorityLabels[ticket.priority]}</p> */}
            <p><svg  style={{ width: "20px", height: "20px", marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#afb1b6" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
</svg>Feature Request</p>
          </div>
        </>
      )}
    </div>
  );
};

export default KanbanCard;
