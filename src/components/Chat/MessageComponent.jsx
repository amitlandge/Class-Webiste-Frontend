import { Box, Typography } from "@mui/material";
import RenderAttchments from "./RenderAttchments";
import moment from "moment";
import { checkExtention } from "../../features/checkExtention";
import "./Message.css";
import { memo } from "react";

const MessageComponent = (prop) => {
  const { sender, message, attachments, createdAt } = prop.message;
  const { user } = prop;

  return (
    <div className={sender?.userId === user?._id ? "sender" : "reciver"}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            attachments?.length > 1
              ? "repeat(2, minmax(150px, 1fr))"
              : "repeat(minmax(150px, 1fr))",
          gridGap: "1rem",
        }}
      >
        {attachments &&
          attachments.map((item, index) => {
            const url = item.url;
            const file = checkExtention(url);
            return (
              <Box key={index}>
                <a target="_blank" href={url} download={true}>
                  <RenderAttchments url={url} file={file} />
                </a>
              </Box>
            );
          })}
      </Box>

      <Typography
        variant="caption"
        style={{
          alignSelf: sender?.userId === user?._id ? "flex-end" : "flex-start",
          display: "block",
        }}
      >
        {sender?.userId === user?._id ? "You" : sender?.fName}
      </Typography>
      <Typography
        variant="p"
        sx={{
          width: "fit-content",
          display: "block",
          alignSelf: sender?.userId === user?._id ? "flex-end" : "flex-start",
        }}
      >
        {message}
      </Typography>

      <Typography
        variant="caption"
        color={"text.primary"}
        style={{
          alignSelf: "flex-end",
          display: "flex",

          alignItems: "center",
          marginTop: "5px",
        }}
      >
        {moment(createdAt).fromNow(true)}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
