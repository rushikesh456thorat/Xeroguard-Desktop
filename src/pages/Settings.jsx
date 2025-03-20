import React, { useState, useRef } from "react";
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";
import EditableField from "../components/EditableFeild";
import DropdownMenu from "../components/DropDownMenu";
import { MdOutlineCloudUpload } from "react-icons/md";
import ProfilePicCropper from "../components/ProfilePicCropper";

const Settings = () => {
  const [user, setUser] = useState({
    userName: "Rushikesh Thorat",
    profileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzT76JSjeRAVAV0x7H6CQwgzqQG4mskoWzaA&s",
    QrCode: "JX54TEX795JD",
  });

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSave = (newValue) => {
    console.log("Saved Value:", newValue);
    setUser((prevUser) => ({ ...prevUser, userName: newValue }));
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCropConfirm = (croppedData) => {
    // Update the user's profile URL with the cropped image
    const newProfileUrl = URL.createObjectURL(croppedData);
    setUser((prevUser) => ({
      ...prevUser,
      profileUrl: newProfileUrl,
    }));
    setFile(null); // Close the cropping window
  };

  const handleLabelClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <>
      <SideBar />
      <main className="flex-1 p-6 text-gray-800">
        <PageTitle pageTitle={"Settings"} userObject={user} />
        <div className="gap-5 flex flex-col mt-7">
          <div className="flex items-center gap-8">
            <div className="w-72">
              <h3 className="text-gray-800 text-xm font-semibold">Shop Name</h3>
              <p className="text-gray-600">
                This is the main profile that will be visible for everyone
              </p>
            </div>
            <EditableField
              label="Shop Name"
              value={user.userName}
              onSave={handleSave}
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="w-72">
              <h3 className="text-gray-800 text-xm font-semibold">
                Auto Delete Files
              </h3>
              <p className="text-gray-600">
                Enable to automatically delete old files
              </p>
            </div>
            <DropdownMenu />
          </div>
          <div className="flex gap-8">
            <div className="w-72">
              <h3 className="text-gray-800 text-xm font-semibold">
                Profile Picture
              </h3>
              <p className="text-gray-600">
                Upload or update your profile picture to personalize your account.
              </p>
            </div>
            <div className="flex gap-5 m-5 pl-2 w-[700px]">
              <img src={user.profileUrl} className="rounded-full w-12 h-12" alt="Profile" />
              <div className="border-2 border-gray-900 rounded-2xl border-dotted w-full h-[200px]">
                {file ? (
                  <ProfilePicCropper
                    file={file}
                    onClose={() => setFile(null)}
                    onConfirm={handleCropConfirm}
                  />
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="w-full text-center h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-gray-500"
                    onClick={handleLabelClick}
                  >
                    <span className="text-gray-800 w-full">
                      <span
                        className="text-2xl text-center w-full"
                        style={{ textAlign: "-webkit-center" }}
                      >
                        <MdOutlineCloudUpload />
                      </span>
                      <strong>Click here</strong> to upload your file or drag
                      <br />
                      <p className="text-gray-500">
                        Supported Format: SVG, PNG, JPG(10mb Each)
                      </p>
                    </span>
                  </label>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;