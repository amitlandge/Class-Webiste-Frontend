import { Box, Container, TextField, Typography } from "@mui/material";
import SubmitButton from "../../UI/SubmitButton";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../constants/server";

const AskDoubt = () => {
  const [input, setInput] = useState("");

  const [answer, setAnswer] = useState([]);

  const getInputHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/api/v1/message/ask`,
        {
          message: input,
        },
        { withCredentials: true }
      );
      setAnswer((prev) => [res.data.answer, ...prev]);
      setInput("");
      console.log(answer);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching answer");
    }
  };
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        margin: "2rem auto",
        gap: "1rem",
      }}
    >
      <Typography variant="h3">Ask Your Doubt</Typography>
      <Box
        component={"form"}
        onSubmit={getInputHandler}
        style={{
          display: "flex",
          width: "80vw",
        }}
      >
        <TextField
          type="text"
          fullWidth
          variant="outlined"
          placeholder="Ask to AI"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <SubmitButton title={"Ask"} />
      </Box>
      <Box>
        <Typography variant="h4">Answer:-</Typography>
        {answer?.map((ans, index) => (
          <Typography
            key={index}
            style={{
              margin: "2rem",
              background: "rgb(40,44,52)",
              padding: "1rem",
              color: "white",
              borderRadius: "1rem",
            }}
          >
            {ans}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default AskDoubt;
