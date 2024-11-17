import React from "react";

// eslint-disable-next-line react/prop-types
const Textarea = ({ input, setInput, isResizable, className, placeholder }) => {
  return (
    <div className={className}>
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
        style={{ resize: isResizable ? "both" : "none" }}
        placeholder={placeholder}
      />
    </div>
  );
};

Textarea.defaultProps = {
  isResizable: false,
};

export default Textarea;
