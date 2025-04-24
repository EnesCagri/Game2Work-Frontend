"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import type { DataCategory } from "@/hooks/useCRUDModal";

interface CRUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "create" | "read" | "update" | "delete";
  category: DataCategory;
  data?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const categoryFields: Record<
  DataCategory,
  Array<{ name: string; label: string; type: "text" | "textarea" | "image" }>
> = {
  blogs: [
    { name: "title", label: "Title", type: "text" },
    { name: "author", label: "Author", type: "text" },
    { name: "date", label: "Date", type: "text" },
    { name: "image", label: "Cover Image", type: "image" },
    { name: "topic", label: "Topic", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "content", label: "Content", type: "textarea" },
    { name: "tags", label: "Tags", type: "text" },
  ],
  games: [
    { name: "title", label: "Title", type: "text" },
    { name: "developer", label: "Developer", type: "text" },
    { name: "releaseDate", label: "Release Date", type: "text" },
    { name: "image", label: "Cover Image", type: "image" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "genres", label: "Genres", type: "text" },
    { name: "platforms", label: "Platforms", type: "text" },
    { name: "rating", label: "Rating", type: "text" },
  ],
  companies: [
    { name: "name", label: "Name", type: "text" },
    { name: "logo", label: "Logo", type: "image" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "location", label: "Location", type: "text" },
    { name: "size", label: "Company Size", type: "text" },
    { name: "website", label: "Website", type: "text" },
  ],
  developers: [
    { name: "name", label: "Name", type: "text" },
    { name: "image", label: "Profile Image", type: "image" },
    { name: "role", label: "Role", type: "text" },
    { name: "skills", label: "Skills", type: "text" },
    { name: "experience", label: "Experience", type: "text" },
    { name: "bio", label: "Bio", type: "textarea" },
  ],
  users: [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "avatar", label: "Avatar", type: "image" },
  ],
  events: [
    { name: "title", label: "Title", type: "text" },
    { name: "date", label: "Date", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "image", label: "Image", type: "image" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  courses: [
    { name: "title", label: "Title", type: "text" },
    { name: "instructor", label: "Instructor", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "image", label: "Image", type: "image" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  investors: [
    { name: "name", label: "Name", type: "text" },
    { name: "logo", label: "Logo", type: "image" },
    { name: "type", label: "Type", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  jobs: [
    { name: "title", label: "Title", type: "text" },
    { name: "company", label: "Company", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "type", label: "Type", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "requirements", label: "Requirements", type: "textarea" },
  ],
  kickstarter: [
    { name: "title", label: "Title", type: "text" },
    { name: "creator", label: "Creator", type: "text" },
    { name: "goal", label: "Goal", type: "text" },
    { name: "image", label: "Image", type: "image" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  tests: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "questions", label: "Questions", type: "textarea" },
  ],
};

export default function CRUDModal({
  isOpen,
  onClose,
  title,
  type,
  category,
  data = {},
  onSubmit,
}: CRUDModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(data);
  const prevDataRef = useRef<Record<string, any>>(data);

  useEffect(() => {
    if (
      isOpen &&
      JSON.stringify(data) !== JSON.stringify(prevDataRef.current)
    ) {
      setFormData(data);
      prevDataRef.current = data;
    }
  }, [isOpen, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const fields = categoryFields[category] || [];

  const renderImage = (src: string | null | undefined, alt: string) => {
    if (!src) return null;
    return (
      <div className="relative w-full h-48">
        <Image src={src} alt={alt} fill className="object-cover rounded-lg" />
      </div>
    );
  };

  if (type === "read") {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name} className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 font-semibold text-gray-300">
                      {field.label}
                    </div>
                    <div className="col-span-2">
                      {field.type === "image" ? (
                        renderImage(formData[field.name], field.label)
                      ) : (
                        <div className="text-gray-200">
                          {formData[field.name] || "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (type === "delete") {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  ) : field.type === "image" ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {renderImage(formData[field.name], field.label)}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
                >
                  {type === "create" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
