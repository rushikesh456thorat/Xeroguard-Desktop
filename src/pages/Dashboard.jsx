import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilePdf, FaImage } from "react-icons/fa";
import FileItem from "../components/FileItem";
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [expandedUser, setExpandedUser] = useState(null); // Track expanded user

  const user = {
    userName: "Rushikesh Thorat",
    profileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzT76JSjeRAVAV0x7H6CQwgzqQG4mskoWzaA&s",
  };

  const filesByUser = [
    {
      userName: "John",
      files: [
        {
          name: "Report.pdf",
          type: "pdf",
          copies: 2,
          url: "https://archive.nptel.ac.in/assets/ia_assets/pdf/Guidelines%20on%20enrolling%20to%20NPTEL%20Online%20Certification%20Courses.pdf",
        },
        {
          name: "Design.png",
          type: "image",
          copies: 3,
          url: "https://nimbusweb.me/wp-content/uploads/2023/05/Contractor-Agreement-791x1024.png",
        },
      ],
    },
    {
      userName: "Priya",
      files: [
        {
          name: "Invoice.pdf",
          type: "pdf",
          copies: 4,
          url: "https://archive.nptel.ac.in/assets/ia_assets/pdf/Guidelines%20on%20enrolling%20to%20NPTEL%20Online%20Certification%20Courses.pdf",
        },
      ],
    },
  ];

  const filteredUsers = filesByUser
    .map((user) => ({
      ...user,
      files: user.files.filter(
        (file) =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((user) => user.files.length > 0);

  const toggleUserDropdown = (userName) => {
    setExpandedUser(expandedUser === userName ? null : userName);
  };

  return (
    <>
      <SideBar />

      <main className="flex-1 p-6">
        <PageTitle userObject={user} pageTitle={"Dashboard"} />
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search files or users..."
            className="w-full p-3 rounded-lg text-gray-700 bg-white shadow-md border focus:ring focus:ring-blue-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-4">
          {filteredUsers.map((user, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg">
              <button
                onClick={() => toggleUserDropdown(user.userName)}
                className="w-full flex justify-between items-center p-4 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <h2 className="text-lg font-semibold">{user.userName}</h2>
                {expandedUser === user.userName ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>
              {expandedUser === user.userName && (
                <div className="p-4 border-t">
                  <div className="space-y-4">
                    {user.files.map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        className="flex items-start gap-4 p-3 border rounded-lg hover:shadow-lg transition-all"
                      >
                        <FileItem file={file} />
                        <div className="flex-1 justify-between">
                          <p className="text-gray-700 font-medium">
                            {file.name}
                          </p>
                          <div className="mt-2">
                            <span className="text-gray-600">Copies: </span>
                            <span className="text-gray-600">{file.copies}</span>
                          </div>
                          <div className="mt-2 flex gap-3">
                            <button className="text-blue-600 hover:text-blue-500 cursor-pointer">
                              Preview
                            </button>
                            <button className="text-gray-600 hover:text-gray-500 cursor-pointer">
                              Print
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
