"use client";
import Header from "@/components/Header";
import Modal from "@/components/dashboard/Modal";
import { useGetAllAnnouncementsQuery } from "@/Redux/Services/notificationService";
import { useGetAllArticlesQuery } from "@/Redux/Services/articleService";
import { useGetAllFloodReportQuery } from "@/Redux/Services/floodReportService";
import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import {
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "@/Redux/Services/userService";
import {
  useGetAllPinQuery,
  useGetAllSegmentQuery,
} from "@/Redux/Services/markService";
import {
  MapPin,
  Megaphone,
  Newspaper,
  Plus,
  Route,
  Siren,
  UserCheck2,
  TriangleAlert,
  ZodiacAquarius,
} from "lucide-react";
import React, { useState } from "react";

const Dashboard = () => {
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const { data: announcementsData, isLoading: announcementsLoading } =
    useGetAllAnnouncementsQuery();
  const { data: articlesData, isLoading: articlesLoading } =
    useGetAllArticlesQuery();
  const { data: floodData } = useGetAllFloodReportQuery();
  const { data: sosData } = useGetAllSosAlertQuery();
  const { data: adminsData } = useGetAllAdminsQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const { data: pinsData } = useGetAllPinQuery();
  const { data: segmentsData } = useGetAllSegmentQuery();

  const openModal = (type: string) => setModal({ isOpen: true, type });
  const closeModal = () => setModal({ isOpen: false, type: "" });

  return (
    <div className="w-full my-10">
      <Header />
      <Modal isOpen={modal.isOpen} onClose={closeModal} type={modal.type} />

      {/* Cards */}
      <div className="ml-20 flex gap-6 max-md:grid max-md:gap-5 max-md:mx-10 max-md:grid-cols-2 justify-start items-center mt-5">
        <div className=" border border-red-600 h-30 w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="font-bold text-[#303030] text-sm">SOS Signal</span>
            <TriangleAlert size={20} className="animate-bounce" />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            {sosData?.alerts?.length ?? 0}
          </p>
        </div>
        <div className=" border border-blue-900 h-30 w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="font-bold text-[#303030] text-sm">
              Flood Reports
            </span>

            <ZodiacAquarius size={20} className="animate-bounce" />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            {floodData?.reports?.length ?? 0}
          </p>
        </div>
        <div className="bg-blue-300 h-30 w-50 max-md:w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-sm">Pinned Locations</span>
            <MapPin size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            {pinsData?.pins.length ?? 0}
          </p>
        </div>
        <div className="bg-yellow-200 h-30 w-50 max-md:w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-sm">Responded</span>
            <Siren size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            {sosData?.alerts?.filter((a: any) => a.status === "responded")
              .length ?? 0}
          </p>
        </div>
        <div className="bg-red-300 h-30 w-50 max-md:w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-sm">Segments</span>
            <Route size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            {segmentsData?.segments.length ?? 0}
          </p>
        </div>
        <div className="bg-green-200 h-30 w-50 max-md:w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-xs">Admin Users</span>
            <UserCheck2 size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            {adminsData?.admins?.length ?? 0}
          </p>
        </div>
        <div className="bg-green-200 h-30 w-50 max-md:w-60 rounded-md shadow-sm p-5">
          <div className="flex justify-between items-start">
            <span className="text-gray-500 text-xs">Active Resident Users</span>
            <UserCheck2 size={20} />
          </div>
          <p className="text-4xl font-bold text-[#303030] mt-3">
            1{usersData?.users.length ?? 0}
          </p>
        </div>
      </div>

      <div className="mx-20 mt-10 max-md:grid-cols-1 grid grid-cols-2 gap-5">
        {/* Announcements */}
        <div>
          <div className="flex items-center justify-between mr-3">
            <div className="flex items-center gap-2">
              <Megaphone size={18} />
              <p className="font-medium text-lg text-[#303030]">
                Announcements
              </p>
            </div>
            <button
              onClick={() => openModal("Announcement")}
              className="bg-blue-300 rounded-md p-1 text-white hover:cursor-pointer hover:bg-blue-500"
            >
              <Plus />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {announcementsLoading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : announcementsData?.announcements.length === 0 ? (
              <p className="text-sm text-gray-400">No announcements yet.</p>
            ) : (
              announcementsData?.announcements.map((a) => (
                <div
                  key={a._id}
                  className="border-gray-500 border hover:shadow-lg p-5 rounded-md"
                >
                  <p className="font-semibold mb-2">{a.title}</p>
                  <p className="text-sm text-gray-500 max-h-20 overflow-hidden">
                    {a.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    By {a.sentBy.name} ·{" "}
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex items-center justify-between mr-3">
            <div className="flex items-center gap-2">
              <Newspaper size={18} />
              <p className="font-medium text-sm text-[#303030]">Articles</p>
            </div>
            <button
              onClick={() => openModal("Article")}
              className="bg-blue-300 rounded-md p-1 text-white hover:cursor-pointer hover:bg-blue-500"
            >
              <Plus />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {articlesLoading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : articlesData?.articles.length === 0 ? (
              <p className="text-sm text-gray-400">No articles yet.</p>
            ) : (
              articlesData?.articles.map((a) => (
                <div
                  key={a._id}
                  className=" border-gray-500 border hover:shadow-lg p-5 rounded-md"
                >
                  <p className="font-semibold mb-2">{a.title}</p>
                  <p className="text-sm text-gray-500 max-h-8 overflow-clip">
                    {a.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
