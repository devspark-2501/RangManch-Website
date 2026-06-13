"use client";

import { useState, useEffect } from "react";
import {
  FaImages,
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingExhibitions, setLoadingExhibitions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [editTarget, setEditTarget] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({ exhibitionId: "", title: "", images: [] });

  // ── Fetch all galleries ──────────────────────────────────────────────
  const fetchGalleries = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/Admin/gallery", { cache: "no-store" });
      const data = await res.json();
      setGalleries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch galleries:", err);
    } finally {
      setLoadingList(false);
    }
  };

  // ── Fetch all exhibitions for dropdown ───────────────────────────────
  const fetchExhibitions = async () => {
    setLoadingExhibitions(true);
    try {
      const res = await fetch("/api/exhibitions", { cache: "no-store" });
      const data = await res.json();
      setExhibitions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch exhibitions:", err);
    } finally {
      setLoadingExhibitions(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
    fetchExhibitions();
  }, []);

  // ── Image helpers ────────────────────────────────────────────────────
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const converted = await Promise.all(files.map(convertToBase64));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...converted] }));
    e.target.value = "";
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ── Open / close form ────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(null);
    setForm({ exhibitionId: "", title: "", images: [] });
    setShowForm(true);
  };

  const openEdit = (gallery) => {
    setEditTarget(gallery);
    setForm({
      exhibitionId: gallery.exhibitionId?._id || gallery.exhibitionId || "",
      title: gallery.title,
      images: [...gallery.images],
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
    setForm({ exhibitionId: "", title: "", images: [] });
  };

  // ── Submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.exhibitionId) {
      alert("Please select an exhibition.");
      return;
    }
    if (!form.title.trim()) {
      alert("Please enter a gallery title.");
      return;
    }
    if (form.images.length < 1) {
      alert("Please upload at least 1 image.");
      return;
    }

    setSubmitting(true);
    try {
      const url = editTarget
        ? `/api/Admin/gallery/${editTarget._id}`
        : "/api/Admin/gallery";
      const method = editTarget ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) { alert(data.message); return; }

      alert(editTarget ? "Gallery updated!" : "Gallery created!");
      closeForm();
      fetchGalleries();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this gallery? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/Admin/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { alert(data.message); return; }
      setGalleries((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete gallery.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  // ═══════════════════════════════════════════════════════════════════════
  return (
    <section className="min-h-screen bg-[#fdf9f7] py-12">
      <div className="max-w-6xl mx-auto px-5">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e2a55]">
              Gallery Management
            </h1>
            <p className="text-gray-500 mt-1">
              Create and manage photo galleries linked to exhibitions.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-md hover:scale-[1.02] transition"
          >
            <FaPlus />
            New Gallery
          </button>
        </div>

        {/* ── Gallery List ─────────────────────────────────────────────── */}
        {loadingList ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading galleries...</p>
          </div>
        ) : galleries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <FaImages className="text-6xl text-pink-200 mb-5" />
            <p className="text-xl font-semibold text-gray-500">No Galleries Yet</p>
            <p className="text-sm mt-2">
              Click <strong>New Gallery</strong> to add one.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                <tr>
                  <th className="text-left py-4 px-5 font-semibold text-[#1e2a55]">Gallery</th>
                  <th className="text-left py-4 px-5 font-semibold text-[#1e2a55]">Exhibition</th>
                  <th className="text-left py-4 px-5 font-semibold text-[#1e2a55]">Images</th>
                  <th className="text-left py-4 px-5 font-semibold text-[#1e2a55]">Created</th>
                  <th className="text-right py-4 px-5 font-semibold text-[#1e2a55]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {galleries.map((g) => (
                  <tr key={g._id} className="hover:bg-pink-50/30 transition">

                    {/* Title + thumbnail */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {g.images?.[0] && (
                          <img
                            src={g.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-pink-100 flex-shrink-0"
                          />
                        )}
                        <span className="font-medium text-[#1e2a55]">{g.title}</span>
                      </div>
                    </td>

                    {/* Linked exhibition */}
                    <td className="py-4 px-5">
                      {g.exhibitionId ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                          {g.exhibitionId.title || "Linked"}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Not linked</span>
                      )}
                    </td>

                    {/* Image count */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                        <FaImages className="text-xs" />
                        {g.images?.length ?? 0} photo{g.images?.length !== 1 ? "s" : ""}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 text-gray-500">{formatDate(g.createdAt)}</td>

                    {/* Actions */}
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(g)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-xs font-medium"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(g._id)}
                          disabled={deletingId === g._id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition text-xs font-medium disabled:opacity-50"
                        >
                          {deletingId === g._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ── Create / Edit Modal ───────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1e2a55]">
                {editTarget ? "Edit Gallery" : "Create New Gallery"}
              </h2>
              <button
                onClick={closeForm}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Exhibition Dropdown */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Link to Exhibition *
                </label>
                <div className="relative">
                  <FaChevronDown className="absolute right-4 top-3.5 text-gray-400 text-xs pointer-events-none" />
                  <select
                    required
                    value={form.exhibitionId}
                    onChange={(e) => setForm({ ...form, exhibitionId: e.target.value })}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition bg-white pr-10 text-gray-700"
                  >
                    <option value="">
                      {loadingExhibitions ? "Loading exhibitions..." : "— Select an Exhibition —"}
                    </option>
                    {exhibitions.map((ex) => (
                      <option key={ex._id} value={ex._id}>
                        {ex.title} {ex.date ? `(${ex.date})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                {exhibitions.length === 0 && !loadingExhibitions && (
                  <p className="text-xs text-orange-500 mt-1.5">
                    No exhibitions found. Create an exhibition first.
                  </p>
                )}
              </div>

              {/* Gallery Title */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Gallery Title *
                </label>
                <div className="relative">
                  <MdOutlineTitle className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Summer Exhibition 2026"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              </div>

              {/* Upload images */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Upload Images *{" "}
                  <span className="text-gray-400 font-normal">(minimum 5 recommended)</span>
                </label>

                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-purple-200 rounded-xl py-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/40 transition group">
                  <FaImages className="text-3xl text-purple-300 group-hover:text-purple-500 transition mb-2" />
                  <span className="text-sm text-gray-500 group-hover:text-purple-600 transition font-medium">
                    Click to upload images
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP — select multiple
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Preview grid */}
                {form.images.length > 0 && (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                      {form.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt=""
                            className="h-24 w-full object-cover rounded-xl shadow-sm border border-purple-100"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md"
                          >
                            <FaTimes />
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <FaCheckCircle className="text-green-400" />
                      {form.images.length} image{form.images.length !== 1 ? "s" : ""} ready
                    </p>
                  </>
                )}
              </div>

              {/* Footer buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-md hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      {editTarget ? "Saving..." : "Creating..."}
                    </span>
                  ) : editTarget ? "Save Changes" : "Create Gallery"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </section>
  );
}