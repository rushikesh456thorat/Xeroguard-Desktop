
import { FaFilePdf, FaImage } from "react-icons/fa";


const FileItem = ({ file }) => {
  
  return (
    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-300 shadow-sm flex items-center justify-center">
      {file.type === "pdf" ? (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
          { 
            <div className="flex items-center justify-center text-gray-500">
              <FaFilePdf className="text-2xl" />
            </div>
          }
          <div className="absolute bottom-1 left-1 flex items-center bg-red-600 text-white text-xs px-2 py-1 rounded">
            <FaFilePdf className="mr-1" /> PDF
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img
            src={file.url}
            alt="Image Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 left-1 flex items-center bg-gray-800 text-white text-xs px-2 py-1 rounded">
            <FaImage className="mr-1" /> Image
          </div>
        </div>
      )}
    </div>
  );
};

export default FileItem;
