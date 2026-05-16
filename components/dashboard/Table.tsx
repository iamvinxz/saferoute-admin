import { useState } from "react";

type Tab = "announcement" | "article";

interface Announcement {
  title: string;
  content: string;
  sentBy: { name: string };
  createdAt: string;
}

interface Article {
  title: string;
  description: string;
  sourceLink: string | null;
  createdAt: string;
}

interface Props {
  announcement?: Announcement[];
  article?: Article[];
}

export default function Table({ announcement, article }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("announcement");

  const activeData = activeTab === "announcement" ? announcement : article;

  return (
    <div className="mt-5 lg:mt-7">
      {/* Tab Header */}
      <div className="flex items-center border-b w-fit">
        <button
          onClick={() => setActiveTab("announcement")}
          className={`tab-btn text-[12px] transition-colors px-4 py-2.5 md:text-[14px] ${
            activeTab === "announcement"
              ? "active text-[#1A5EFD] font-semibold"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Announcements
        </button>
        <button
          onClick={() => setActiveTab("article")}
          className={`tab-btn text-[12px] transition-colors px-4 py-2.5 md:text-[14px] ${
            activeTab === "article"
              ? "active text-[#1A5EFD] font-semibold"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Articles
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md max-h-90 overflow-y-auto lg:shadow-[0px_1px_4.5px_-1px_rgba(0,0,0,0.25)] lg:mt-5">
        {/* Header */}
        {activeTab === "announcement" ? (
          <div className="hidden grid-cols-[80px_1fr_1fr_180px_180px] border-b border-gray-200 pb-3 px-4 w-full text-[#848484] font-medium bg-gray-100 lg:grid lg:py-5">
            <div className="text-xs">No.</div>
            <div className="text-xs">Title</div>
            <div className="text-xs">Content</div>
            <div className="text-xs">Author</div>
            <div className="text-xs">Created at</div>
          </div>
        ) : (
          <div className="hidden grid-cols-[100px_1fr_400px_300px_180px] border-b border-gray-200 pb-3 px-4 w-full text-[#848484] font-medium bg-gray-100 lg:grid lg:py-5">
            <div className="text-xs">No.</div>
            <div className="text-xs">Title</div>
            <div className="text-xs">Description</div>
            <div className="text-xs">Source Link</div>
            <div className="text-xs">Created at</div>
          </div>
        )}

        {/* Rows */}
        {!activeData || activeData.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No {activeTab === "announcement" ? "announcements" : "articles"}{" "}
            found.
          </div>
        ) : activeTab === "announcement" ? (
          (activeData as Announcement[]).map((item, index) => (
            <div
              key={index}
              className="py-4 px-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
            >
              {/* Mobile layout - stacked */}
              <div className="flex items-start justify-between lg:hidden">
                <div className="flex-1 pr-4">
                  <p className="text-[#303030] font-medium text-xs mb-1 truncate">
                    {item.title.toUpperCase()}
                  </p>
                  <p className="text-[#707070] text-[10px] line-clamp-2">
                    {item.content}
                  </p>
                  <p className="text-[#848484] text-[9px] mt-1">
                    {item.sentBy?.name}
                  </p>
                </div>
                <p className="text-gray-400 text-[9px] whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Desktop layout - grid */}
              <div className="hidden lg:grid grid-cols-[80px_200px_1fr_180px_180px] px-2">
                <div className="text-[#303030] text-xs">{index + 1}</div>
                <div className="text-[#303030] line-clamp-2 pr-4 text-xs">
                  {item.title}
                </div>
                <div className="text-[#303030] line-clamp-2 text-xs pr-4">
                  {item.content}
                </div>
                <div className="text-[#303030] text-xs">
                  {item.sentBy?.name}
                </div>
                <div className="text-[#303030] text-xs">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))
        ) : (
          (activeData as Article[]).map((item, index) => (
            <div
              key={index}
              className="py-4 px-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Mobile layout - stacked */}
              <div className="flex items-start justify-between lg:hidden">
                <div className="flex-1 pr-4">
                  <p className="text-[#303030] font-medium text-xs mb-1">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-[10px] line-clamp-2">
                    {item.description}
                  </p>
                  {item.sourceLink && (
                    <a
                      href={item.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-[10px] hover:underline truncate block mt-1"
                    >
                      {item.sourceLink}
                    </a>
                  )}
                </div>
                <p className="text-gray-400 text-[9px] whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Desktop layout - grid */}
              <div className="hidden lg:grid grid-cols-[100px_1fr_400px_300px_180px] px-2">
                <div className="text-[#303030] text-xs">{index + 1}</div>
                <div className="text-[#303030] line-clamp-2 pr-4 text-xs">
                  {item.title}
                </div>
                <div className="text-[#303030] line-clamp-2 pr-4 text-xs">
                  {item.description}
                </div>
                <div className="text-[#303030] text-xs">
                  {item.sourceLink ? (
                    <a
                      href={item.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline truncate block"
                    >
                      {item.sourceLink}
                    </a>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
                <div className="text-[#303030] text-xs">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
