import { Box, IconButton, Stack, TextField } from "@mui/material";
import StudentPortal from "./StudentPortal";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import MessageComponent from "../../components/Chat/MessageComponent";
import { AttachFile, EmojiEmotions, MoreVert, Send } from "@mui/icons-material";

import { getSocket } from "../../context/getSocket.js";
import { NEW_MESSAGE } from "../../eventConstant.js";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { getAllMessages } from "../../redux/reducers/message.js";
import {
  setDeleteMessage,
  setEmojiPopUp,
  setOpenAttachments,
} from "../../redux/reducers/misc.js";
import EmojiToggle from "../../toggle/EmojiToggle.jsx";
import FileToggle from "../../toggle/FileToggle.jsx";
const QandA = () => {
  const socket = getSocket();

  const [message, setMessage] = useState("");

  const { enrollDetails } = useSelector((state) => state.enroll);
  const { emojiPopUp, deleteMessage } = useSelector((state) => state.misc);
  const { messages } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEle] = useState();

  const [newMessages, setNewMessage] = useState([]);
  const bottomRef = useRef(null);
  const course = enrollDetails?.course;
  const dispatch = useDispatch();
  const getIntialData = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/message/getAllMessage?course=${course}`,
      { withCredentials: true }
    );

    dispatch(getAllMessages(res?.data?.messages));

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    getIntialData();
  }, [course]);

  const openEmojiPicker = () => {
    dispatch(setEmojiPopUp(true));
  };
  const openAttachments = (e) => {
    dispatch(setOpenAttachments(true));
    setAnchorEle(e.currentTarget);
  };
  const SymbolColor = {
    color: "#006A4E",
  };

  const sendMessageHandler = () => {
    const data = {
      message: message,
      course: enrollDetails?.course,
      sender: {
        userId: enrollDetails?.user._id,
        fName: enrollDetails?.firstName,
        lName: enrollDetails?.lastName,
      },
    };

    socket.emit(NEW_MESSAGE, data);
    setMessage("");
  };
  socket.on("connect", () => {
    console.log("socket Connected Successfully");
  });
  const messageListener = useCallback(
    (data) => {
      if (data?.grade == enrollDetails?.grade) {
        console.log(data);
        setNewMessage((prev) => {
          return [...prev, data];
        });
      }
    },
    [dispatch, enrollDetails?.grade]
  );
  useEffect(() => {
    socket.on(NEW_MESSAGE, messageListener);
    return () => {
      socket.off(NEW_MESSAGE, messageListener);
    };
  }, [socket, messageListener]);

  useEffect(() => {
    scrollBottom();
  }, [newMessages]);

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const emojiPickerHandler = (e) => {
    setMessage(message + e.native);
  };
  const closeEmojiPicker = () => {
    dispatch(setEmojiPopUp(false));
  };
  useEffect(() => {
    if (deleteMessage) {
      getIntialData();
      dispatch(setDeleteMessage(false));
      setNewMessage([]);
    }
  }, [deleteMessage, dispatch]);


  const allMessages = [...messages, ...newMessages];
  return (
    <div>
      <StudentPortal>
        <Box
          sx={{
            background: "rgb(255,255,255)",
            width: "100%",
            height: "100%",
          }}
        >
          <Suspense fallback={<p>Loading...</p>}>
            <Stack
              className="chat-container"
              boxSizing={"border-box"}
              height={"72vh"}
              padding={"1rem"}
              spacing={"1rem"}
              sx={{
                overflowX: "hidden",
                overflowY: "auto !important",
              }}
            >
              {allMessages?.map((message) => (
                <MessageComponent
                  key={message?._id}
                  id={message._id}
                  message={message || []}
                  user={user}
                />
              ))}
              <div ref={bottomRef} />
            </Stack>

            <Box
              width={"100%"}
              height={"10%"}
              position={"relative"}
              top={"0"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <IconButton onClick={openAttachments}>
                <AttachFile sx={{ ...SymbolColor }} />
              </IconButton>
              <IconButton onClick={openEmojiPicker}>
                <EmojiEmotions sx={{ ...SymbolColor }} />
              </IconButton>
              <TextField
                type="text"
                variant="standard"
                sx={{
                  width: "80%",
                  border: "none",
                  padding: "1rem",
                  outline: "none",
                }}
                placeholder="Enter Your Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <IconButton onClick={sendMessageHandler}>
                <Send
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    background: "#006A4E",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    rotate: "-30deg",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Box>
          </Suspense>
        </Box>
      </StudentPortal>
      <EmojiToggle
        emojiOpen={emojiPopUp}
        onClose={closeEmojiPicker}
        selectedEmoji={emojiPickerHandler}
      />
      <FileToggle anchorEl={anchorEl} />
    </div>
  );
};

export default QandA;
