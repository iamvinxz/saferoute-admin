import Header from "@/components/Header";
import {
  MapPin,
  Megaphone,
  Newspaper,
  Plus,
  Route,
  Siren,
  UserCheck2,
} from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full my-10">
      <Header />
      {/**Cards */}
      <div className="flex gap-25 justify-center items-center mt-10">
        <div className="bg-gray-300 h-40 w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-xs">Segments</span>
            <Route size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">10</p>
        </div>
        <div className="bg-gray-300 h-40 w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-xs">Pinned Locations</span>
            <MapPin size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">10</p>
        </div>
        <div className="bg-gray-300 h-40 w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-xs">Responded</span>
            <Siren size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">10</p>
        </div>
        {/* <div className="bg-gray-300 h-40 w-60 rounded-md shadow-sm p-5">
          <span className="text-gray-500 text-xs">Active Users</span>
          <p className="text-4xl font-bold text-[#303030] mt-3">10</p>
        </div> */}
        <div className="bg-gray-300 h-40 w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-xs">Admin Users</span>
            <UserCheck2 size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">10</p>
        </div>
      </div>
      <div className="mx-23 mt-15 grid grid-cols-2 gap-5">
        {/**Announcement */}
        <div>
          <div className="flex items-center justify-between mr-3">
            <div className="flex items-center gap-2">
              <Megaphone size={18} />
              <p className="font-medium text-lg text-[#303030]">
                Announcements
              </p>
            </div>
            <button className="bg-blue-300 rounded-md p-1 text-white hover:cursor-pointer hover:bg-blue-500">
              <Plus />
            </button>
          </div>
          <div className="bg-gray-300 p-5 mt-4 rounded-md">
            <p className="font-semibold mb-2">Title of announcement 1</p>
            <p className="text-xs text-gray-500 max-h-8 overflow-clip">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In eum
              dolorem dol oribus illum, consectetur, aut cumque itaque minus
              assumenda recusandae veniam. Fugit, iusto! Laudantium labore
              ducimus sit nemo, enim impedit! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Facilis, nemo aspernatur mollitia
              praesentium dolore quo ratione inventore, deserunt magnam fugit
              accusantium cumque maxime nihil nam voluptatum assumenda tenetur
              beatae fugiat.
            </p>
          </div>
        </div>
        {/**Articles */}
        <div>
          <div className="flex items-center justify-between mr-3">
            <div className="flex items-center gap-2">
              <Newspaper size={18} />
              <p className="font-medium text-lg text-[#303030]">Articles</p>
            </div>
            <button className="bg-blue-300 rounded-md p-1 text-white hover:cursor-pointer hover:bg-blue-500">
              <Plus />
            </button>
          </div>
          <div className="bg-gray-300 p-5 mt-4 rounded-md">
            <p className="font-semibold mb-2">Article 1</p>
            <p className="text-xs text-gray-500 max-h-8 overflow-clip">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In eum
              dolorem dol oribus illum, consectetur, aut cumque itaque minus
              assumenda recusandae veniam. Fugit, iusto! Laudantium labore
              ducimus sit nemo, enim impedit! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Facilis, nemo aspernatur mollitia
              praesentium dolore quo ratione inventore, deserunt magnam fugit
              accusantium cumque maxime nihil nam voluptatum assumenda tenetur
              beatae fugiat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
