import { NavigateFunction } from "react-router-dom";
import { driveFolderInfo } from "./driveFolder";

const onFileClick = (
  authParamString: string,
  fileId: string,
  mimetype: string,
  navigate: NavigateFunction,
  parentPath: string,
  setFolderInfo: React.Dispatch<React.SetStateAction<driveFolderInfo | null>>,
  setLinkCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("File Click");
  // If file is a folder then open it
  if (mimetype === "application/vnd.google-apps.folder") {
    // Set folder info to null/loading
    setFolderInfo(null);
    // Navigate to folder
    navigate(`${parentPath}/${fileId}`);
  } else {
    // Copy link to clipboard
    // FIXME: Not working on mobile
    navigator.clipboard.writeText(
      `https://www.googleapis.com/drive/v3/files/${fileId}?${authParamString}&supportsAllDrives=true&alt=media`
    );
    // Set link copied to true with timeout 1500ms
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 1500);
  }
};

export default onFileClick;
