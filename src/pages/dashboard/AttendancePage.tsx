import { useEffect, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";

import Dropdown from "../../components/Dropdown";
import AttendanceTable from "../../components/AttendanceTable";

const headers = [
  { label: "Full Name", key: "fullName" },
  { label: "Registration Number", key: "registrationNumber" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Time", key: "time" },
];

function AttendancePage() {
  const [attendance, setAttendance] = useState<
    {
      fullName: "";
      registrationNumber: "";
      phoneNumber: "";
      time: "";
    }[]
  >([]);
  useEffect(() => {
    setAttendance(
      Array(189).fill({
        fullName: "abdullah Ahmad Gumi ",
        phoneNumber: "08135524649",
        registrationNumber: "u17cs1097",
        time: "9:30AM",
      })
    );
  }, []);
  const [selected, setSelected] = useState<{
    value: string | number;
    label: string;
  }>({ value: "", label: "" });
  return (
    <div className="flex flex-1  min-h-screen max-w-7xl p-5  ">
      <div className="bg-white shadow-2xl w-full rounded-3xl p-5">
        <div className="flex justify-between items-start w-full">
          <Dropdown
            helperText="Choose Lecture"
            label="Lecture"
            setValue={setSelected}
            items={[
              { label: "cosc401", value: "cosc401" },
              { label: "cosc403", value: "cosc403" },
            ]}
          />
          <CSVLink
            data={attendance}
            headers={headers}
            filename={"Attendance.csv"}
          >
            <div className="flex items-center justify-between border rounded-[10px] bg-[#F6F8FA] p-3 cursor-pointer hover:bg-slate-200">
              <span className="text-black font-medium text-sm  mr-2">
                Export as Excel
              </span>
              <FileDownloadIcon sx={{ color: "black" }} />
            </div>
          </CSVLink>
        </div>
        <AttendanceTable attendance={attendance} />
      </div>
    </div>
  );
}

export default AttendancePage;
