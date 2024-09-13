import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './KanbanBoard.css';
import KanbanCard from "./KanbanCard";
import np1 from "../images/No-priority.svg";
import np5 from "../images/SVG - Urgent Priority colour.svg";
import np2 from "../images/Img - Low Priority.svg";
import np3 from "../images/Img - High Priority.svg";
import np4 from "../images/Img - Medium Priority.svg";
import np6 from "../images/3dot.svg";
import disp from "../images/Display.svg"
import np7 from "../images/add.svg";

import np11 from "../images/Done.svg";
import np15 from "../images/To-do.svg";
import np12 from "../images/in-progress.svg";
import np13 from "../images/Cancelled.svg";
import np14 from "../images/Backlog.svg";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [users, setUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null); // Ref for the dropdown

  const statusImages = {
    "Backlog": np14,
    "Todo": np15,
    "In progress": np12,
    "Done": np11,
    "Cancel": np13
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Close the dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedTickets = tickets.sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority; // Sort by descending priority
    }
    return a.title.localeCompare(b.title); // Sort alphabetically by title
  });

  let allGroups;
  if (groupBy === "status") {
    allGroups = ["Backlog", "Todo", "In progress", "Done", "Cancel"];
  } else if (groupBy === "priority") {
    allGroups = [4, 3, 2, 1, 0];
  } else if (groupBy === "user") {
    allGroups = users.map(user => user.name); // Use all user names
  }

  const groupedTickets = sortedTickets.reduce((groups, ticket) => {
    let key;
    switch (groupBy) {
      case "user":
        key = users.find(user => user.id === ticket.userId)?.name || "Unknown User";
        break;
      case "status":
        key = ticket.status;
        break;
      case "priority":
      default:
        key = ticket.priority;
        break;
    }
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
    return groups;
  }, {});

  const img1 = {
    "No Priority": np1,
    "Low": np2,
    "Medium": np4,
    "High": np3,
    "Urgent": np5
  };

  const groupNames = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
    "Backlog": "Backlog",
    "To-Do": "To-Do",
    "In Progress": "In Progress",
    "Done": "Done",
    "Cancel": "Cancel",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="kanban-board">
      <div className="s1">
        <div className="s2" onClick={toggleDropdown} ref={dropdownRef}>
          <img src={disp} alt="Display Icon" className="display-icon" />
          <span>Display</span>
          {/* Conditionally render the dropdown if it's open */}
          {isDropdownOpen && (
            <div className="dropdown s3">
              <label>
                Group by:
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                  <option value="user">User</option>
                </select>
              </label>
              <label>
                Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="kanban-columns ank">
        {/* Loop through all possible groups */}
        
        {allGroups.map((group) => (
          <div key={group} className="kanban-column">
            <h2 className="toy">
              {/* Show status or priority images accordingly */}
              <p className="p3">{groupBy === "status" && (
                <img
                  src={statusImages[group]}
                  alt={group}
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              )}
              {groupBy === "priority" && (
                <img
                className
                  src={img1[groupNames[group]]}
                  alt={groupNames[group]}
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              )}
              {groupNames[group] || group}
              <span className="p1">
                {groupedTickets[group] && groupedTickets[group].length ? groupedTickets[group].length : 0}
              </span></p>
              
              
              {/* Add icons */}
              <p className="c1"><span>
                <img
                  src={np7}
                  alt="Add"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              </span>
              <span>
                <img
                  src={np6}
                  alt="Options"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              </span></p>
              
            </h2>
            {/* Display the tickets for this group, if any, or a "No tickets" message */}
            {groupedTickets[group] && groupedTickets[group].length > 0 ? (
              groupedTickets[group].map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
              ))
            ) : (
              <div className="empty-state">No tickets</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
