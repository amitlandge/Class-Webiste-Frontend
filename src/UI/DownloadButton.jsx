import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useGetData } from "../hooks/useGetData";

const DownloadButton = (prop) => {
  const fileUrls = [];
  const [data] = useGetData(`api/v1/course/assignment/${prop.id}`);

  console.log(data);
  data?.assignment?.attachments?.map((urls) => {
    fileUrls.push(urls?.url);
  });

  const handleDownload = async () => {
    console.log(prop.id);
    try {
      for (const url of fileUrls) {
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = downloadUrl;

        // Extract file name from URL (or use default)
        const fileName = url.split("/").pop().split("?")[0];
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl); // Free up memory
      }
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  return (
    <Button color="primary" onClick={handleDownload}>
      <Download />
    </Button>
  );
};

export default DownloadButton;
