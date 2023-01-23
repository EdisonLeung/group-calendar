import React, { useState } from "react";
import FormModal from "./FormModal";

export default function Sidebar() {
  let menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);
  const [show, setShow] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false)

  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  return (
    <div class="absolute z-10 top-16 h-full">
      <div
        id="Main"
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col`}
      >
        <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5">
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  hover:text-indigo-400  text-white rounded ">
            <i class="fa fa-calendar"></i>
            <p className="text-base leading-4 ">My Calendar</p>
          </button>
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  hover:text-indigo-400  text-white rounded "  onClick={()=>setShowFormModal(true)}>
            <i class="fa fa-square-plus"></i>

            <p className="text-base leading-4 ">Join Calendar Group</p>
          </button>
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  hover:text-indigo-400  text-white rounded "  onClick={()=>setShowFormModal(true)}>
            <i class="fa fa-square-plus"></i>

            <p className="text-base leading-4 ">Create Calendar Group</p>
          </button>
        </div>
        <div className="flex flex-col justify-start items-center  px-6 border-b border-gray-600 w-full  ">
          <button
            onClick={() => setMenuValue(0)}
            className="focus:outline-none hover:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  "
          >
            <p className="text-sm leading-5  uppercase">Calendar Groups</p>
            <div
              className={`${
                menu[0] ? "" : "rotate-180"
              } transform duration-100`}
            >
              <i class="fa fa-angle-down"></i>
            </div>
          </button>
          <div
            id="menu1"
            className={`${
              menu[0] ? "flex" : "hidden"
            } justify-start  flex-col w-full md:w-auto items-start pb-1 `}
          >
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <i class="fa fa-calendar-o"></i>
              <p className="text-base leading-4  ">Messages</p>
            </button>
          </div>
        </div>
      </div>
      <FormModal open={showFormModal} onClose={()=>{setShowFormModal(false)}}/>
    </div>
  );
}
