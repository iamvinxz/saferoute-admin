"use client";
import { X } from "lucide-react";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useSendAnnouncementMutation } from "@/Redux/Services/notificationService";
import { useCreateArticleMutation } from "@/Redux/Services/articleService";

const Modal = ({ isOpen, onClose, type }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");

  const [sendAnnouncement, { isLoading: announcementLoading }] =
    useSendAnnouncementMutation();
  const [createArticle, { isLoading: articleLoading }] =
    useCreateArticleMutation();

  const isLoading = announcementLoading || articleLoading;

  if (!isOpen) return null;

  const resetFields = () => {
    setTitle("");
    setContent("");
    setDescription("");
    setSourceLink("");
    setPhotoUrl("");
    setError("");
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleSubmit = async () => {
    setError("");
    try {
      if (type === "Announcement") {
        await sendAnnouncement({ title, content }).unwrap();
      } else if (type === "Article") {
        await createArticle({
          title,
          description,
          sourceLink,
          photoUrl: photoUrl || null,
        }).unwrap();
      }
      resetFields();
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return createPortal(
    <div
     className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl p-7 w-105 max-w-[95vw]">
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-bold text-[#1e293b]">Add {type}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-5">
          Fill in the details below to publish.
        </p>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {/* Title — shared */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Announcement fields */}
        {type === "Announcement" && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write content here..."
              rows={4}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>
        )}

        {/* Article fields */}
        {type === "Article" && (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write description here..."
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Source Link
              </label>
              <input
                type="url"
                value={sourceLink}
                onChange={(e) => setSourceLink(e.target.value)}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Photo URL{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={handleClose}
            className="bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : `Add ${type}`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
