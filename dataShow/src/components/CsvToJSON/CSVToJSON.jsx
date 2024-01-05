import React, { useState, useEffect, useRef } from "react";
import csvtojson from "csvtojson";

import classes from "./csvToJson.module.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/img/logo_tuerkis_schrift-04.png";
import logoText from "../../assets/img/logo_tuerkis_schrift-02.png";
import appLogo from "../../assets/img/dataShowLogo.png";

import sharetribe from "../../assets/img/tutorial/0.png";
import sharetribe1 from "../../assets/img/tutorial/1.png";

import Button from "react-bootstrap/Button";

import FilterComponent from "../FilterComponent/FilterComponent";
import Modal from "../Modal/Modal.jsx";

import beach1 from "../../assets/img/Goa_beach_silhouette_1.png";
import backpack from "../../assets/img/9jt08ahp6ut0s260j7275hrlc5.png";
import doves from "../../assets/img/—Pngtree—flying bird silhouette soaring in_6470118.png";

//translation
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
const CSVToJSON = () => {
  const { t } = useTranslation();

  const handleMouseDown = (e) => {
    e.target.style.transform = "translateY(2px)";
  };

  /* userName data */

  const [userName, setUserName] = useState("");
  const [userNameSubmitted, setUserNameSubmitted] = useState(false);

  /* listings data */
  const [jsonData, setJsonData] = useState(null);

  /*user data */
  const [jsonUserData, setJsonUserData] = useState(null);
  /*overlay  */

  const [overlay, setOverlay] = useState(true);
  /*help modal listings*/
  const [openHelpInitial, setOpenHelpInitial] = useState(false);
  /*help modal users*/
  const [openHelpUsersInitial, setOpenHelpUserInitial] = useState(false);

  /*drawer toggle */
  const [drawerVisible, setDrawerVisible] = useState(false); // State for drawer visibility

  /*for display name of file */
  const [fileName, setFileName] = useState("");
  const [fileUserName, setFileUserName] = useState("");

  const openHelpInitialListingModal = () => {
    setOpenHelpInitial(true);
  };

  const closeHelpInitialListingModal = () => {
    setOpenHelpInitial(false);
  };
  const openHelpInitialUserModal = () => {
    setOpenHelpUserInitial(true);
  };

  const closeHelpInitialListingUserModal = () => {
    setOpenHelpUserInitial(false);
  };

  /**
   * The function `capitalizeEachWord` takes a string as input and returns a new string with the first
   * letter of each word capitalized.
   * @returns The function `capitalizeEachWord` returns a string with each word capitalized.
   */
  /*capitalize the userName  */
  function capitalizeEachWord(str) {
    // Split the string into an array of words
    const wordsArray = str.split(" ");

    // Capitalize the first letter of each word
    const capitalizedWords = wordsArray.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back to form the capitalized string
    const capitalizedString = capitalizedWords.join(" ");

    return capitalizedString;
  }

  /* csv listing file metadata */
  const [fileMetadata, setFileMetadata] = useState(null);
  const [fileUserMetadata, setUserFileMetadata] = useState(null);

  const inputFileRef = useRef(null); // Ref for the input listing element
  const inputUserFileRef = useRef(null); // Ref for the input user element

  const handleChange = (event) => {
    setUserName(capitalizeEachWord(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName.length > 0) {
      setUserNameSubmitted(true);
    }
  };

  const goBackToNameInput = () => {
    setUserNameSubmitted(false);
    setUserName("");
  };

  // const handleListingsFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const fileReader = new FileReader();

  //   fileReader.onload = async (event) => {
  //     const csvData = event.target.result;
  //     const jsonArray = await csvtojson().fromString(csvData);

  //     const modifiedData = jsonArray.map((item) => {
  //       const publicData1 = JSON.parse(item.PublicData);
  //       return { ...item, publicData1 };
  //     });
  //     console.log(csvData);
  //     setJsonData(modifiedData);
  //     setOverlay(false);
  //     setDrawerVisible(true);
  //   };

  //   fileReader.readAsText(file);

  //   // Get file metadata
  //   const fileMetadata = {
  //     name: file.name,
  //     size: file.size,
  //     type: file.type,
  //     lastModified: file.lastModified,
  //     lastModifiedDate: file.lastModifiedDate,
  //   };

  //   // Store the file metadata in a state variable
  //   setFileMetadata(fileMetadata);

  //   // Store the file name separately
  //   setFileName(file.name);
  // };
  const handleListingsFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      const csvData = event.target.result;

      // Check if csv file is the correct one
      const specificString =
        "Id,CreatedAt,Title,PriceAmount,PriceCurrency,AuthorId,State,ImageCount,CurrentStockQuantity,PublicData,PrivateData,Metadata";
      if (csvData.includes(specificString)) {
        const jsonArray = await csvtojson().fromString(csvData);

        const modifiedData = jsonArray.map((item) => {
          const publicData1 = JSON.parse(item.PublicData);
          return { ...item, publicData1 };
        });

        // Set the modified data in the state
        setJsonData(modifiedData);

        // Hide the overlay
        setOverlay(false);

        // Show the drawer
        setDrawerVisible(true);
      } else {
        // Display an error message if the specific string is not found
        alert(t("pleaseSelectOtherFile"));
      }
    };

    fileReader.readAsText(file);

    // Get file metadata
    const fileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
    };

    // Store the file metadata in a state variable
    setFileMetadata(fileMetadata);

    // Store the file name separately
    setFileName(file.name);
  };

  const handleUserFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      const csvData = event.target.result;
      const jsonArray = await csvtojson().fromString(csvData);

      const modifiedData = jsonArray.map((item) => {
        const publicData1 = JSON.parse(item.PublicData);
        return { ...item, publicData1 };
      });

      setJsonUserData(modifiedData);
    };

    fileReader.readAsText(file);

    // Get file metadata
    const fileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
    };

    // Store the file metadata in a state variable
    setUserFileMetadata(fileMetadata);
    setOverlay(false);
    setDrawerVisible(true);

    // Update the value of inputFileRef
    setFileUserName(file.name);
  };

  const removeListingCsvFile = () => {
    setJsonData(null);
    setFileMetadata(null);
    inputFileRef.current.value = null; // Reset the input value
    setOverlay(true);
    setDrawerVisible(false);
    setFileName("");
  };

  const removeUserCsvFile = () => {
    setJsonUserData(null);
    setUserFileMetadata(null);
    inputUserFileRef.current.value = null; // Reset the input value
    setOverlay(true);
    setDrawerVisible(false);
    setFileUserName("");
  };
  const toggleDrawer = () => {
    setOverlay((prevState) => !prevState);
    setDrawerVisible((prevState) => !prevState);
  };

  return (
    <div className={classes["csvToJson-container"]}>
      <LanguageSelector onJsonData={jsonData} />
      {jsonData && (
        <button
          id="step7"
          className={classes["drawer-toggle-button"]}
          onClick={toggleDrawer}
        >
          {!drawerVisible ? (
            <i className="fas fa-chevron-right"></i>
          ) : (
            <i className="fas fa-chevron-left"></i>
          )}
        </button>
      )}
      {overlay && (
        <div className={classes["drawer-overlay"]}>
          {!jsonData && (
            <img className={classes["bkg-img4"]} src={appLogo}></img>
          )}
          <img className={classes["bkg-img3"]} src={doves}></img>
          <img className={classes["bkg-img1"]} src={beach1}></img>
          <img className={classes["bkg-img2"]} src={backpack}></img>
          {!userNameSubmitted && (
            <div
              className={`${classes["drawer"]} ${
                drawerVisible ? classes["visible"] : ""
              }`}
            >
              <h2> {t("greeting")}</h2>
              <div className={classes["name-input-container"]}>
                <img className={classes["logo"]} src={logo} alt="Logo" />
                <form
                  onSubmit={handleSubmit}
                  className={classes["name-input-form"]}
                >
                  <label htmlFor="name">{t("nameLabel")}</label>
                  <input
                    onMouseDown={handleMouseDown}
                    data-testid="name"
                    id="name"
                    type="text"
                    value={userName}
                    onChange={handleChange}
                  />
                  <button
                    onMouseDown={handleMouseDown}
                    className={classes["ok-btn"]}
                    type="submit"
                    data-testid="ok"
                  >
                    Ok
                  </button>
                </form>
              </div>
            </div>
          )}
          {userName.length > 0 && userNameSubmitted && (
            <div
              className={`${classes["drawer"]} ${
                drawerVisible ? classes["visible"] : ""
              }`}
            >
              {!jsonData && (
                <div className={classes["logo-title"]}>
                  <img className={classes["logo"]} src={logo} alt="Logo" />
                  <h2 className={classes["name-span-title"]}>
                    {" "}
                    {t("please")}{" "}
                    <span
                      onClick={goBackToNameInput}
                      className={classes["name-span"]}
                    >
                      {userName}{" "}
                      <div className={classes["close-btn"]}>&times;</div>
                    </span>{" "}
                    {t("csvFileToBeRead")}
                  </h2>
                </div>
              )}
              <div className={classes["topBar-container"]}>
                {jsonData && (
                  <Button
                    onMouseDown={handleMouseDown}
                    className={classes["close-drawer"]}
                    onClick={toggleDrawer}
                    style={{ background: "#1C7881", border: "none" }}
                  >
                    <i
                      className="fas fa-xmark"
                      style={{ fontSize: "16px", color: "white" }}
                    ></i>
                  </Button>
                )}
                {jsonData && (
                  <img
                    className={classes["logoText"]}
                    src={logoText}
                    alt="Logo Text"
                  />
                )}

                <div className={classes["input-container"]}>
                  <h3>{t("listingsFileToBeImported")} </h3>
                  <div className={classes["input-text-container"]}>
                    <input
                      ref={inputFileRef}
                      type="file"
                      accept=".csv"
                      onChange={handleListingsFileUpload}
                      style={{ color: "transparent" }} // Apply CSS styling to hide the placeholder text
                    />
                    <p>{fileName}</p>
                    {fileName && (
                      <i
                        className="fas fa-check"
                        style={{
                          margin: "0 1em",
                          fontSize: "16px",
                          color: "#1C7881",
                        }}
                      ></i>
                    )}
                    <div className={classes["btn-container"]}>
                      <Button
                        onClick={removeListingCsvFile}
                        style={{
                          margin: "0 1em 0 4px",
                          background: "#1C7881",
                          border: "none",
                        }}
                      >
                        <i
                          className="fas fa-trash"
                          style={{ fontSize: "16px", color: "white" }}
                        ></i>
                      </Button>
                      {!jsonData && (
                        <Button
                          onClick={openHelpInitialListingModal}
                          style={{
                            margin: "0 1em",
                            background: "#1C7881",
                            border: "none",
                          }}
                        >
                          <i
                            className="fas fa-question-circle"
                            style={{ fontSize: "16px", color: "white" }}
                          ></i>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {jsonData && (
                  <div className={classes["input-container"]}>
                    <h3>{t("usersFileToBeImported")}</h3>
                    <div className={classes["input-text-container"]}>
                      <input
                        ref={inputUserFileRef}
                        type="file"
                        accept=".csv"
                        onChange={handleUserFileUpload}
                        style={{ color: "transparent" }}
                      />
                      <p>{fileUserName}</p>
                      {fileUserName && (
                        <i
                          className="fas fa-check"
                          style={{
                            margin: " 0 1em",
                            fontSize: "16px",
                            color: "#1C7881",
                          }}
                        ></i>
                      )}

                      <div className={classes["btn-container"]}>
                        <Button
                          onClick={removeUserCsvFile}
                          style={{
                            margin: "0 1em 0 4px",
                            background: "#1C7881",
                            border: "none",
                          }}
                        >
                          <i
                            className="fas fa-trash"
                            style={{ fontSize: "16px", color: "white" }}
                          ></i>
                        </Button>
                        {!jsonUserData && (
                          <Button
                            onClick={openHelpInitialUserModal}
                            style={{
                              margin: "0 1em",
                              background: "#1C7881",
                              border: "none",
                            }}
                          >
                            <i
                              className="fas fa-question-circle"
                              style={{ fontSize: "16px", color: "white" }}
                            ></i>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <Modal
            isOpen={openHelpInitial}
            onClose={closeHelpInitialListingModal}
          >
            <h2>{t("listingsFileHelp1")}</h2>
            <div className={classes["help-container"]}>
              <img
                className={classes["help-container-img"]}
                src={sharetribe}
                alt="Sharetribe"
              />
              <div>
                <h3>{t("listingsFileHelp2")}</h3>
                <h3>{t("listingsFileHelp3")}</h3>
                <h3>{t("listingsFileHelp4")}</h3>
                <h3>{t("listingsFileHelp5")}</h3>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={openHelpUsersInitial}
            onClose={closeHelpInitialListingUserModal}
          >
            <h2>{t("usersFileHelp1")}</h2>
            <div className={classes["help-container"]}>
              <img
                className={classes["help-container-img"]}
                src={sharetribe1}
                alt="Sharetribe"
              />
              <div>
                <h3>{t("usersFileHelp2")}</h3>
                <h3>{t("usersFileHelp3")}</h3>
                <h3>{t("usersFileHelp4")}</h3>
                <h3>{t("usersFileHelp5")}</h3>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {jsonData && (
        <FilterComponent
          jsonData={jsonData}
          fileMetadata={fileMetadata}
          jsonUserData={jsonUserData}
          fileUserMetadata={fileUserMetadata}
          onUserName={userName}
        />
      )}
    </div>
  );
};

export default CSVToJSON;
