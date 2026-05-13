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
  Waves,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
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

  const regularCards = [
    {
      label: "Pinned Locations",
      value: pinsData?.pins?.length ?? 0,
      icon: <MapPin size={18} />,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
      accent: "border-l-sky-400",
      route: "/maps",
    },
    {
      label: "Responded",
      value:
        sosData?.alerts?.filter(
          (a: { status: string }) => a.status === "responded",
        ).length ?? 0,
      icon: <Siren size={18} />,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      accent: "border-l-amber-400",
      route: "/notification",
    },
    {
      label: "Segments",
      value: segmentsData?.segments?.length ?? 0,
      icon: <Route size={18} />,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-400",
      accent: "border-l-rose-400",
      route: "/maps",
    },
    {
      label: "Admin Users",
      value: adminsData?.admins?.length ?? 0,
      icon: <UserCheck2 size={18} />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      accent: "border-l-emerald-400",
      route: "/users",
    },
    {
      label: "Resident Users",
      value: usersData?.users?.length ?? 0,
      icon: <UserCheck2 size={18} />,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-500",
      accent: "border-l-teal-400",
      route: "/users",
    },
  ];

  return (
    <div className="dash-page min-h-screen bg-[#f8fafc] w-full px-6 sm:px-8 lg:px-10 py-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .dash-page * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        .urgent-card {
          border-radius: 16px;
          padding: 22px 24px;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-width: 2px;
          border-style: solid;
        }
        .urgent-card:hover {
          box-shadow: 0 10px 32px rgba(0,0,0,0.13);
          transform: translateY(-3px);
        }
        .urgent-card-sos {
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
          border-color: #f87171;
          box-shadow: 0 2px 14px rgba(239,68,68,0.14);
        }
        .urgent-card-flood {
          background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
          border-color: #60a5fa;
          box-shadow: 0 2px 14px rgba(59,130,246,0.14);
        }
        .urgent-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .live-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .live-badge-sos  { background: #fee2e2; color: #dc2626; }
        .live-badge-flood { background: #dbeafe; color: #2563eb; }

        .ping-dot {
          position: relative;
          display: inline-block;
          width: 8px; height: 8px;
        }
        .ping-dot::before, .ping-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .ping-dot::before { background: currentColor; }
        .ping-dot::after {
          background: currentColor;
          animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }

        .stat-card {
          background: white;
          border: 1px solid #e8edf3;
          border-left-width: 4px;
          border-radius: 14px;
          padding: 18px 20px;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stat-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }
        .stat-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }

        .content-card {
          background: white;
          border: 1px solid #e8edf3;
          border-radius: 14px;
          padding: 18px 20px;
          transition: box-shadow 0.2s;
        }
        .content-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

        .section-card {
          background: white;
          border: 1px solid #e8edf3;
          border-radius: 16px;
          overflow: hidden;
        }
        .section-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          background: #fafbfc;
        }
        .add-btn {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px;
          background: #eff6ff; color: #3b82f6;
          border-radius: 8px; cursor: pointer;
          transition: background 0.15s; border: none;
        }
        .add-btn:hover { background: #dbeafe; }

        .skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px; height: 80px;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      <Header />
      <Modal isOpen={modal.isOpen} onClose={closeModal} type={modal.type} />

      {/* Urgent alert cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div
          onClick={() => router.push("/notification")}
          className="urgent-card urgent-card-sos"
        >
          <div className="flex items-center justify-between">
            <div className="urgent-icon bg-red-100 text-red-600">
              <TriangleAlert size={22} />
            </div>
            <span className="live-badge live-badge-sos">
              <span className="ping-dot mb-3 mr-2 text-red-500" />
              Live
            </span>
          </div>
          <div>
            <p className="text-4xl font-bold text-red-600">
              {sosData?.alerts?.length ?? 0}
            </p>
            <p className="text-sm font-semibold text-red-500 mt-0.5">
              SOS Signal
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Active emergency alerts requiring attention
            </p>
          </div>
        </div>

        <div
          onClick={() => router.push("/notification")}
          className="urgent-card urgent-card-flood"
        >
          <div className="flex items-center justify-between">
            <div className="urgent-icon bg-blue-100 text-blue-600">
              <Waves size={22} />
            </div>
            <span className="live-badge live-badge-flood">
              <span className="ping-dot  mb-3 mr-2 text-blue-500" />
              Live
            </span>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">
              {floodData?.reports?.length ?? 0}
            </p>
            <p className="text-sm font-semibold text-blue-500 mt-0.5">
              Flood Reports
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Incoming flood reports from residents
            </p>
          </div>
        </div>
      </div>

      {/* Regular stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {regularCards.map((card) => (
          <div
            key={card.label}
            onClick={() => router.push(card.route)}
            className={`stat-card ${card.accent}`}
          >
            <div className={`stat-icon ${card.iconBg} ${card.iconColor}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{card.value}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Announcements + Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="section-card">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Megaphone size={14} className="text-blue-500" />
              </div>
              <span className="font-semibold text-sm text-slate-700">
                Announcements
              </span>
            </div>
            <button
              className="add-btn"
              onClick={() => openModal("Announcement")}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {announcementsLoading ? (
              <>
                <div className="skeleton" />
                <div className="skeleton" />
              </>
            ) : announcementsData?.announcements.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">
                No announcements yet.
              </p>
            ) : (
              announcementsData?.announcements.map((a) => (
                <div key={a._id} className="content-card">
                  <p className="font-semibold text-sm text-slate-800 mb-1">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed max-h-12 overflow-hidden">
                    {a.content}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-50">
                    By {a.sentBy.name} ·{" "}
                    {new Date(a.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Newspaper size={14} className="text-emerald-500" />
              </div>
              <span className="font-semibold text-sm text-slate-700">
                Articles
              </span>
            </div>
            <button className="add-btn" onClick={() => openModal("Article")}>
              <Plus size={16} />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {articlesLoading ? (
              <>
                <div className="skeleton" />
                <div className="skeleton" />
              </>
            ) : articlesData?.articles.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">
                No articles yet.
              </p>
            ) : (
              articlesData?.articles.map((a) => (
                <div key={a._id} className="content-card">
                  <p className="font-semibold text-sm text-slate-800 mb-1">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed max-h-8 overflow-hidden">
                    {a.description}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-50">
                    {new Date(a.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
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
