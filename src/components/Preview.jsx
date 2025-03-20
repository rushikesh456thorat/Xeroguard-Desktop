import React, { useState, useEffect } from 'react';
import printJS from 'print-js';
import { FiX, FiPrinter, FiMaximize, FiMinimize } from 'react-icons/fi';

const Preview = ({ fileUrl, fileType, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fileUrl]);

  const handlePrint = () => {
    if (fileType === 'pdf') {
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          printJS(URL.createObjectURL(blob), 'pdf');
        })
        .catch((error) => {
          console.error('Error fetching or printing PDF:', error);
        });
    } else if (fileType === 'image') {
      try {
        printJS(fileUrl, 'image');
      } catch (error) {
        console.error('Error printing image:', error);
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`fixed inset-0 text-gray-800 bg-transperant backdrop-blur-[4px] flex items-center justify-center z-50 p-4 ${
        isFullscreen ? '' : 'md:p-8'
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl border border-gray-800 overflow-hidden flex flex-col relative ${
          isFullscreen ? 'w-full h-full' : 'w-full h-full md:w-[900px] md:h-[680px]'
        }`}
      >
        {/* Header */}
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <h3 className="font-medium truncate">{fileUrl.split('/').pop()}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-200 rounded-full"
              title="Print"
            >
              <FiPrinter className="text-gray-700" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-200 rounded-full"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <FiMinimize className="text-gray-700" />
              ) : (
                <FiMaximize className="text-gray-700" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full"
              title="Close"
            >
              <FiX className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto bg-gray-50 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading preview...</p>
            </div>
          ) : fileType === 'pdf' ? (
            <iframe
              src={`${fileUrl}#toolbar=0`}
              width="100%"
              height="100%"
              className="flex-grow"
            >
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-500 mb-4">
                  Unable to display PDF. Browser might not support PDF viewing.
                </p>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Download PDF
                </a>
              </div>
            </iframe>
          ) : fileType === 'image' ? (
            <img
              src={fileUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center p-6">
              <p>Unsupported file type</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;