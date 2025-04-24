"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  Building2,
  Code2,
  Menu,
  X,
  Edit,
  Trash2,
  Plus,
  User,
  Calendar,
  Users,
  Briefcase,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import CRUDModal from "@/components/admin/CRUDModal";
import { useCRUDModal } from "@/hooks/useCRUDModal";
import type { DataCategory } from "@/hooks/useCRUDModal";

type Section =
  | "dashboard"
  | "blogs"
  | "games"
  | "companies"
  | "developers"
  | "users"
  | "events"
  | "courses"
  | "investors"
  | "jobs"
  | "kickstarter"
  | "tests";

// Import mock data
import blogsData from "@/data/db/blogs.json";
import gamesData from "@/data/db/games.json";
import companiesData from "@/data/db/companies.json";
import developersData from "@/data/db/developers.json";

const blogFields = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  { name: "author", label: "Author", type: "text" as const, required: true },
  { name: "date", label: "Date", type: "date" as const, required: true },
  { name: "image", label: "Cover Image", type: "image" as const },
  { name: "topic", label: "Topic", type: "text" as const, required: true },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea" as const,
    required: true,
  },
  {
    name: "content",
    label: "Content",
    type: "textarea" as const,
    required: true,
  },
  { name: "tags", label: "Tags", type: "text" as const },
];

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    isOpen,
    modalType,
    selectedData,
    title,
    openModal,
    closeModal,
    handleSubmit,
  } = useCRUDModal({
    onSubmit: (data) => {
      // Handle form submission
      console.log("Form submitted:", data);
    },
    category: activeSection as DataCategory,
  });

  const sections = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "developers", label: "Developers", icon: Code2 },
    { id: "users", label: "Users", icon: User },
    { id: "events", label: "Events", icon: Calendar },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "investors", label: "Investors", icon: Users },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "kickstarter", label: "Kickstarter", icon: HeartHandshake },
    { id: "tests", label: "Tests", icon: HelpCircle },
  ] as const;

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  className="bg-white/5 p-6 rounded-lg border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <section.icon className="w-8 h-8 mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    {section.label}
                  </h3>
                  <p className="text-gray-400">
                    Manage your {section.label.toLowerCase()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "blogs":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Blog Management</h2>
              <button
                onClick={() => openModal("create")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add New Blog
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogsData.map((blog) => (
                <motion.div
                  key={blog.id}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal("read", blog)}
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-400 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{blog.date}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("update", blog);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("delete", blog);
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "games":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Game Management</h2>
              <button
                onClick={() => openModal("create")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add New Game
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.games.map((game) => (
                <motion.div
                  key={game.id}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal("read", game)}
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-blue-600/20 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Rating: {game.rating}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("update", game);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("delete", game);
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "companies":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Company Management</h2>
              <button
                onClick={() => openModal("create")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add New Company
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companiesData.companies.map((company) => (
                <motion.div
                  key={company.id}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal("read", company)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{company.name}</h3>
                      <p className="text-gray-400">{company.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{company.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {company.size} employees
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("update", company);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("delete", company);
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "developers":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Developer Management</h2>
              <button
                onClick={() => openModal("create")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add New Developer
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developersData.developers.map((developer) => (
                <motion.div
                  key={developer.id}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal("read", developer)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={developer.image}
                        alt={developer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {developer.name}
                      </h3>
                      <p className="text-gray-400">{developer.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {developer.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-600/20 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {developer.stats.experience} years experience
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("update", developer);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("delete", developer);
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed lg:static w-64 h-full bg-gray-800 border-r border-white/10 z-40"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                  onClick={() => setActiveSection(section.id as Section)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} />
                  <span>{section.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>

      {/* CRUD Modal */}
      <CRUDModal
        isOpen={isOpen}
        onClose={closeModal}
        title={title}
        type={modalType}
        category={activeSection as DataCategory}
        data={selectedData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminPage;
