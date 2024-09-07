import "./Dialog.css";

// @ts-ignore
const Dialog = ({ apiResponse, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-dialog-overlay" onClick={onClose}>
      <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>API Response</h3>

        <div className="custom-dialog-body">
          <p>
            {apiResponse ? JSON.stringify(apiResponse) : "No response from API"}
          </p>
        </div>
        <div className="custom-dialog-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
