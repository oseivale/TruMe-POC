import React, { useState } from 'react';
import html2canvas from 'html2canvas';

export const data = {
  talent: { id: "", name: "Talent", shortCode: "Ta", colourHex: "#2fb56a" },
  music: { id: "", name: "Music", shortCode: "Mu", colourHex: "#231f20" },
  tech: { id: "", name: "Tech", shortCode: "Te", colourHex: "#d4d0ae" },
  dance: { id: "", name: "Dance", shortCode: "Da", colourHex: "#f16676" },
  sports: { id: "", name: "Sports", shortCode: "Ss", colourHex: "#ffcb05" },
  time: { id: "", name: "Time", shortCode: "Ti", colourHex: "#af5f88" },
  meditation: { id: "", name: "Meditation", shortCode: "Me", colourHex: "#bbe0ca" },
  freedom: { id: "", name: "Freedom", shortCode: "Fr", colourHex: "#0098d7" },
  truth: { id: "", name: "Truth", shortCode: "Tr", colourHex: "#3aab45" },
  justice: { id: "", name: "Justice", shortCode: "Ju", colourHex: "#496573" },
  independent: { id: "", name: "Independent", shortCode: "In", colourHex: "#f37043" },
  balance: { id: "", name: "Balance", shortCode: "Ba", colourHex: "#fcc6a9" },
  faith: { id: "", name: "Faith", shortCode: "Fa", colourHex: "#671d7a" },
  kindness: { id: "", name: "Kindness", shortCode: "Ki", colourHex: "#f6adcd" },
  love: { id: "", name: "Love", shortCode: "Lo", colourHex: "#bb141a" },
  family: { id: "", name: "Family", shortCode: "Fa", colourHex: "#38247c" },
  god: { id: "", name: "God", shortCode: "Gd", colourHex: "#ba8750" },
  animals: { id: "", name: "Animals", shortCode: "An", colourHex: "#968f40" },
  nature: { id: "", name: "Nature", shortCode: "Na", colourHex: "#88ac2e" },
  spirit: { id: "", name: "Spirit", shortCode: "Sp", colourHex: "#44c8f5" },
  soul: { id: "", name: "Soul", shortCode: "So", colourHex: "#c6006f" },
  health: { id: "", name: "Health", shortCode: "He", colourHex: "#ed1c24" },
  peace: { id: "", name: "Peace", shortCode: "Pe", colourHex: "#abe1fa" },
  earth: { id: "", name: "Earth", shortCode: "Ea", colourHex: "#905501" },
  wealth: { id: "", name: "Wealth", shortCode: "We", colourHex: "#034ea2" },
  wisdom: { id: "", name: "Wisdom", shortCode: "Wi", colourHex: "#785989" },
  knowledge: { id: "", name: "Knowledge", shortCode: "Kn", colourHex: "#ee3356" },
  strength: { id: "", name: "Strength", shortCode: "St", colourHex: "#939598" },
  courage: { id: "", name: "Courage", shortCode: "Co", colourHex: "#fec667" },
};

// Predefined colors for the user to choose from
const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#FFD700", "#FF33A8"];

const CustomButtons = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null); // To store the selected color

  const handleButtonClick = (key) => {
    if (selectedValues.includes(key)) {
      setSelectedValues(selectedValues.filter((item) => item !== key));
    } else if (selectedValues.length < 5) {
      setSelectedValues([...selectedValues, key]);
    }
  };

  const handleClearAll = () => {
    setSelectedValues([]);
    setSelectedColor(null); // Clear the selected color
  };

  const handleDownloadImage = () => {
    const canvasElement = document.getElementById('logoCanvas');
    html2canvas(canvasElement).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'custom-logo.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(data).map((key) => {
          const isSelected = selectedValues.includes(key);
          const selectedIndex = selectedValues.indexOf(key);

          return (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              style={{
                backgroundColor: isSelected ? data[key].colourHex : '#ddd',
                color: '#fff',
                padding: '10px 20px',
                margin: '5px',
                border: 'none',
                borderRadius: '5px',
                cursor: selectedValues.length >= 5 && !isSelected ? 'not-allowed' : 'pointer',
                position: 'relative',
              }}
              disabled={selectedValues.length >= 5 && !isSelected}
            >
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  {selectedIndex + 1}
                </span>
              )}
              {data[key].shortCode} - {data[key].name}
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Pick a Color:</label>
        {colorOptions.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelection(color)}
            style={{
              backgroundColor: color,
              width: '30px',
              height: '30px',
              margin: '0 5px',
              border: selectedColor === color ? '3px solid #000' : 'none',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <button
        onClick={handleClearAll}
        style={{
          backgroundColor: '#ff6666',
          color: '#fff',
          padding: '10px 20px',
          marginTop: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Clear All
      </button>

      {/* Canvas for Displaying the Logo */}
      <div
        id="logoCanvas"
        style={{
          display: 'flex',
          marginTop: '30px',
          height: '150px',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const selectedKey = selectedValues[index];
          const backgroundColor = selectedColor
            ? selectedColor
            : selectedKey
            ? data[selectedKey].colourHex
            : '#e0e0e0';

          return (
            <div
              key={index}
              style={{
                flex: 1,
                backgroundColor: backgroundColor,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                padding: '10px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              {selectedKey ? (
                <>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{data[selectedKey].shortCode}</span>
                  <span style={{ fontSize: '16px' }}>{data[selectedKey].name}</span>
                </>
              ) : (
                <span style={{ fontSize: '14px', color: '#aaa' }}>Select Value</span>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleDownloadImage}
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          padding: '10px 20px',
          marginTop: '20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download Image
      </button>
    </div>
  );
};

export default CustomButtons;
