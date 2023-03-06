// @ts-nocheck
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  InputBase,
  InputAdornment,
  Pagination,
} from "@mui/material";
import { useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Button from "./Button";
import CustomModal from "./CustomModal";

const CustomTableCell = ({ children, className }) => (
  <TableCell
    style={{ borderBottom: "none" }}
    align="left"
    className={className}
  >
    <span className="text-black font-semibold text-xs uppercase">
      {children}
    </span>
  </TableCell>
);

interface IProps {
  attendance: {
    fullName: string;
    registrationNumber: string;
    phoneNumber: string;
    time: string;
  }[];
}

const AttendanceTable = ({ attendance }: IProps) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const tableHeaderCells = [
    "Full name",
    "Registration number",
    "Phone number",
    "Time",
  ];

  return (
    <div className="flex flex-col py-10">
      <>
        <div className="flex justify-between items-center w-full">
          <div className="rounded-[10px] bg-[#f6f8fa] w-full md:w-[312px] h-[45px]">
            <InputBase
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              }
              type="text"
              className="w-full h-full border-none outline-none bg-transparent py-0 px-[21px] text-[#808080]"
              placeholder="Search"
            />
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            style={{
              backgroundColor: "#f5cdcd",
              color: "red",
              fontWeight: "bold",
              width: "200px",
            }}
          >
            Delete Attendance
            <DeleteForeverOutlinedIcon />
          </Button>
        </div>

        <div className="flex items-center mt-8 mb-3">
          <span className="text-base text-black font-semibold ml-[.5rem] uppercase">
            {attendance.length} Attendees
          </span>
        </div>

        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0px 8px",
          }}
        >
          <TableHead>
            <TableRow>
              {tableHeaderCells.map((item) => (
                <TableCell
                  key={item}
                  style={{ borderBottom: "none" }}
                  align="left"
                >
                  <span className="text-base text-black font-semibold">
                    {item}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .filter((row) => {
                if (
                  row.fullName.toLowerCase().includes(search.toLowerCase()) ||
                  row.registrationNumber
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  row.phoneNumber.toLowerCase().includes(search.toLowerCase())
                )
                  return row;
              })
              .map((row, i) => {
                return (
                  <TableRow
                    key={i}
                    className="bg-[#F6F8FA] hover:bg-slate-200"
                    sx={{ borderBottom: 0 }}
                  >
                    <CustomTableCell className="rounded-l-xl">
                      {row.fullName}
                    </CustomTableCell>
                    <CustomTableCell>{row.registrationNumber}</CustomTableCell>
                    <CustomTableCell>{row.phoneNumber}</CustomTableCell>
                    <CustomTableCell className="rounded-r-xl">
                      {row.time}
                    </CustomTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <div className="flex justify-center items-center mt-10">
          <div
            className="cursor-pointer"
            onClick={() => page > 1 && setPage(page - 1)}
          >
            <ChevronLeftIcon sx={{ color: "black" }} />
          </div>

          <div className="border-black border-[2px] rounded-full w-fit mx-5 ">
            <Pagination
              count={Math.ceil(attendance.length / itemsPerPage)}
              page={page}
              hideNextButton
              hidePrevButton
              //   color="primary"
              sx={{
                ".MuiPaginationItem-root": {
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "rgb(226 232 240)",
                },
              }}
              onChange={(_, val) => setPage(val)}
              defaultPage={1}
            />
          </div>

          <div
            className="cursor-pointer"
            onClick={() =>
              page < Math.ceil(attendance.length / itemsPerPage) &&
              setPage(page + 1)
            }
          >
            <ChevronRightIcon sx={{ color: "black" }} />
          </div>
        </div>
      </>
      <CustomModal open={isModalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default AttendanceTable;
