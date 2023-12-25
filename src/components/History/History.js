import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MdOutlineArrowBackIos } from "react-icons/md";
import HistoryCard from "./HistoryCard";
import "./History.css";
function History() {
  const [dbData, setDbData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await fetch("http://localhost:5000/");
      const json = await data.json();
      setDbData(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        className="back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <MdOutlineArrowBackIos />
        <span style={{ marginLeft: "5px", marginBottom: "1.5px" }}>Back</span>
      </div>

      {dbData && (
        <div className="main-container">
          {dbData?.data.map((currData, index) => {
            return <HistoryCard currData={currData} index={index} key={currData._id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default History;
