import { IconButton, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AudioFile, Image, UploadFile, VideoFile } from "@mui/icons-material";
import { useRef } from "react";

import { usePostUpdate } from "../hooks/usePostUpdate.js";
import { setOpenAttachments } from "../redux/reducers/misc.js";
import { toast } from "react-toastify";

const FileToggle = (prop) => {
  const [, putPostMethod] = usePostUpdate();
  const dispatch = useDispatch();
  const { openAttachments } = useSelector((state) => state.misc);
  const { enrollDetails } = useSelector((state) => state.enroll);
  const imageRef = useRef();
  const videoRef = useRef();
  const audioRef = useRef();
  const otherFileRef = useRef();
  const fileCloseHandler = () => {
    dispatch(setOpenAttachments(false));
  };
  console.log(enrollDetails);
  const openImageMenu = () => {
    imageRef.current.click();
  };
  const openAudioMenu = () => {
    audioRef.current.click();
  };
  const openVideoMenu = () => {
    videoRef.current.click();
  };
  const otherFileMenu = () => {
    otherFileRef.current.click();
  };
  const sendFileAttchments = async (e, key) => {
    const files = Array.from(e.target.files);

    if (!files && files.length === 0) {
      toast.error(`Please Insert ${key}`);
    }
    if (files.length > 5) {
      toast.error("You Can't Send File more than 5");
    }
    const toastId = toast.loading(`${key} is Sending....`);
    const formData = new FormData();
    const senderData = {
      userId: enrollDetails?.user?._id,
      fName: enrollDetails?.fName,
      lName: enrollDetails?.lName,
    };
    console.log(senderData);
    formData.append("userId", enrollDetails?.user?._id);
    formData.append("fName", enrollDetails?.firstName);
    formData.append("lName", enrollDetails?.lastName);
    formData.append("course", enrollDetails?.course);
    files.forEach((file) => formData.append("files", file));

    dispatch(setOpenAttachments(false));
    const data = {
      method: "POST",
      url: `api/v1/message/attachments`,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await putPostMethod(data);
    toast.dismiss({ id: toastId });
    if (res.status === 200) {
      toast.success(`${key} Send Successfully`, { id: toastId });
      dispatch(setOpenAttachments(false));
    } else {
      toast.dismiss({ id: toastId });
    }
  };
  return (
    <>
      <Menu
        anchorEl={prop.anchorEl}
        open={openAttachments}
        onClose={fileCloseHandler}
      >
        <MenuList>
          <MenuItem>
            <Tooltip title="Select Images">
              <IconButton onClick={openImageMenu}>
                <Image sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  ref={imageRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "Images");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Select Audio">
              <IconButton onClick={openAudioMenu}>
                <AudioFile sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="audio/mpeg,audio/ogg"
                  style={{ display: "none" }}
                  ref={audioRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "Audio");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Select Video">
              <IconButton onClick={openVideoMenu}>
                <VideoFile sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="video/ogg,video/mp4,video/webm"
                  style={{ display: "none" }}
                  ref={videoRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "Video");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Select Other Files">
              <IconButton onClick={otherFileMenu}>
                <UploadFile sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="*"
                  style={{ display: "none" }}
                  ref={otherFileRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "File");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default FileToggle;
