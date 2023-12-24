import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router";
import "./History.css";

const History = () => {
  const [dbData, setDbData] = useState(null);
  const [editCards, setEditCards] = useState([]);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate()

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

  const handleDeleteButtonClicked = () => {
    // Handle delete functionality
  };

  const handleEditButtonClicked = (identificationNumber) => {
    setEditCards((prevEditCards) => {
      if (prevEditCards.includes(identificationNumber)) {
        // Card is already in edit mode, remove it
        return prevEditCards.filter((id) => id !== identificationNumber);
      } else {
        // Card is not in edit mode, add it
        return [...prevEditCards, identificationNumber];
      }
    });

    // Clear edited data for the clicked card
    setEditedData((prevEditedData) => {
      const { [identificationNumber]: omit, ...rest } = prevEditedData;
      return rest;
    });
  };

  const handleInputChange = (e, field, identificationNumber) => {
    // Update the state with the edited data
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [identificationNumber]: {
        ...prevEditedData[identificationNumber],
        [field]: e.target.value,
      },
    }));
  };

  const handleCancelButtonClicked = (identificationNumber) => {
    setEditCards((prevEditCards) => {
      if (prevEditCards.includes(identificationNumber)) {
        // Card is already in edit mode, remove it
        return prevEditCards.filter((id) => id !== identificationNumber);
      } else {
        // Card is not in edit mode, add it
        return [...prevEditCards, identificationNumber];
      }
    });

    // Clear edited data for the clicked card
    setEditedData((prevEditedData) => {
      const { [identificationNumber]: omit, ...rest } = prevEditedData;
      return rest;
    });
  };

  const handleSaveButtonClicked = () => {};

  return dbData !== {} ? (
    <div className="main-container">

      <div className="back-button" onClick={()=>{navigate("/")}}>
        <MdOutlineArrowBackIos  />
        <span style={{marginLeft:"5px", marginBottom:"1.5px"}}>Back</span>
      </div>

      {dbData?.data.map((currData) => {
        const isEdit = editCards.includes(currData?.identification_number);

        return (
          <div
            className={`whole-card ${isEdit ? "edit-mode" : ""}`}
            key={currData?.identification_number}
          >
            <div className="id-card">
              <div className="action-buttons">
                <div className="delete-button">
                  <MdDelete onClick={handleDeleteButtonClicked} />
                </div>
                <div className="edit-button">
                  <MdEdit
                    onClick={() =>
                      handleEditButtonClicked(currData?.identification_number)
                    }
                  />
                </div>
              </div>

              {isEdit ? (
                // Render input fields in edit mode
                <>
                  <div className="info-item">
                    <strong>Identification Number:</strong>{" "}
                    <input
                      type="text"
                      value={
                        editedData[currData?.identification_number]
                          ?.identification_number ||
                        currData?.identification_number
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "identification_number",
                          currData?.identification_number
                        )
                      }
                    />
                  </div>
                  <div className="info-item">
                    <strong>First Name:</strong>{" "}
                    <input
                      type="text"
                      value={
                        editedData[currData?.identification_number]?.name ||
                        currData?.name
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "name",
                          currData?.identification_number
                        )
                      }
                    />
                  </div>
                  <div className="info-item">
                    <strong>Last Name:</strong>{" "}
                    <input
                      type="text"
                      value={
                        editedData[currData?.identification_number]
                          ?.last_name || currData?.last_name
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "last_name",
                          currData?.identification_number
                        )
                      }
                    />
                  </div>
                  <div className="info-item">
                    <strong>Date of Birth:</strong>{" "}
                    <input
                      type="date"
                      value={
                        editedData[currData?.identification_number]
                          ?.date_of_birth || currData?.date_of_birth
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "date_of_birth",
                          currData?.identification_number
                        )
                      }
                    />
                  </div>
                  <div className="info-item">
                    <strong>Date of Issue:</strong>{" "}
                    <input
                      type="date"
                      value={
                        editedData[currData?.identification_number]
                          ?.date_of_issue || currData?.date_of_issue
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "date_of_issue",
                          currData?.identification_number
                        )
                      }
                    />
                  </div>
                  <div className="info-item">
                    <strong>Date of Expiry:</strong>{" "}
                    <input
                      type="date"
                      value={
                        editedData[currData?.identification_number]
                          ?.date_of_expiry || currData?.date_of_expiry
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "date_of_expiry",
                          currData?.identification_number
                        )
                      }
                    />
                  </div>
                  <div className="edit-action-buttons">
                    <button
                      className="save-button"
                      onClick={handleSaveButtonClicked}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() =>
                        handleCancelButtonClicked(
                          currData?.identification_number
                        )
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // Render display mode
                <>
                  <div className="info-item">
                    <strong>Identification Number:</strong>{" "}
                    {currData?.identification_number}
                  </div>
                  <div className="info-item">
                    <strong>First Name:</strong> {currData?.name}
                  </div>
                  <div className="info-item">
                    <strong>Last Name:</strong> {currData?.last_name}
                  </div>
                  <div className="info-item">
                    <strong>Date of Birth:</strong>{" "}
                    {currData?.date_of_birth.slice(0, 10)}
                  </div>
                  <div className="info-item">
                    <strong>Date of Issue:</strong>{" "}
                    {currData?.date_of_issue.slice(0, 10)}
                  </div>
                  <div className="info-item">
                    <strong>Date of Expiry:</strong>{" "}
                    {currData?.date_of_expiry.slice(0, 10)}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <>...Loading</>
  );
};

export default History;
