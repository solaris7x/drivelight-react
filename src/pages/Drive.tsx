import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FilesGrid from "../components/Drive/FilesGrid";

import driveFolder, { driveFolderInfo } from "../components/Drive/driveFolder";
import LoadingDiv from "../components/utils/LoadingDiv";
import ErrorDiv from "../components/utils/ErrorDiv";
import AuthContext from "../context/AuthContext";

const Drive = () => {
  // Get drive folder ID
  const { teamDriveId, folderId } = useParams();

  const [folderInfo, setFolderInfo] = useState<driveFolderInfo | null>(null);

  const [error, setError] = useState<string | null>(null);

  const auth = useContext(AuthContext);

  // Get auth param string
  const [authParamString, setAuthParamString] = useState<string | undefined>();

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        setAuthParamString(await auth.paramString());
        // console.log(authParamString);
        // If no paramString available
        if (!authParamString) {
          // setError("No auth param string available");
          return;
        }
        // If no folderId is provided
        if (!folderId) {
          throw new Error("No folder ID provided");
        }
        // Set folder info
        setFolderInfo(
          await driveFolder(authParamString, folderId, teamDriveId)
        );
        // Clear error
        setError(null);
      } catch (err: any) {
        // console.error(err);
        // Clear existing state
        setFolderInfo(null);
        // Set error
        setError(err?.message || "Something broke, Call Felix");
      }
    };
    fetchFolder();
  }, [folderId, authParamString]);

  return (
    <div className="bg-pink-700 text-white p-8 min-h-screen">
      <Link to="/">
        <h1 className="text-4xl font-bold text-center pb-6 w-full">
          DriveLight
        </h1>
      </Link>
      {error ? (
        <ErrorDiv message={error} />
      ) : !folderInfo || !authParamString ? (
        //Loading
        <LoadingDiv />
      ) : (
        // Show file list
        <>
          <h2
            className="text-2xl font-semibold overflow-hidden"
            style={{ wordBreak: "break-all" }}
          >
            Folder : {folderInfo.name}
          </h2>
          <FilesGrid
            authParamString={authParamString}
            files={folderInfo.files}
            setFolderInfo={setFolderInfo}
          />
        </>
      )}
    </div>
  );
};
export default Drive;
