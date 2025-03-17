import React, { useState } from "react";
import SideBar from "../components/SideBar";
import QRCode from "react-qr-code";
import { FiCopy, FiCheck } from "react-icons/fi";

const ShowQrCode = () => {
    const [copied, setCopied] = useState(false);
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

  return (
    <>
      <SideBar />

      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="flex flex-col  p-5 w-[400px] h-[480px] justify-between content-center items-center">
          <h1
            className="text-2xl font-semibold text-center text-gray-600"
            unselectable
          >
            Scan QR code
          </h1>
          <p className="text-gray-600 text-center">
            Scan this QR code in-app to send Documents
          </p>

          <div className="p-5 border-[2px] border-gray-300 rounded-2xl">
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
            <div className=" border-[2px] w-full border-gray-300 pl-5 pt-2 pr-2 pb-2 rounded-xl">
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
        </div>
      </main>
    </>
  );
};

export default ShowQrCode;
