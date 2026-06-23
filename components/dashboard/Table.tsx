import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/dashboard/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useDeleteArticleMutation } from "@/Redux/Services/articleService";
import { useDeleteAnnouncementMutation } from "@/Redux/Services/notificationService";

export type Tab = "announcement" | "article";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  sentBy: { name: string };
  createdAt: string;
}

interface Article {
  _id: string;
  title: string;
  description: string;
  photoUrl: string | null;
  sourceLink: string | null;
  createdAt: string;
}

export interface Pagination {
  totalArticles?: number;
  totalAnnouncements?: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Props {
  announcement?: Announcement[];
  article?: Article[];
  isLoading?: boolean;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  pagination?: Pagination;
  page: number;
  onPageChange: (page: number) => void;
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
    <div className="hidden lg:grid grid-cols-[80px_200px_1fr_180px_180px_60px] px-2 gap-4">
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded-full" />
    </div>
  </div>
);

export default function Table({
  announcement,
  article,
  isLoading,
  activeTab,
  onTabChange,
  pagination,
  page,
  onPageChange,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isRescuer = user?.role === "rescuer";

  const activeData = activeTab === "announcement" ? announcement : article;
  const limit = pagination?.limit ?? 5;

  //rtk

  const [deleteArticle, { isLoading: isDeletingArticle }] =
    useDeleteArticleMutation();
  const [deleteAnnouncement, { isLoading: isDeletingAnnouncement }] =
    useDeleteAnnouncementMutation();

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteAnnouncement(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const isDeleting =
    activeTab === "announcement" ? isDeletingAnnouncement : isDeletingArticle;

  return (
    <div className="mt-5 pb-5 lg:mt-7">
      {/* Tab Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center border-b w-fit">
          <button
            onClick={() => onTabChange("announcement")}
            className={`tab-btn text-[12px] transition-colors px-4 py-2.5 md:text-[14px] ${
              activeTab === "announcement"
                ? "active text-[#1A5EFD] font-semibold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Announcements
          </button>
          <button
            onClick={() => onTabChange("article")}
            className={`tab-btn text-[12px] transition-colors px-4 py-2.5 md:text-[14px] ${
              activeTab === "article"
                ? "active text-[#1A5EFD] font-semibold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Articles
          </button>
        </div>
        {!isRescuer && (
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
        )}
      </div>

      {isOpen && <Modal activeTab={activeTab} setIsOpen={setIsOpen} />}

      {/* Table */}
      <div className="rounded-md max-h-200 overflow-y-auto lg:shadow-[0px_1px_4.5px_-1px_rgba(0,0,0,0.25)] lg:mt-5">
        {/* Header */}
        {activeTab === "announcement" ? (
          <div className="hidden grid-cols-[80px_1fr_1fr_180px_180px_60px] border-b border-gray-200 pb-3 px-4 w-full text-[#848484] font-medium bg-gray-100 lg:grid lg:py-5">
            <div className="text-xs">No.</div>
            <div className="text-xs">Title</div>
            <div className="text-xs">Content</div>
            <div className="text-xs">Author</div>
            <div className="text-xs">Created at</div>
            <div className="text-xs">Action</div>
          </div>
        ) : (
          <div className="hidden grid-cols-[60px_70px_1fr_1fr_160px_150px_70px] border-b border-gray-200 pb-3 px-4 w-full text-[#848484] font-medium bg-gray-100 lg:grid lg:py-5">
            <div className="text-xs">No.</div>
            <div className="text-xs">Photo</div>
            <div className="text-xs">Title</div>
            <div className="text-xs">Description</div>
            <div className="text-xs">Source Link</div>
            <div className="text-xs">Created at</div>
            <div className="text-xs">Action</div>
          </div>
        )}

        {/* Skeleton */}
        {isLoading ? (
          Array.from({ length: limit }).map((_, i) => <SkeletonRow key={i} />)
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
              key={item._id}
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
              <div className="hidden lg:grid grid-cols-[80px_200px_1fr_180px_180px_60px] px-2 items-center">
                <div className="text-[#303030] text-xs">
                  {(page - 1) * limit + index + 1}
                </div>
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
                <div className="text-xs">
                  {!isRescuer && (
                    <button
                      onClick={() => handleDeleteAnnouncement(item._id)}
                      disabled={isDeleting}
                      title="Delete announcement"
                      className="inline-flex items-center px-2 py-1 rounded-md text-[0.72rem] font-medium bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Article rows */
          (activeData as Article[]).map((item, index) => (
            <div
              key={item._id}
              className="py-4 px-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Mobile layout — photo on left, content on right */}
              <div className="flex items-start gap-3 lg:hidden">
                {/* Photo */}
                <div className="shrink-0">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="w-12 h-12 rounded-md object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-[10px]">No img</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[#303030] font-medium text-xs mb-1 truncate">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-[9px] whitespace-nowrap shrink-0">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="text-gray-400 text-[10px] line-clamp-2">
                    {item.description}
                  </p>
                  {item.sourceLink && (
                    <a
                      href={item.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-[10px] hover:underline truncate block mt-1 max-w-[180px]"
                    >
                      {item.sourceLink}
                    </a>
                  )}
                </div>
              </div>

              {/* Desktop layout — grid, must match header exactly */}
              <div className="hidden lg:grid grid-cols-[60px_70px_1fr_1fr_160px_150px_70px] px-2 items-center gap-2">
                <div className="text-[#303030] text-xs">
                  {(page - 1) * limit + index + 1}
                </div>
                <div className="flex items-center">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="w-9 h-9 rounded-md object-cover border border-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-gray-300 text-[8px]">—</span>
                    </div>
                  )}
                </div>
                <div className="text-[#303030] line-clamp-2 pr-2 text-xs">
                  {item.title}
                </div>
                <div className="text-[#303030] line-clamp-2 pr-2 text-xs">
                  {item.description}
                </div>
                <div className="text-[#303030] text-xs truncate pr-2">
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
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs">
                  {!isRescuer && (
                    <button
                      onClick={() => handleDeleteArticle(item._id)}
                      disabled={isDeleting}
                      title="Delete article"
                      className="inline-flex items-center px-2 py-1 rounded-md text-[0.72rem] font-medium bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-xs text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={!pagination.hasPrevPage}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
