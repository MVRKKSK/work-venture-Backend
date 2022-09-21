import React from "react";

export const GlobalWork = () => {
    return (
        <div className="dark:bg-gray-800 dark:text-gray-50">
            <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 " id="tabs-tabFill"
                role="tablist">
                <li className="nav-item flex-auto text-center" role="presentation">
                    <a href="/work" className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      
      focus:border-transparent
      active
    " id="tabs-home-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-homeFill" role="tab"
                        aria-controls="tabs-homeFill" aria-selected="true">Global Projects</a>
                </li>
                <li className="nav-item flex-auto text-center" role="presentation">
                    <a href="/PostWork" className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      
      focus:border-transparent
    " id="tabs-profile-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-profileFill" role="tab"
                        aria-controls="tabs-profileFill" aria-selected="false">Post a Need </a>
                </li>
                <li className="nav-item flex-auto text-center" role="presentation">
                    <a href="/CollegeProjects" className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      
      focus:border-transparent
    " id="tabs-messages-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-messagesFill" role="tab"
                        aria-controls="tabs-messagesFill" aria-selected="false">College Projects</a>
                </li>
            </ul>
        </div>
    );
}