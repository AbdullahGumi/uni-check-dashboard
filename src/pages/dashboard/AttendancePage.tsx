import { useEffect, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";

import Dropdown from "../../components/Dropdown";
import AttendanceTable from "../../components/AttendanceTable";
import {
  getAllAdminLecturesAPI,
  getLectureAttendaceAPI,
} from "../../api/lectureApi";

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
      createdAt: "";
    }[]
  >([]);
  const [selectedLecture, setSelectedLecture] = useState<{
    value: string | number;
    label: string;
  }>({ value: "", label: "" });
  const [dropdownItems, setDropdownItems] = useState([]);

  useEffect(() => {
    getAllAdminLecturesAPI().then((res) => {
      const courses = res.map((item: any) => {
        return {
          courseCode: item.courseCode,
          lectureId: item.lectureId,
        };
      });
      const objArr = courses.map(
        ({
          courseCode,
          lectureId,
        }: {
          courseCode: string;
          lectureId: string;
        }) => {
          return {
            label: courseCode.toUpperCase(),
            value: lectureId,
          };
        }
      );
      setDropdownItems(objArr);
    });
  }, []);

  const handleDropdownChange = (selectedOption: any) => {
    setSelectedLecture({
      label: selectedOption.label,
      value: selectedOption.value,
    });
    getLectureAttendaceAPI(selectedOption.value as string)
      .then((res) => {
        setAttendance(res);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div className="flex flex-1  min-h-screen max-w-7xl p-5  ">
      <div className="bg-white shadow-2xl w-full rounded-3xl p-5">
        <div className="flex justify-between items-start w-full">
          <Dropdown
            helperText="Choose Lecture"
            label="Lecture"
            onChange={handleDropdownChange}
            items={dropdownItems}
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
