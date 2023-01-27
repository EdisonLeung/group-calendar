import React, { useState } from "react";
function Header(props) {
  const [profile, setProfile] = useState(false);
  const [show, setShow] = useState(null);

  return (
    <>
      <div className="bg-gray-200 h-full w-full">
        {/* Code block starts */}
        <div className={`${props.showSidebar ? "fixed" : ""} w-full bg-blue-100 shadow xl:block p-2`}>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div class="flex">
                  {" "}
                  <div className="xl:flex">
                    <button
                      className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                      onClick={()=>{props.setShowSidebar(!props.showSidebar)}}
                    >
                      <i class="fa fa-bars fa-xl"></i>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    aria-label="Home"
                    id="logo"
                    enableBackground="new 0 0 300 300"
                    height={44}
                    viewBox="0 0 300 300"
                    width={43}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        fill="#4c51bf"
                        d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                      />
                    </g>
                  </svg>
                  <h2 className="sm:block text-base text-gray-700 font-bold leading-normal pl-3">
                    Our Calendly
                  </h2>
                </div>
              </div>

              <div className="flex">
                <div className="xl:flex md:mr-6 xl:mr-16 text-xl text-gray-700">
                  Welcome,{" "}
                  {props.userInfo !== undefined ? props.userInfo.username : ""}!
                </div>{" "}
              </div>
              <div className="flex">
                <div className="xl:flex items-center">
                  <div className="ml-6 relative">
                    <div
                      className="flex items-center relative"
                      onClick={() => setProfile(!profile)}
                    >
                      {profile && (
                        <ul className="p-2 w-40 border-r bg-white absolute rounded right-0 shadow top-0 mt-16 z-10">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                            <div className="flex items-center text-base">
                                <i class="fa fa-user"></i>
                              <span className="ml-2">Edit Profile</span>
                            </div>
                          </li>
                          <li className="cursor-pointer text-base text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                            <button onClick={props.signOut}>
                              <i class="fa fa-right-from-bracket"></i>
                              <span className="ml-2">Sign Out</span>
                            </button>
                          </li>
                        </ul>
                      )}
                      <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                        <img
                          className="rounded-full h-10 w-10 object-cover"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          alt="logo"
                        />
                      </div>
                      <div className="ml-2 text-gray-600">
                        <i class="fa fa-angle-down"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{" "}
      </div>
    </>
  );
}

export default Header;
