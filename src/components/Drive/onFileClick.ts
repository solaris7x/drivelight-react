import { NavigateFunction } from "react-router-dom";
import { driveFolderInfo } from "./driveFolder";

const onFileClick = async (
  authParamString: string,
  fileId: string,
  mimetype: string,
  navigate: NavigateFunction,
  parentPath: string,
  setFolderInfo: React.Dispatch<React.SetStateAction<driveFolderInfo | null>>,
  setLinkCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // console.log("File Click");
  // If file is a folder then open it
  if (mimetype === "application/vnd.google-apps.folder") {
    // Set folder info to null/loading
    setFolderInfo(null);
    // Navigate to folder
    navigate(`${parentPath}/${fileId}`);
  } else {
    // Google API url with token
    let clipboardUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?${authParamString}&supportsAllDrives=true&alt=media`;
    // Try Drive Web client endpoint
    try {
      const webRes = await fetch(
        `https://voodoo.drivelight.ml/file?fileID=${fileId}`
      );

      // If successful then get link
      if (webRes.ok) {
        const voodooRes = await webRes.json();
        if (voodooRes?.downloadUrl) clipboardUrl = voodooRes.downloadUrl;
      }
    } catch (error) {
      console.log(error);
    }
    // Copy link to clipboard
    navigator.clipboard.writeText(clipboardUrl);
    // Set link copied to true with timeout 1500ms
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 1500);
  }
};

export default onFileClick;
