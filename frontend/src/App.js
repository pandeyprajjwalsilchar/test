import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import './components/KanbanBoard.css';
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupOption, setGroupOption] = useState("status"); // default grouping by status
  const [sortOption, setSortOption] = useState("priority"); // default sorting by priority

  useEffect(() => {
    
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  useEffect(() => {
    const savedGroupOption = localStorage.getItem("groupOption");
    if (savedGroupOption) setGroupOption(savedGroupOption);

    const savedSortOption = localStorage.getItem("sortOption");
    if (savedSortOption) setSortOption(savedSortOption);
  }, []);

  const handleGroupChange = (option) => {
    setGroupOption(option);
    localStorage.setItem("groupOption", option); 
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    localStorage.setItem("sortOption", option); 
  };

  return (
    <div className="App">
      
      <KanbanBoard tickets={tickets} groupOption={groupOption} sortOption={sortOption} />
    </div>
  );
};

export default App;
