import React, { useRef } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface DisplayCardProps {
  totalBooksBorrowed: number;
  totalBooksInHand: number;
  totalFine: string;
  dueDate: string; // should be a float type and a decimal value should be shown
}

export default function DisplayCard(props: DisplayCardProps) {
  let totalFine;
  if (
    props.totalFine === "NaN" ||
    props.totalFine == "" ||
    props.totalFine == null
  ) {
    totalFine = "0.00";
  } else {
    totalFine = props.totalFine;
  }

  return (
    <div>
      <div className="text-[25px] font-['Montserrat'] underline underline-offset-auto text-zinc-800 font-medium">
        User Analytics
      </div>
      <div className="flex flex-row gap-[70px] pt-10 ">
        <div className="w-[300px] h-fit p-4 pt-8 bg-white rounded-2xl shadow-xl flex-col gap-5 inline-flex hover:bg-slate-200 hover:scale-110 transition-all">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-black text-[18px] font-semibold font-['Montserrat'] tracking-widest">
              Total Books Borrowed
            </p>
            <p
              id="totalBooksInHand"
              className="font-['Montserrat'] text-zinc-600 text-[50px] pt-2 font-bold"
            >
              {props.totalBooksBorrowed}
            </p>
          </div>
        </div>
        <div className="w-[300px] h-fit p-4 pt-8 bg-white rounded-2xl shadow-xl flex-col gap-5 inline-flex hover:bg-slate-200 hover:scale-110 transition-all">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-black text-[18px] font-semibold font-['Montserrat'] tracking-widest">
              Total Books Borrowed
            </p>
            <p
              id="totalBooksInHand"
              className="font-['Montserrat'] text-zinc-600 text-[50px] pt-2 font-bold"
            >
              {props.totalBooksBorrowed}
            </p>
          </div>
        </div>
        <div className="w-[300px] h-fit p-4 pt-8 bg-white rounded-2xl shadow-xl flex-col gap-5 inline-flex hover:bg-slate-200 hover:scale-110 transition-all">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-black text-[18px] font-semibold font-['Montserrat'] tracking-widest">
              Total Fine
            </p>
            <div className="flex flex-row items-center">
              <FaIndianRupeeSign className="text-[50px] text-zinc-600 translate-y-2 mr-2 " />
              <p
                id="totalfine"
                className="font-['Montserrat'] text-zinc-600 text-[50px] pt-2 font-bold"
              >
                {totalFine}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-fit p-4 pt-8 bg-white rounded-2xl shadow-xl flex-col gap-5 inline-flex hover:bg-slate-200 hover:scale-110 transition-all">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-black text-[18px] font-semibold font-['Montserrat'] tracking-widest">
              Upcomming Due-Date
            </p>

            <p
              id="duedate"
              className="font-['Montserrat'] text-zinc-600 text-[50px] pt-2 font-bold"
            >
              {props.dueDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
