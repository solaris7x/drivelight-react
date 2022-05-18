interface driveListFolderOptions {
  pageSize?: number | string;
  teamDriveId?: string;
}

const driveListFolder = async (
  query: string,
  options?: driveListFolderOptions
) => {
  // Request Params
  const paramsString = options?.teamDriveId
    ? new URLSearchParams({
        pageSize: options?.pageSize?.toString() || "20",
        orderBy: "name",
        fields: "nextPageToken, files(id, name, mimeType, size)",
        q: query,
        corpora: "drive",
        driveId: options.teamDriveId,
        includeItemsFromAllDrives: "true",
        supportsAllDrives: "true",
      }).toString()
    : new URLSearchParams({
        pageSize: options?.pageSize?.toString() || "20",
        orderBy: "name",
        fields: "nextPageToken, files(id, name, mimeType, size)",
        q: query,
      }).toString();

  // Convert Params to Query String
  const requestURI = `https://www.googleapis.com/drive/v3/files?key=${
    import.meta.env.VITE_GAPIKEY
  }&${paramsString}`;
  // console.log(requestURI)

  // Fetch Drive file details
  const driveFileRes = await fetch(requestURI, {
    headers: {
      Referer: import.meta.env.VITE_GAPIREFERER,
    },
  });

  return driveFileRes;
};

export default driveListFolder;
