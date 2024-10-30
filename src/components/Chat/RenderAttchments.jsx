import { FileOpen } from "@mui/icons-material";
import { transFormUrl } from "../../features/checkExtention";

const RenderAttchments = (prop) => {
  const { url, file } = prop;
  let content;
  if (file === "video") {
    content = <video src={url} preload width={"200"} controls></video>;
  } else if (file === "image") {
    content = (
      <img
        src={transFormUrl(url)}
        alt="Attchments"
        width={"150"}
        height={"150"}
        style={{ objectFit: "contain" }}
      />
    );
  } else if (file === "audio") {
    content = <audio src={transFormUrl(url)} controls></audio>;
  } else {
    content = <FileOpen />;
  }

  return <div>{content}</div>;
};

export default RenderAttchments;
