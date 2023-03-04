const items = ["Attendance", "Lecture", "Logout"];

function LeftPane() {
  return (
    <div className="w-[300px] white p-5 max-w-7xl max-h-[750px]">
      <div className="rounded-3xl shadow-2xl h-full w-full flex flex-col items-start justify-start p-5">
        {items.map((item, i, { length }) => (
          <div
            key={item}
            className={`p-2 px-5 cursor-pointer bg-gray-100 hover:bg-slate-200  text-black w-full rounded-full ${
              i + 1 === length ? "mt-auto" : "mt-2"
            }`}
          >
            <span className=" font-semibold">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftPane;
