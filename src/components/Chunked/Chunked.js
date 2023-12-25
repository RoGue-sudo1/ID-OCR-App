import { useEffect, useState } from "react";
import axios from "axios";
import "./Chunked.css";
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from "react-router";
import GridLoader from "react-spinners/GridLoader";
import Header from "../Header/Header";

const Chunked = () => {
  const navigate = useNavigate();

  // State variables
  const [uploadedFile, setUploadedFile] = useState(null),
    [previewUrl, setPreviewUrl] = useState(),
    [loading, setLoading] = useState(false),
    [isUploading, setIsUploading] = useState(false),
    [uploadComplete, setUploadComplete] = useState(false),
    [extractionStatus, setExtractionStatus] = useState(""),
    [userData, setUserData] = useState({});

  // Event handler for file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setUploadedFile(selectedFile);

    if (selectedFile) {
      // Read the file and set data URL for image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Navigating to history page by clicking on history button
  const handleHistoryButton = () => {
    navigate("/history");
  };

  // Main function to upload file in chunks
  const uploadFile = async () => {
    if (!uploadedFile) {
      console.error("Please select a file.");
      return;
    }

    const uniqueUploadId = generateUniqueUploadId();
    const chunkSize = 2 * 1024 * 1024; // 2 MB chunks
    const totalChunks = Math.ceil(uploadedFile.size / chunkSize);
    let currentChunk = 0;

    setIsUploading(true);

    // Recursive function to upload each chunk
    const uploadChunk = async (start, end) => {
      const formData = new FormData();
      formData.append("file", uploadedFile.slice(start, end));
      formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_NAME);
      const contentRange = `bytes ${start}-${end - 1}/${uploadedFile.size}`;

      console.log(
        `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${
          end - 1
        }`
      );

      try {
        // Make a chunk upload request to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`,
          formData,
          {
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": contentRange,
            },
          }
        );

        if (!response) {
          throw new Error("Chunk upload failed: Empty response.");
        }

        // Increment the chunk counter
        currentChunk++;

        // If there are more chunks, recursively upload the next one
        if (currentChunk < totalChunks) {
          const nextStart = currentChunk * chunkSize;
          const nextEnd = Math.min(nextStart + chunkSize, uploadedFile.size);
          uploadChunk(nextStart, nextEnd);
        } else {
          // All chunks uploaded, set flags and send Cloudinary response to the local server
          setUploadComplete(true);
          setIsUploading(false);

          const cloudinaryUrl = response.data.url;

          // Send Cloudinary response to the local server using Axios
          setLoading(true);
          const data = await axios.post(process.env.REACT_APP_BACKEND_SERVER, {
            url: cloudinaryUrl,
          });
          setUserData(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading chunk:", error.message);
        setIsUploading(false);
      }
    };

    // Start the first chunk upload
    const start = 0;
    const end = Math.min(chunkSize, uploadedFile.size);
    uploadChunk(start, end);
  };

  // Function to generate a unique upload ID
  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };

  // useEffect to listen for changes in uploadComplete state
  useEffect(() => {
    if (uploadComplete) {
      // Set a message indicating that data is extracted
      setExtractionStatus(`Data is extracted! Please check history`);
    }
  }, [uploadComplete]);

  // React component rendering
  return loading ? (
    <div className="loader">
      <GridLoader
        color={"#144ccf"}
        loading={true}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <span
        style={{
          marginTop: "5px",
          fontSize: "25px",
          fontWeight: "bold",
          color: "#144ccf",
        }}
      >
        Extraction in process... Please wait
      </span>
    </div>
  ) : (
    <div className="chunked-container">
      <div >
        <div className="chunked-header">
          <Header />
        </div>

        <div
          className="form"
          onClick={() => document.querySelector(".input-field").click()}
        >
          <input
            type="file"
            accept="image/*"
            className="input-field"
            hidden
            onChange={handleFileChange}
          />
          {uploadedFile ? (
            <img
              src={previewUrl}
              width={150}
              height={150}
              alt={uploadedFile.name}
            />
          ) : (
            <>
              <MdCloudUpload color="#1475cf" size={60} />
              <p>Browse files to upload</p>
            </>
          )}
        </div>
        <div className="upload-button-div">
          <button
            className="upload-button"
            onClick={uploadFile}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button className="history-button" onClick={handleHistoryButton}>
            History
          </button>
        </div>
        {extractionStatus && (
          <div className="extraction-status">
            <p>User Data:</p>
            <pre>{JSON.stringify(userData.user, null, 2)}</pre>
            <p>Message: {userData.message}. Check out history for more</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chunked;
