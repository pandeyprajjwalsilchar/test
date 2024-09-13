import React from "react";
import "./KanbanCard.css";
import np1 from "../images/Done.svg";
import np5 from "../images/To-do.svg";
import np2 from "../images/in-progress.svg";
import np3 from "../images/Cancelled.svg";
import np4 from "../images/Backlog.svg";
import usrs from "../images/user_s.svg";

import np21 from "../images/No-priority.svg";
import np25 from "../images/SVG - Urgent Priority colour.svg";
import np22 from "../images/Img - Low Priority.svg";
import np23 from "../images/Img - High Priority.svg";
import np24 from "../images/Img - Medium Priority.svg";


const KanbanCard = ({ ticket, users, groupBy }) => {
  console.log(groupBy);
  console.log(ticket.priority);
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];

  const statusImages = {
    "Backlog": np4,
    "Todo": np5,
    "In progress": np2,
    "Done": np1,
    "Cancel": np3
  };

  const priorityImages = {
    0: np21,
    1: np22,
    2: np24,
    3: np23,
    4: np25
  };

  const user = users.find(user => user.id === ticket.userId);

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 2).join(" ") + "...";
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
          <div className="kanban-card-title" style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
            <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src={statusImages[ticket.status]} alt="Ticket" className="kanban-card-image" />
            <h3>{truncateTitle(ticket.title)}</h3>
          </div>
          <div className="kanban-card-body">
            
            <div className="kanban-card-details">
              <img src={priorityImages[ticket.priority]} alt="Tag" className="kanban-card-tag-image" />
              <svg style={{ width: "10px", height: "10px", marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#afb1b6" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
                </svg>
              <p>{ticket.tag.join(", ")}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="kanban-card-header">
            <h3>{ticket.id}</h3>
            <img src={usrs} style={{ width: "15px", height: "15px", marginRight: "10px" }} alt="Ticket" />
          </div>

          <div className="car">
            <h3 style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
              {/* Only show the status image if groupBy is NOT 'status' */}
              {groupBy !== "status" && (
                <img
                  src={statusImages[ticket.status]} 
                  alt={ticket.status}
                  style={{ width: "15px", height: "15px", marginRight: "10px" }}
                />
              )}
              {truncateTitle(ticket.title)}
            </h3>

            {/* <p>Status: {ticket.status}}</p> */}
            {/* <p>Priority: {priorityLabels[ticket.priority]}</p> */}

            <div style={{ display: 'flex', alignItems: 'center' }}>
                {groupBy !== "priority" && (
                  <img src={priorityImages[ticket.priority]} style={{ width: "15px", height: "15px", marginRight: "10px" }} alt="Status" />
                )}
                <svg style={{ width: "10px", height: "10px", marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#afb1b6" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
                </svg>
                {/* <p style={{ marginRight: "10px" }}>Feature Request</p> */}
                <p>{ticket.tag.join(", ")}</p>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default KanbanCard;
