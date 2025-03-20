import React, { useState, useRef } from "react";
import SideBar from "../components/SideBar";
import QRCode from "react-qr-code";
import { FiCopy, FiCheck, FiShare2, FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas"; // For converting QR code to image

const ShowQrCode = () => {
  const [copied, setCopied] = useState(false);
  const qrCodeRef = useRef(null); // Ref for the QR code container

  const user = {
    userName: "Rushikesh Thorat",
    profileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzT76JSjeRAVAV0x7H6CQwgzqQG4mskoWzaA&s",
    QrCode: "JX54TEX795JD",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.QrCode);
      setCopied(true);

      // Restore the original icon after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  const handleShare = async () => {
    try {
      // Extract the SVG from the QR code container
      const svgData = new XMLSerializer().serializeToString(
        qrCodeRef.current.querySelector("svg")
      );
      
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Set canvas size with padding
      canvas.width = 250;
      canvas.height = 250;
      
      // Fill with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create an image from the SVG
      const img = new Image();
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      
      // Wait for the image to load and be drawn
      await new Promise((resolve) => {
        img.onload = () => {
          // Draw the image centered on the canvas with padding
          ctx.drawImage(img, 25, 25, 200, 200);
          resolve();
        };
        img.src = url;
      });
      
      // Get the image data from canvas
      const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const files = [new File([imageBlob], "qr-code.png", { type: "image/png" })];
      
      // Create a message with the user's name and code
      const message = `Scan this QR code to send documents.\n\nUser: ${user.userName}\nCode: ${user.QrCode}`;
      if (navigator.canShare({ files })) {
        try {
          await navigator.share({
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
            title: "Images",
            text: message,
          });
          alert("Shared!");
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      } else {
        alert(`Your system doesn't support sharing these files.`);
      }
      
    } catch (error) {
      console.error("Error sharing:", error);
     
    }
  };
  const handleDownload = async () => {
    try {
      // Create a temporary SVG element with the QR code
      const svgData = new XMLSerializer().serializeToString(
        qrCodeRef.current.querySelector("svg")
      );
      
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Set canvas size
      canvas.width = 250; // Add padding around the QR code
      canvas.height = 250;
      
      // Fill with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create an image from the SVG
      const img = new Image();
      
      // Create a blob from the SVG data
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      
      // When the image loads, draw it on the canvas and create a download link
      img.onload = () => {
        // Draw the image centered on the canvas with padding
        ctx.drawImage(img, 25, 25, 200, 200);
        
        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL("image/png");
        
        // Create a download link
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "qr-code.png";
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
      };
      
      // Set the source of the image to the SVG blob URL
      img.src = url;
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  return (
    <>
      <SideBar />

      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="flex flex-col p-5 w-[400px] h-[520px] justify-between content-center items-center">
          <h1 className="text-2xl font-semibold text-center text-gray-600" unselectable>
            Scan QR code
          </h1>
          <p className="text-gray-600 text-center">
            Scan this QR code in-app to send Documents
          </p>

          {/* QR Code Container */}
          <div ref={qrCodeRef} className="p-5 border-[2px] border-gray-300 rounded-2xl bg-white">
            <QRCode value={user.QrCode} size={200} />
          </div>

          <div className="flex items-center w-full text-gray-600 text-sm">
            <div className="mt-[5px] flex-grow h-[1px] bg-gray-400"></div>
            <span className="px-2 whitespace-nowrap text-center">
              or enter the code manually
            </span>
            <div className="mt-[5px] flex-grow h-[1px] bg-gray-400"></div>
          </div>

          <div className="flex w-full justify-center gap-[10px]">
            <div className="border-[2px] w-full border-gray-300 pl-5 pt-2 pr-2 pb-2 rounded-xl">
              <label title={user.QrCode} className="text-gray-600">
                {user.QrCode}
              </label>
            </div>
            <div
              className="flex border-[2px] items-center text-gray-600 justify-center border-gray-300 pl-3 pr-3 p-2 rounded-xl cursor-pointer"
              onClick={handleCopy}
            >
              {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
            </div>
          </div>

          {/* Share and Download Buttons */}
          <div className="flex w-full justify-center gap-[10px] mt-4">
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 border-[2px] border-gray-300 text-gray-600 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <FiShare2 />
              <span>Share</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 border-[2px] border-gray-300 text-gray-600 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <FiDownload />
              <span>Download</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ShowQrCode;