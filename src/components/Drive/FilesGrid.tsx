import prettyBytes from "../../utils/prettyBytes";
import { driveFileType } from "../functions/driveFolder";

interface FilesGridProps {
  files: driveFileType[];
}

const FilesGrid = (props: FilesGridProps) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {props.files.map((file: driveFileType) => (
          <div key={file.id} className="col-span-1">
            <div className="bg-white text-gray-600 rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{file.name}</div>
                <div className="text-sm text-gray-600">
                  {file.size ? prettyBytes(file.size) : "NA"}
                </div>
              </div>
              <div className="text-sm font-semibold">{file.mimeType}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilesGrid;
