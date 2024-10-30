import { Box, IconButton, Typography } from "@mui/material";
import RenderAttchments from "./RenderAttchments";
import moment from "moment";
import { checkExtention } from "../../features/checkExtention";
import "./Message.css";
import { memo } from "react";
import { Delete } from "@mui/icons-material";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useDispatch } from "react-redux";
import { setDeleteMessage } from "../../redux/reducers/misc";
const MessageComponent = (prop) => {
  const [, putPostMethod] = usePostUpdate();
  const { sender, message, attachments, createdAt, _id } = prop.message;
  const { user } = prop;
  const dispatch = useDispatch();
  // const spring = useSpring({
  //   from: {
  //     y: "-100%",
  //     opacity: "0",
  //   },
  //   to: {
  //     y: "0%",
  //     opacity: "1",
  //   },
  // });
  const deleteMessageHandler = async () => {
    prop.deleteMsg(_id);
    // const stringId = String(_id);
    const data = {
      method: "DELETE",
      url: `api/v1/message/delete/${_id}`,
      message: "Delete Message Successfully",
    };
    const res = await putPostMethod(data);
    if (res?.status === 200) {
      dispatch(setDeleteMessage(true));
      console.log("deleteData Succssfully");
    }
  };
  return (
    <div className={sender?.userId === user?._id ? "sender" : "reciver"}>
      {/* //   <animated.div */}
      {/* //     style={{
    //     //   ...spring,
    //     }}
    //     
    //   > */}

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
      {/* <Typography
        variant="p"
        sx={{
          width: "fit-content",
          display: "block",
          alignSelf: sender?.userId === user?._id ? "flex-end" : "flex-start",
        }}
      >
        {grade}th
      </Typography> */}
      <Typography
        variant="caption"
        color={"text.primary"}
        style={{
          alignSelf: "flex-end",
          display: "flex",
          // gap: "5px",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        {moment(createdAt).fromNow(true)}

        {sender?.userId === user?._id && (
          <IconButton
            onClick={() => {
              deleteMessageHandler();
            }}
          >
            <Delete
              sx={{
                cursor: "pointer",
              }}
            />
          </IconButton>
        )}
      </Typography>
      {/* //   </animated.div> */}
    </div>
  );
};

export default memo(MessageComponent);
