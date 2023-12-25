import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MdOutlineArrowBackIos } from "react-icons/md";
import HistoryCard from "./HistoryCard";
import "./History.css";
import axios from "axios";

function History() {
  // React hooks to manage component state
  const navigate = useNavigate();
  const [dbData, setDbData] = useState(null); // Holds the data fetched from the server
  const [filteredDbData, setFilteredDbData] = useState({ data: null }); // Holds the filtered data for rendering
  const [filterFieldValue, setFilterFieldValue] = useState(""); // Holds the selected filter field
  const [isFilterInput, setIsFilterInput] = useState(false); // Tracks whether the filter input is active
  const [inputValue, setInputValue] = useState(""); // Holds the input value for filtering

  // Fetch data from the server when the component mounts
  const getData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_SERVER);
      setDbData(response.data);
      setFilteredDbData({ data: response.data.data }); // Initialize filtered data with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to call getData when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Event handler for changing the selected filter field
  const handleFilterButtonClicked = (e) => {
    setFilterFieldValue(e.target.value);
    setIsFilterInput(true);
  };

  // Event handler for clicking the search button
  const handleFilterFieldInputButtonClicked = () => {
    if (filteredDbData && filteredDbData.data) {
      // Filter data based on the selected filter field and input value
      const tempFilteredData = filteredDbData.data.filter(
        (item) => item[filterFieldValue] === inputValue
      );
      setFilteredDbData({ data: tempFilteredData });
    }
  };

  // Event handler for clicking the cancel button
  const handleFilterCancelButtonClicked = () => {
    setIsFilterInput(false);
    setFilterFieldValue("");
    setInputValue("");
    setFilteredDbData({ ...dbData }); // Reset filtered data to the original data
  };

  // Render the component
  return (
    <div>
      {/* Back button to navigate to the previous page */}
      <div
        className="back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <MdOutlineArrowBackIos />
        <span style={{ marginLeft: "5px", marginBottom: "1.5px" }}>Back</span>
      </div>
      {/* Conditional rendering based on whether the filter input is active */}
      {isFilterInput ? (
        <div className="filter-input-container">
          {/* Input field for filtering */}
          <input
            className="filter-input"
            placeholder={`Enter ${filterFieldValue}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* Search button to apply the filter */}
          <button
            className="filter-search-button"
            onClick={handleFilterFieldInputButtonClicked}
          >
            Search
          </button>
          {/* Cancel button to reset the filter */}
          <button
            className="filter-cancel-button"
            onClick={handleFilterCancelButtonClicked}
          >
            Cancel
          </button>
        </div>
      ) : (
        // Dropdown to select the filter field
        <div className="select">
          <select
            value={filterFieldValue}
            onChange={handleFilterButtonClicked}
          >
            <option value="">Filter field</option>
            <option value="id_no.">Id. no.</option>
            <option value="name">First name</option>
            <option value="last_name">Last name</option>
            <option value="date_of_birth">Date of Birth</option>
            <option value="date_of_issue">Date of issue</option>
            <option value="date_of_expiry">Date of expiry</option>
          </select>
        </div>
      )}
      {/* Render the filtered data if available */}
      {filteredDbData.data && (
        <div className="main-container">
          {filteredDbData.data.map((currData, index) => (
            // Render HistoryCard component for each data item
            <HistoryCard
              currData={currData}
              index={index}
              key={currData._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
