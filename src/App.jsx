import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import ShowQrCode from "./pages/ShowQrCode";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <div className="flex bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/qr" element={<ShowQrCode />} />
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
