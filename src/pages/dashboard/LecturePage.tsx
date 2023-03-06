import { useRef, useState, useEffect } from "react";
import { createLectureAPI } from "../../api/lectureApi";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";

function LecturePage() {
  const [lectureId, setLectureId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [validityPeriod, setvalidityPeriod] = useState("");

  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const [selectedHours, setSelectedHours] = useState<{
    value: string | number;
    label: string;
  }>({ value: 0, label: "" });

  const createLecture = () => {
    setLoading(true);
    createLectureAPI({
      courseName,
      courseCode,
      validityPeriod,
    })
      .then((res) => {
        setLectureId(res.lectureId);
        setLoading(false);
        setShowQRCode(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const date = new Date();
    const hoursToAdd = selectedHours.value;
    date.setHours(date.getHours() + Number(hoursToAdd));
    setvalidityPeriod(date.toISOString());
  }, [selectedHours.value]);

  return (
    <div className="flex flex-1  min-h-screen max-w-7xl p-5  ">
      <div className="bg-white shadow-2xl w-full rounded-3xl p-5">
        {showQRCode ? (
          <div className="flex flex-col mb-auto mt-20 h-full items-center w-full mx-auto">
            <div
              ref={componentRef}
              className="w-full max-w-[300px] flex flex-col items-center"
              id="qr"
            >
              <QRCode
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify({ lectureId })}
              />
              <p
                id="qrText"
                className="text-black text-sm font-semibold text-center mt-20"
              >
                Course Name: {courseName} <br />({courseCode})
              </p>
              <p
                id="qrText"
                className="text-black text-sm font-semibold text-center mt-3"
              >
                Scan time: {selectedHours.label}
              </p>
            </div>
            <Button
              onClick={handlePrint}
              style={{ marginTop: 20, width: "300px" }}
            >
              Print
            </Button>
          </div>
        ) : (
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
              setValue={setSelectedHours}
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
              disabled={loading}
              isLoading={loading}
              onClick={createLecture}
              style={{ marginTop: "2rem" }}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LecturePage;
