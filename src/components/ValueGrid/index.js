"use client";

import styles from "./styles.module.css";
import { data } from "../../data";
import { useState } from "react";

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    style={{ marginLeft: ".5rem" }}
  >
    <path
      fill="#120D96"
      d="M12 6v3l4-4l-4-4v3a8 8 0 0 0-8 8c0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.9 5.9 0 0 1 6 12a6 6 0 0 1 6-6m6.76 1.74L17.3 9.2c.44.84.7 1.8.7 2.8a6 6 0 0 1-6 6v-3l-4 4l4 4v-3a8 8 0 0 0 8-8c0-1.57-.46-3.03-1.24-4.26"
    ></path>
  </svg>
);

export const ValueGrid = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [singleColorMode, setSingleColorMode] = useState(false);

  const handleButtonClick = (key) => {
    if (selectedValues.includes(key)) {
      // Deselect the value if it is already selected
      setSelectedValues(selectedValues.filter((item) => item !== key));
    } else if (selectedValues.length < 5) {
      // Select the value if less than 5 are selected
      setSelectedValues([...selectedValues, key]);
    }
  };

  const handleClearAll = () => {
    setSelectedValues([]);
  };

  const handleToggleSingleColor = () => {
    setSingleColorMode(!singleColorMode);
  };

  return (
    <div style={{width: '90%', margin: '0 auto'}}>
      <div style={{ marginBottom: "20px" }}>
        {Object.keys(data).map((key) => {
          const isSelected = selectedValues.includes(key);
          const selectedIndex = selectedValues.indexOf(key);

          return (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              className={
                selectedValues.length < 5 && !isSelected ? styles.valueBtn : ""
              }
              style={{
                backgroundColor: isSelected ? data[key].colourHex : "#D4D4D4",
                color: "#fff",
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor:
                  selectedValues.length >= 5 && !isSelected
                    ? "not-allowed"
                    : "pointer",
                position: "relative",
              }}
              disabled={selectedValues.length >= 5 && !isSelected}
            >
              {isSelected && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  {selectedIndex + 1}
                </span>
              )}
              <span className={styles.shortCode}>{data[key].shortCode}</span>
              <span className={styles.name}>{data[key].name}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <label style={{ marginRight: "10px" }}>Single Color Mode:</label>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={singleColorMode}
            onChange={handleToggleSingleColor}
          />
        
          <span className={styles.slider}></span>
        </label>
      </div>

      <button
        onClick={handleClearAll}
        style={{
          backgroundColor: "#fff",
          color: "#120D96",
          padding: "10px 20px",
          marginTop: "10px",
          border: "1px solid #120D96",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Clear All <ClearIcon />
      </button>

      {/* Canvas for Displaying the Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: "350px",
          borderRadius: "10px",
          overflow: "hidden",
          width: "400px",
          margin: "30px auto",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const selectedKey = selectedValues[index];
          const backgroundColor = singleColorMode
            ? selectedValues.length > 0
              ? /*data[selectedValues[0]].colourHex*/ "#034ea2"
              : "#e0e0e0"
            : selectedKey
            ? data[selectedKey].colourHex
            : "#e0e0e0";

          return (
            <div
              key={index}
              className={styles[`option_${index}`]}
              style={{
                flex: 1,
                // backgroundColor: selectedKey
                //   ? data[selectedKey].colourHex
                //   : "#e0e0e0",
                backgroundColor: backgroundColor,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                color: "#fff",
                padding: "10px",
                boxSizing: "border-box",
                textAlign: "center",
                marginRight: "1rem",
                borderRadius: "55px",
              }}
            >
              {selectedKey ? (
                <>
                  <span
                    className={styles.coreValueLabel}
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      paddingBottom: "2rem",
                    }}
                  >
                    {data[selectedKey].shortCode}
                  </span>
                  {/* <span style={{ fontSize: '12px' }}>{data[selectedKey].name}</span> */}
                </>
              ) : (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#aaa",
                    paddingBottom: "2rem",
                  }}
                >
                  Select Value
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
