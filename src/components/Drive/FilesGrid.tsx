import { useNavigate } from "react-router-dom";
import { driveFileType, driveFolderInfo } from "./driveFolder";
import FileItem from "./FileItem";

interface FilesGridProps {
  files: driveFileType[];
  setFolderInfo: React.Dispatch<React.SetStateAction<driveFolderInfo | null>>;
}

const FilesGrid = (props: FilesGridProps) => {
  const navigate = useNavigate();
  return (
    <div className="mt-6 md:mx-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {props.files.map((file: driveFileType) => (
          <div key={file.id} className="col-span-1 relative">
            <FileItem
              {...file}
              navigate={navigate}
              setFolderInfo={props.setFolderInfo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilesGrid;
