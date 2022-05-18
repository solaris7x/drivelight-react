import { hasAllProperties } from "../../utils/hasAllProperties";
import { isArrayOf } from "../../utils/isArrayOf";
import driveListFolder from "./driveListFolder";

export interface driveFileType {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
}

export interface driveFolderInfo {
  name: string;
  files: driveFileType[];
}

const driveFolder = async (
  folderId: string,
  teamDriveId?: string
): Promise<driveFolderInfo> => {
  try {
    // folderId = "1FyDCCp8Ebbq62br1-IY_tIfzF6PvvMB5";
    // folderId = "1u7h3n-lTA6HVLhT6uNR3M_fTdgbni00s";
    // console.log(folderId);

    // Check if folderId is valid and type is folder
    // https://www.googleapis.com/drive/v3/files/
    const paramsString = teamDriveId
      ? new URLSearchParams({
          fields: "id, name, mimeType, size",
          corpora: "drive",
          driveId: teamDriveId,
          includeItemsFromAllDrives: "true",
          supportsAllDrives: "true",
        }).toString()
      : new URLSearchParams({
          fields: "id, name, mimeType, size",
        }).toString();
    const driveFolder = await fetch(
      `https://www.googleapis.com/drive/v3/files/${folderId}?key=${
        import.meta.env.VITE_GAPIKEY
      }&${paramsString}`,
      {
        headers: {
          Referer: import.meta.env.VITE_GAPIREFERER,
        },
      }
    );
    const driveFolderJSON = (await driveFolder.json()) as any;

    if (
      !hasAllProperties<driveFileType>(driveFolderJSON, [
        "id",
        "name",
        "mimeType",
      ])
    ) {
      throw new Error(
        `Invalid metadata ${folderId} - ${
          driveFolderJSON?.error?.message || JSON.stringify(driveFolderJSON)
        }`
      );
    }
    if (driveFolderJSON.mimeType !== "application/vnd.google-apps.folder") {
      throw new Error(`Not a Folder ${folderId} - ${driveFolderJSON.mimeType}`);
    }
    // console.log(driveFileJSON);

    // Get folder content
    const driveFolderRes = await driveListFolder(
      `'${driveFolderJSON.id}' in parents and trashed = false`,
      {
        teamDriveId,
      }
    );

    // Log error if not 200
    if (!driveFolderRes.ok) {
      console.error(driveFolderRes);
      throw new Error(`Failed to fetch folder ${folderId}`);
    }

    // Parse response
    const folderContent = ((await driveFolderRes.json()) as any)
      ?.files as unknown; // as driveFileType[]

    // // Check if array and all properties are present
    if (!isArrayOf<driveFileType>(folderContent, ["id", "name", "mimeType"])) {
      throw new Error("Failed to fetch folder content");
    }

    // console.log(folderContent);
    return { name: driveFolderJSON.name, files: folderContent };
  } catch (err) {
    //   console.error(err);
    throw err;
  }
};
export default driveFolder;
