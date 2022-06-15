import { TextField } from "@mui/material";

const Start = ({ onQuizStart, onChangeName, onChangeEmail }) => {
  return (
    <div className="card card-content">
      <div className="content">
        <h1>Start the quiz</h1>

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          onChange={onChangeEmail}
        />

        <TextField
          label="Name"
          name="name"
          variant="outlined"
          onChange={onChangeName}
        />

        <p>Good luck!</p>
        <button
          type="submit"
          className="button is-info is-meduim"
          onClick={onQuizStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Start;
