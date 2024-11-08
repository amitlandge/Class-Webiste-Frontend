import { Box, IconButton, Stack, TextField } from "@mui/material";
import StudentPortal from "./StudentPortal";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageComponent from "../../components/Chat/MessageComponent";
import { AttachFile, EmojiEmotions, Send } from "@mui/icons-material";

import { getSocket } from "../../context/getSocket.js";
import { NEW_MESSAGE } from "../../eventConstant.js";
import { useDispatch, useSelector } from "react-redux";
import "./scrollStyle.css";
import axios from "axios";

import {
  setEmojiPopUp,
  setOpenAttachments,
} from "../../redux/reducers/misc.js";
import EmojiToggle from "../../toggle/EmojiToggle.jsx";
import FileToggle from "../../toggle/FileToggle.jsx";

import { useInfiniteScrollTop } from "6pp";
const QandA = () => {
  const socket = getSocket();

  const [message, setMessage] = useState("");
  const [oldMessage, setOldMessage] = useState({
    messages: [],
    totalPages: 1,
  });
  const { enrollDetails } = useSelector((state) => state.enroll);
  const { emojiPopUp } = useSelector((state) => state.misc);

  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEle] = useState();
  const [page, setPage] = useState(1);
  const [newMessages, setNewMessage] = useState([]);
  const messageEndRef = useRef(null);
  const chatRef = useRef(null);
  const course = enrollDetails?.course;
  const dispatch = useDispatch();

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
      if (data?.course === enrollDetails?.course) {
        console.log(data);
        setNewMessage((prev) => {
          return [...prev, data];
        });
      }
    },
    [dispatch, enrollDetails?.course]
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
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const emojiPickerHandler = (e) => {
    setMessage(message + e.native);
  };
  const closeEmojiPicker = () => {
    dispatch(setEmojiPopUp(false));
  };

  useEffect(() => {
    loadMoreMessages();
  }, [page]);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    chatRef,
    oldMessage?.totalPages,
    page,
    setPage,
    oldMessage?.messages
  );

  useEffect(() => {
    return () => {
      setMessage("");
      setOldMessages([]);
      setNewMessage([]);
    };
  }, []);
  const loadMoreMessages = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/message/getAllMessage`,
      {
        params: {
          course: course,
          page: page,
        },
        withCredentials: true,
      }
    );

    const msg = res?.data;
    setOldMessage(msg);
  };

  const allMessages = [...oldMessages, ...newMessages];

  return (
    <div>
      <StudentPortal>
        <Box
          sx={{
            background: "rgb(255,255,255)",
            width: "100%",
            
          }}
        >
          <Stack
            ref={chatRef}
            className="hide-scrollbar"
            style={{
              height: "90vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1rem",
            }}
          >
            {allMessages.map((message) => (
              <MessageComponent
                key={message?._id}
                id={message._id}
                message={message || []}
                user={user}
              />
            ))}

            <div ref={messageEndRef} />
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
        </Box>
      </StudentPortal>
      <EmojiToggle
        emojiOpen={emojiPopUp}
        onClose={closeEmojiPicker}
        selectedEmoji={emojiPickerHandler}
      />
      {anchorEl && <FileToggle anchorEl={anchorEl} />}
    </div>
  );
};

export default QandA;
