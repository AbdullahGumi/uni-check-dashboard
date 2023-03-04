import { useRef } from "react";
import QRCode from "react-qr-code";

import { useReactToPrint } from "react-to-print";
import Button from "../../components/Button";
function QRCodePage() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="flex flex-1  min-h-screen max-w-7xl p-5  ">
      <div className="bg-white shadow-2xl w-full rounded-3xl ">
        <div className="flex flex-col mb-auto mt-20 h-full items-center w-full mx-auto">
          <div
            ref={componentRef}
            className="w-full max-w-[300px] flex flex-col items-center"
            id="qr"
          >
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
            />
            <p
              id="qrText"
              className="text-black text-sm font-semibold text-center mt-20"
            >
              Course Name: Data Structures And Algorithms <br />
              (cosc401)
            </p>
            <p
              id="qrText"
              className="text-black text-sm font-semibold text-center mt-3"
            >
              Scan time: 1 hour{" "}
            </p>
          </div>
          <Button
            onClick={handlePrint}
            style={{ marginTop: 20, width: "300px" }}
          >
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QRCodePage;
