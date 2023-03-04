import { Route, Routes, useLocation } from "react-router-dom";
import LeftPane from "./components/left-pane/LeftPane";
import AttendancePage from "./pages/dashboard/AttendancePage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-row bg-white justify-center">
      {location.pathname.includes("dashboard") && <LeftPane />}
      <Routes>
        <Route path="/dashboard" element={<AttendancePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
