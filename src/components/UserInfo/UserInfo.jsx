import "./UserInfo.css";

const RequestForm = () => {
  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="username" className="icon-username">
          Username
        </label>
        <input type="text" name="username" id="username" />
      </div>
      <button type="submit" className="btn-save">
        Save
      </button>
    </div>
  );
};

export default RequestForm;
