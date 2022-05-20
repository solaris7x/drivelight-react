import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import prettyBytes from "../../utils/prettyBytes";
import { driveFolderInfo } from "./driveFolder";
import onFileClick from "../functions/onFileClick";

interface FileItemProps {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
  navigate: NavigateFunction;
  setFolderInfo: React.Dispatch<React.SetStateAction<driveFolderInfo | null>>;
}

const FileItem = (props: FileItemProps) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const isFolder = props.mimeType == "application/vnd.google-apps.folder";

  return (
    <>
      <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 hover:bg-[#e1cc98] rounded-lg z-10">
        {
          // // If Folder
          // isFolder && (
          //   <button
          //     className="bg-cyan-400 w-full text-black text-center font-semibold p-1 rounded-t-lg"
          //     onClick={() => {
          //       // Set folder info to null/loading
          //       props.setFolderInfo(null);
          //       // Navigate to folder
          //       props.navigate(`../${props.id}`);
          //     }}
          //   >
          //     Go to Folder
          //   </button>
          // )
        }
        <button
          className="bg-white text-gray-600 shadow-lg p-4 w-full rounded-lg "
          // (isFolder && "rounded-t-none")

          onClick={() => {
            onFileClick(
              props.id,
              props.mimeType,
              props.navigate,
              props.setFolderInfo,
              setLinkCopied
            );
          }}
        >
          <div className="flex justify-between items-center">
            <div className="md:text-2xl font-bold">{props.name}</div>
            <div className="text-sm text-gray-600">
              {props.size ? prettyBytes(props.size) : "NA"}
            </div>
          </div>
          <div className="text-sm font-semibold">{props.mimeType}</div>
        </button>
      </div>
      {linkCopied && (
        <div className="absolute text-black text-center font-semibold p-2 rounded-lg bg-emerald-500 w-[80%] -bottom-8 z-20 left-0 right-0 mx-auto ">
          🌈 🙀 Direct Link Copied 🙀 🌈
        </div>
      )}
    </>
  );
};
export default FileItem;
