import React, { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

import Textarea from "../textarea";
import Button from "../button";
import Dropdown from "../dropdown";

import "./index.css";

const decodeOptions = [
  { value: "base64", label: "Base64" },
  { value: "decodeURI", label: "Decode URI" },
  { value: "decodeURIComponent", label: "Decode URI Component" },
];

const encodeOptions = [
  { value: "base64", label: "Base64" },
  { value: "encodeURI", label: "Encode URI" },
  { value: "encodeURIComponent", label: "Encode URI Component" },
];

const Decoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modeType, setModeType] = useState({
    encode: "base64",
    decode: "base64",
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const showError = () => {
    if (error?.length) {
      alert(error);
    }
  };

  const handleDecode = () => {
    setError("");

    let decodedString = "";

    try {
      switch (modeType.decode) {
        case "base64":
          decodedString = atob(input);
          break;
        case "decodeURI":
          decodedString = decodeURI(input);
          break;
        case "decodeURIComponent":
          decodedString = decodeURIComponent(input);
          break;
        default:
          setError("Invalid decode type");
          break;
      }

      setOutput(decodedString);
    } catch (error) {
      setError("Invalid input for the selected decode type!");
      showError();
    }
  };

  const handleEncode = () => {
    setError("");

    let encodedString = "";

    try {
      switch (modeType.encode) {
        case "base64":
          encodedString = btoa(input);
          break;
        case "encodeURI":
          encodedString = encodeURI(input);
          break;
        case "encodeURIComponent":
          encodedString = encodeURIComponent(input);
          break;
        default:
          setError("Invalid encode type");
          break;
      }
      setOutput(encodedString);
    } catch (error) {
      setError("Invalid input for the selected encode type!");
      showError();
    }
  };

  const onClickPrettify = () => {
    const parsedJson = JSON.parse(output);
    const prettifiedJson = JSON.stringify(parsedJson, null, 4);
    setOutput(prettifiedJson);
  };

  const isValidJSON = () => {
    if (output?.length) {
      try {
        JSON?.parse(output);
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  };

  const handlCopyToCilpboard = () => {
    navigator.clipboard.writeText(output);
  }

  return (
    <div>
      <div className={`title ${isDarkMode ? "dark" : "light"}`}>
        <span className="title-text">Encoder-Decoder Hub</span>
        <Tooltip
          title={isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          arrow
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <span className="title-dark-mode">
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={35}
            />
          </span>
        </Tooltip>
      </div>
      <div className="encoder-decoder-wrapper">
        <div className="input-container">
          <div>
            <Textarea
              input={input}
              setInput={setInput}
              className={isDarkMode ? "dark" : "light"}
              placeholder="Type / Paste here..."
            />
          </div>
          <div className="action-wrapper">
            <div className="actions">
              <Dropdown
                options={decodeOptions}
                value={modeType.decode}
                onChange={(value) =>
                  setModeType({ ...modeType, decode: value })
                }
                style={{ marginRight: "10px" }}
                className={`action-dropdown ${isDarkMode ? "dark" : "light"}`}
              />
              <Button
                value="Decode"
                onClick={handleDecode}
                className={isDarkMode ? "dark" : "light"}
              />
            </div>
            <div className="actions">
              <Dropdown
                options={encodeOptions}
                value={modeType.encode}
                onChange={(value) =>
                  setModeType({ ...modeType, encode: value })
                }
                className={`action-dropdown ${isDarkMode ? "dark" : "light"}`}
                style={{ marginRight: "10px" }}
              />
              <Button
                value="Encode"
                onClick={handleEncode}
                className={isDarkMode ? "dark" : "light"}
              />
            </div>
          </div>
        </div>
        <div className="output-container">
          <Textarea
            input={output}
            setInput={setOutput}
            className={isDarkMode ? "dark" : "light"}
          />
          <div className="output-actions">
            {isValidJSON() && (
              <Button
                value="Prettify"
                onClick={onClickPrettify}
                className={isDarkMode ? "dark" : "light"}
              />
            )}
            {output?.length ? (
              <span className={`copy-icon ${isDarkMode ? "dark" : "light"}`} onClick={handlCopyToCilpboard}>
                <ContentCopyIcon />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decoder;
