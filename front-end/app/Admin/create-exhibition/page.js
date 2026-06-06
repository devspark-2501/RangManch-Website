"use client";

import { useState } from "react";

export default function CreateExhibition() {
const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
title: "",
location: "",
date: "",
time: "",
description: "",
status: "coming-soon",
image: "",
gallery: [],
});

const convertToBase64 = (file) => {
return new Promise((resolve, reject) => {
const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);

  reader.onerror = (error) => reject(error);
});


};

const handleCoverImage = async (e) => {
const file = e.target.files[0];

if (!file) return;

const base64 = await convertToBase64(file);

setForm((prev) => ({
  ...prev,
  image: base64,
}));


};

const handleGalleryImages = async (e) => {
const files = Array.from(e.target.files);


const images = [];

for (const file of files) {
  const base64 = await convertToBase64(file);
  images.push(base64);
}

setForm((prev) => ({
  ...prev,
  gallery: images,
}));


};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const res = await fetch("/api/exhibitions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Exhibition Created Successfully");

  setForm({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    status: "coming-soon",
    image: "",
    gallery: [],
  });
} catch (error) {
  console.error(error);
  alert("Something went wrong");
} finally {
  setLoading(false);
}


};

return ( <section className="min-h-screen bg-[#fdf9f7] py-12"> <div className="max-w-5xl mx-auto px-5">


    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

      <h1 className="text-4xl font-bold text-[#1e2a55] mb-2">
        Create Exhibition
      </h1>

      <p className="text-gray-500 mb-8">
        Add a new exhibition that will appear on the website.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>
          <label className="block mb-2 font-medium">
            Exhibition Title
          </label>

          <input
            type="text"
            required
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Location
          </label>

          <input
            type="text"
            required
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="text"
              required
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Time
            </label>

            <input
              type="text"
              required
              value={form.time}
              onChange={(e) =>
                setForm({
                  ...form,
                  time: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="open">
              Booking Open
            </option>

            <option value="coming-soon">
              Coming Soon
            </option>

            <option value="expired">
              Event Completed
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="5"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 resize-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImage}
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-4 h-40 rounded-xl object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Gallery Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGalleryImages}
          />

          <div className="grid grid-cols-3 gap-4 mt-4">

            {form.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="h-28 w-full object-cover rounded-xl"
              />
            ))}

          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600"
        >
          {loading
            ? "Creating Exhibition..."
            : "Create Exhibition"}
        </button>

      </form>

    </div>
  </div>
</section>


);
}
