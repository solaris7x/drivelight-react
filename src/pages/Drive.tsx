import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilesGrid from "../components/Drive/FilesGrid";

import driveFolder, { driveFolderInfo } from "../components/Drive/driveFolder";
import LoadingDiv from "../components/utils/LoadingDiv";
import ErrorDiv from "../components/utils/ErrorDiv";

import { OAuthTokenObject } from "./Oauth";

interface DriveProps {
  oauthToken: OAuthTokenObject | undefined;
  setOauthToken: React.Dispatch<
    React.SetStateAction<OAuthTokenObject | undefined>
  >;
}

const Drive = (props: DriveProps) => {
  // Get drive folder ID
  const { teamDriveId, folderId } = useParams();

  const [folderInfo, setFolderInfo] = useState<driveFolderInfo | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        // If no folderId is provided, return
        if (!folderId) {
          setError("No folder ID provided");
          return;
        }
        // Set folder info
        setFolderInfo(await driveFolder(folderId, teamDriveId));
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
      <h1 className="text-4xl font-bold text-center pb-6 w-full">DriveLight</h1>
      {error ? (
        <ErrorDiv message={error} />
      ) : !folderInfo ? (
        //Loading
        <LoadingDiv />
      ) : (
        // Show file list
        <>
          <h2 className="text-2xl font-semibold">Folder : {folderInfo.name}</h2>
          <FilesGrid files={folderInfo.files} setFolderInfo={setFolderInfo} />
        </>
      )}
    </div>
  );
};
export default Drive;
