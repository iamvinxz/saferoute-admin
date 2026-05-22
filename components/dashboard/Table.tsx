import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/dashboard/Modal";

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
  isLoading?: boolean;
}

const SkeletonRow = () => (
  <div className="py-4 px-3 border-b border-gray-200 animate-pulse">
    {/* Mobile skeleton */}
    <div className="flex items-start justify-between lg:hidden">
      <div className="flex-1 pr-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded-full w-2/3" />
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2 bg-gray-200 rounded-full w-1/3" />
      </div>
      <div className="h-2 bg-gray-200 rounded-full w-16" />
    </div>
    {/* Desktop skeleton */}
    <div className="hidden lg:grid grid-cols-[80px_200px_1fr_180px_180px] px-2 gap-4">
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
    </div>
  </div>
);

export default function Table({ announcement, article, isLoading }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("announcement");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeData = activeTab === "announcement" ? announcement : article;

  return (
    <div className="mt-5 pb-5 lg:mt-7">
      {/* Tab Header */}
      <div className="flex items-center justify-between">
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
        <div className="pr-2">
          <button
            className="flex items-center gap-2 text-xs font-medium bg-[#598bff] text-white p-1 rounded-md shadow-sm hover:cursor-pointer lg:p-3"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden lg:inline">
              {activeTab === "announcement"
                ? "Create announcement"
                : "Create article"}
            </span>
          </button>
        </div>
      </div>

      {isOpen && <Modal activeTab={activeTab} setIsOpen={setIsOpen} />}

      {/* Table */}
      <div className="rounded-md max-h-200 overflow-y-auto lg:shadow-[0px_1px_4.5px_-1px_rgba(0,0,0,0.25)] lg:mt-5">
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

        {/* Skeleton */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : /* Empty state */
        !activeData || activeData.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No {activeTab === "announcement" ? "announcements" : "articles"}{" "}
            found.
          </div>
        ) : /* Announcement rows */
        activeTab === "announcement" ? (
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
          /* Article rows */
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
                      className="max-w-35 text-blue-500 text-[10px] hover:underline truncate block mt-1"
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
                      className="text-blue-500 hover:underline truncate block pr-5"
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
