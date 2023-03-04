import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";

function LecturePage() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const navigate = useNavigate();

  const [selected, setSelected] = useState<{
    value: string | number;
    label: string;
  }>({ value: "", label: "" });

  return (
    <div className="flex flex-1  min-h-screen max-w-7xl p-5  ">
      <div className="bg-white shadow-2xl w-full rounded-3xl p-5">
        <div className="flex flex-col mb-auto mt-20 h-full items-center w-fit mx-auto">
          <span className="text-black text-center text-2xl font-bold">
            Create Attendance QR Code
          </span>
          <Input
            className="w-full mt-5"
            label="Course Name"
            type="text"
            value={courseName}
            setValue={setCourseName}
          />
          <Input
            className="w-full mt-5"
            label="Course Code"
            type="text"
            value={courseCode}
            setValue={setCourseCode}
          />
          <Dropdown
            className="w-full mt-5"
            helperText="Specifies the duration for which the QR code remains scannable."
            label="Validity Period"
            setValue={setSelected}
            items={[
              { label: "1 hour", value: 1 },
              { label: "2 hours", value: 2 },
              { label: "3 hours", value: 3 },
              { label: "4 hours", value: 4 },
              { label: "5 hours", value: 5 },
              { label: "6 hours", value: 6 },
            ]}
          />
          <Button
            onClick={() => navigate("/dashboard/lecture/generate-qr")}
            style={{ marginTop: "2rem" }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LecturePage;
