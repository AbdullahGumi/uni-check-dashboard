import { NavLink } from "react-router-dom";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const items = [
  {
    name: "Attendance",
    route: "/dashboard/attendance",
    icon: <FactCheckOutlinedIcon />,
  },
  {
    name: "Lecture",
    route: "/dashboard/lecture",
    icon: <SchoolOutlinedIcon />,
  },
  { name: "Logout", route: "/login", icon: <LogoutOutlinedIcon /> },
];

function LeftPane() {
  return (
    <div className="w-[300px] white p-5 max-w-7xl max-h-[750px]">
      <div className="rounded-3xl shadow-2xl h-full w-full flex flex-col items-start justify-start p-5">
        {items.map(({ name, route, icon }, i, { length }) => (
          <NavLink
            key={name}
            to={route}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-slate-200 font-bold"
                  : "bg-gray-100 font-semibold"
              } p-2 px-5 cursor-pointer hover:bg-slate-200 text-black w-full rounded-full mb-5 ${
                i + 1 === length ? "mt-auto" : "mt-2"
              }`
            }
          >
            {icon}
            <span className="ml-4">{name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default LeftPane;
