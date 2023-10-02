import { useRef, useState, useEffect } from "react";
import { createLectureAPI } from "../../api/lectureApi";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";

function LecturePage() {
  const [lectureId, setLectureId] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("");

  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const [selectedMinutes, setSelectedMinutes] = useState<{
    value: string | number;
    label: string;
  }>({ value: 0, label: "" });
  const [courseCode, setSelectedCourseCode] = useState<{
    value: string | number;
    label: string;
  }>({ value: 0, label: "" });

  const createLecture = () => {
    setLoading(true);
    createLectureAPI({
      courseName: String(courseCode.value).split(":")[1].trim(),
      courseCode: String(courseCode.value).split(":")[0].trim(),
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
    const minutesToAdd = selectedMinutes.value;
    date.setMinutes(date.getMinutes() + Number(minutesToAdd));
    setValidityPeriod(date.toISOString());
  }, [selectedMinutes.value]);

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
                className="text-black text-sm font-semibold text-center mt-20  "
              >
                Course Name: {String(courseCode.value).split(":")[1].trim()}{" "}
                <br />({String(courseCode.value).split(":")[0].trim()})
              </p>
              <p
                id="qrText"
                className="text-black text-sm font-semibold text-center mt-3"
              >
                Scan time: {selectedMinutes.label}
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

            <Dropdown
              className="w-full mt-5"
              helperText=""
              label="Course Code"
              onChange={(selectedOption: any) => {
                setSelectedCourseCode({
                  label: selectedOption.label,
                  value: selectedOption.value,
                });
              }}
              items={[
                {
                  label: "COSC 401",
                  value: "COSC 401:Algorithms and Complexity Analysis",
                },
                { label: "COSC 411", value: "COSC 411:Operating Systems" },
                {
                  label: "COSC 409",
                  value:
                    "COSC 409:Professional and Social Aspects of Computing ",
                },
                {
                  label: "COSC 405",
                  value: "COSC 405:Web Application Engineering II",
                },
                {
                  label: "COSC 407",
                  value: "COSC 407:Data Communications and Networks",
                },
                { label: "COSC 403", value: "COSC 403:Software Engineering" },
              ]}
            />
            <Dropdown
              className="w-full mt-5"
              helperText="Specifies the duration for which the QR code remains scannable."
              label="Validity Period"
              onChange={(selectedOption: any) => {
                setSelectedMinutes({
                  label: selectedOption.label,
                  value: selectedOption.value,
                });
              }}
              items={Array.from({ length: 120 }, (_, index) => ({
                label: `${index + 1} minute${index === 0 ? "" : "s"}`,
                value: index + 1,
              }))}
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
