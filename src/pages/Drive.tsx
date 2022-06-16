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

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        // If no folderId is provided, return
        if (!folderId) {
          setError("No folder ID provided");
          return;
        }
        // Set folder info
        setFolderInfo(
          await driveFolder(auth.paramString, folderId, teamDriveId)
        );
        // setFolderInfo(
        //   await driveFolder(
        //     "1xkCNLZHEunmDYZFp4jrJHnJoiMzXts2u",
        //     "0AFSlHKw2CFJ6Uk9PVA"
        //   )
        // );
        // Clear error
        setError(null);
      } catch (err: any) {
        // console.error(err);
        // Clear existing state
        setFolderInfo(null);
        // Set error
        setError(err?.message);
      }
    };
    fetchFolder();
  }, [folderId]);

  return (
    <div className="bg-pink-700 text-white p-8 min-h-screen">
      <Link to="/">
        <h1 className="text-4xl font-bold text-center pb-6 w-full">
          DriveLight
        </h1>
      </Link>
      {error ? (
        <ErrorDiv message={error} />
      ) : !folderInfo ? (
        //Loading
        <LoadingDiv />
      ) : (
        // Show file list
        <>
          <h2 className="text-2xl font-semibold">Folder : {folderInfo.name}</h2>
          <FilesGrid
            authParamString={auth.paramString}
            files={folderInfo.files}
            setFolderInfo={setFolderInfo}
          />
        </>
      )}
    </div>
  );
};
export default Drive;
