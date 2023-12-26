
import axios from "axios";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./History.css";

// Functional component for rendering individual history cards
const HistoryCard = (currData, index) => {
  // State variables for edit mode, delete status, and edited data
  const [isEdit, setIsEdit] = useState(false),
    [isDelete, setIsDelete] = useState(currData.currData.isActive),
    [editedData, setEditedData] = useState({
      changedIdentificationNumber:
        currData.currData.identification_number || "",
      changedFirstName: currData.currData.name || "",
      changedLastName: currData.currData.last_name || "",
      changedDateOfBirth: currData.currData.date_of_birth || "",
      changedDateOfExpiry: currData.currData.date_of_expiry || "",
      changedDateOfIssue: currData.currData.date_of_issue || "",
    });

  // Function to handle the delete button click
  const handleDeleteButtonClicked = async (id) => {
    const data = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}?id=${id}`
    );
    setIsDelete((prevState) => !prevState);
  };

  // Function to handle the edit button click
  const handleEditButtonClicked = () => {
    setIsEdit((prevState) => !prevState);
  };

  // Function to handle the cancel button click
  const handleCancelButtonClicked = () => {
    setIsEdit((prevState) => !prevState);
  };

  // Function to handle the save button click
  const handleSaveButtonClicked = async () => {
    const data = await axios.put(process.env.REACT_APP_BACKEND_SERVER, {
      ...currData.currData,
      identification_number: editedData.changedIdentificationNumber,
      name: editedData.changedFirstName,
      last_name: editedData.changedLastName,
      date_of_birth: editedData.changedDateOfBirth,
      date_of_expiry: editedData.changedDateOfExpiry,
      date_of_issue: editedData.changedDateOfIssue,
    });

    setIsEdit((prevState) => !prevState);
  };

  return (
    // Render the card only if it is not deleted
    isDelete && (
      <div className="whole-card">
        <div className="id-card">
          <div className="action-buttons">
            {/* Delete button */}
            <div className="delete-button">
              <MdDelete
                onClick={() => {
                  handleDeleteButtonClicked(currData.currData._id);
                }}
              />
            </div>
            {/* Edit button */}
            <div className="edit-button">
              <MdEdit
                onClick={() => handleEditButtonClicked(currData.currData._id)}
              />
            </div>
          </div>

          {isEdit ? (
            // Render input fields in edit mode
            <>
              {/* Identification Number input */}
              <div className="info-item">
                <strong>Identification Number:</strong>{" "}
                <input
                  type="text"
                  value={editedData.changedIdentificationNumber}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      changedIdentificationNumber: e.target.value,
                    });
                  }}
                />
              </div>
              {/* First Name input */}
              <div className="info-item">
                <strong>First Name:</strong>
                <input
                  type="text"
                  value={editedData.changedFirstName}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      changedFirstName: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Last Name input */}
              <div className="info-item">
                <strong>Last Name:</strong>
                <input
                  type="text"
                  value={editedData.changedLastName}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      changedLastName: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Date of Birth input */}
              <div className="info-item">
                <strong>Date of Birth:</strong>{" "}
                <input
                  type="date"
                  value={editedData.changedDateOfBirth}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      changedDateOfBirth: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Date of Issue input */}
              <div className="info-item">
                <strong>Date of Issue:</strong>{" "}
                <input
                  type="date"
                  value={editedData.changedDateOfIssue}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      changedDateOfIssue: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Date of Expiry input */}
              <div className="info-item">
                <strong>Date of Expiry:</strong>{" "}
                <input
                  type="date"
                  value={editedData.changedDateOfExpiry}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      changedDateOfExpiry: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Edit action buttons */}
              <div className="edit-action-buttons">
                {/* Save button */}
                <button
                  className="save-button"
                  onClick={() => handleSaveButtonClicked(currData.currData._id)}
                >
                  Save
                </button>
                {/* Cancel button */}
                <button
                  className="cancel-button"
                  onClick={() => handleCancelButtonClicked()}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            // Render information in non-edit mode
            <>
              {/* Identification Number display */}
              <div className="info-item">
                <strong>Identification Number:</strong>{" "}
                {editedData.changedIdentificationNumber}
              </div>
              {/* First Name display */}
              <div className="info-item">
                <strong>First Name:</strong> {editedData.changedFirstName}
              </div>
              {/* Last Name display */}
              <div className="info-item">
                <strong>Last Name:</strong> {editedData.changedLastName}
              </div>
              {/* Date of Birth display */}
              <div className="info-item">
                <strong>Date of Birth:</strong>{" "}
                {editedData.changedDateOfBirth.slice(0, 10)}
              </div>
              {/* Date of Issue display */}
              <div className="info-item">
                <strong>Date of Issue:</strong>{" "}
                {editedData.changedDateOfIssue.slice(0, 10)}
              </div>
              {/* Date of Expiry display */}
              <div className="info-item">
                <strong>Date of Expiry:</strong>{" "}
                {editedData.changedDateOfExpiry.slice(0, 10)}
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default HistoryCard;
