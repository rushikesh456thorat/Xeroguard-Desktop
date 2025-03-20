import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { getCroppedImg } from "../utils/getCroppedImg.js"; // Utility function to crop the image

const ProfilePicCropper = ({ file, onClose, onConfirm }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    try {
      // Generate the cropped image
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );
      // Pass the cropped image to the parent component
      onConfirm(croppedImage);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-60  backdrop-blur-[2px] z-50">
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-[400px] flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-200"
        >
          <IoCloseSharp size={26} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Your Profile Picture</h2>

        {/* Cropper */}
        <div className="relative w-[300px] h-[300px] bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <Cropper
            image={URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1}
            showGrid={false}
            zoomSpeed={0.5}
            minZoom={1}
            maxZoom={3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        {/* Zoom Slider */}
        <div className="w-full mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors duration-200"
        >
          <FaCheck size={20} />
          <span className="font-medium">Confirm Crop</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePicCropper;