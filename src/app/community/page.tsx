"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GradientOrb } from "@/components/ui/gradient-orb";
import {
  MessageSquare,
  Users,
  User,
  Settings,
  Plus,
  Search,
  Bell,
  Mail,
  BookOpen,
  Rocket,
  LogOut,
  Mic,
  Headphones,
  Video,
  Code,
  FileText,
  Trophy,
  Calendar,
  Kanban,
  Bot,
  Terminal,
  Gamepad,
  Trophy as BadgeIcon,
  Star,
  Heart,
  ThumbsUp,
  Smile,
  Image as ImageIcon,
  File,
  Video as VideoIcon,
  Code2,
  Layout,
  Palette,
  Music,
  Book,
  Briefcase,
  Lightbulb,
  Zap,
  Shield,
  Award,
  Crown,
  Home,
  Grid,
  List,
  Compass,
  TrendingUp,
  Users2,
  MessageCircle,
  FileEdit,
  Projector,
  Brain,
  GraduationCap,
  Trophy as TrophyIcon,
  BarChart2,
  Settings2,
  UserPlus,
  FolderPlus,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

// Types
type Server = {
  id: number;
  name: string;
  image: string;
  category: string;
  unread?: number;
  channels: Channel[];
};

type Channel = {
  id: number;
  name: string;
  type: "text" | "voice" | "resource" | "showcase" | "mentorship";
  unread?: number;
  lastMessage?: string;
};

type User = {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away" | "dnd";
  role: string;
  level: number;
  badges: string[];
};

// Mock Data
const mockServers: Server[] = [
  {
    id: 1,
    name: "Game Dev Hub",
    image: "/servers/game-dev.jpg",
    category: "Development",
    unread: 3,
    channels: [
      {
        id: 1,
        name: "general",
        type: "text",
        lastMessage: "Welcome to Game Dev Hub!",
      },
      { id: 2, name: "help-desk", type: "text", unread: 2 },
      { id: 3, name: "voice-chat", type: "voice" },
      { id: 4, name: "resources", type: "resource" },
      { id: 5, name: "showcase", type: "showcase" },
    ],
  },
  {
    id: 2,
    name: "Indie Game Studio",
    image: "/servers/indie-studio.jpg",
    category: "Studio",
    channels: [
      { id: 1, name: "general", type: "text" },
      { id: 2, name: "brainstorming", type: "voice" },
      { id: 3, name: "project-management", type: "text" },
    ],
  },
];

const mockUsers: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    status: "online",
    role: "Game Developer",
    level: 42,
    badges: ["Unity Expert", "Community Leader"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    status: "away",
    role: "UI/UX Designer",
    level: 35,
    badges: ["Design Guru", "Mentor"],
  },
];

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
  gradient: string;
}

const dashboardCards: DashboardCard[] = [
  {
    id: "create-blog",
    title: "Create Blog",
    description: "Share your knowledge and experiences with the community",
    icon: <FileEdit className="h-8 w-8" />,
    route: "/community/create-blog",
    color: "from-purple-500 to-blue-500",
    gradient: "bg-gradient-to-br",
  },
  {
    id: "start-project",
    title: "Start Project",
    description: "Launch your game development project and find collaborators",
    icon: <Projector className="h-8 w-8" />,
    route: "/community/start-project",
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br",
  },
  {
    id: "find-mentor",
    title: "Find Mentor",
    description: "Connect with experienced game developers for guidance",
    icon: <GraduationCap className="h-8 w-8" />,
    route: "/community/find-mentor",
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br",
  },
  {
    id: "join-gamejam",
    title: "Join Game Jam",
    description: "Participate in exciting game development challenges",
    icon: <TrophyIcon className="h-8 w-8" />,
    route: "/community/game-jams",
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-br",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Track your community engagement and growth",
    icon: <BarChart2 className="h-8 w-8" />,
    route: "/community/analytics",
    color: "from-pink-500 to-red-500",
    gradient: "bg-gradient-to-br",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Customize your community experience",
    icon: <Settings2 className="h-8 w-8" />,
    route: "/community/settings",
    color: "from-gray-500 to-gray-700",
    gradient: "bg-gradient-to-br",
  },
];

export default function CommunityDashboard() {
  const [selectedServer, setSelectedServer] = useState<Server | null>(
    mockServers[0]
  );
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [activeView, setActiveView] = useState<
    "servers" | "dms" | "dashboard" | "notifications"
  >("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Community Dashboard</h2>
              <p className="text-gray-400">
                Welcome to your community hub. Choose an action to get started.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.route}
                  className={`${card.gradient} ${card.color} p-6 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="p-2 bg-white/10 rounded-lg w-fit">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold">{card.title}</h3>
                      <p className="text-sm text-gray-200">
                        {card.description}
                      </p>
                    </div>
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      case "servers":
        return (
          <div className="p-6">
            {selectedChannel ? (
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Channel Content */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/avatars/user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">John Doe</span>
                        <span className="text-sm text-gray-400">
                          Today at 2:30 PM
                        </span>
                      </div>
                      <p className="mt-1">
                        Welcome to the channel! Feel free to introduce yourself
                        and share your projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Welcome to Game2Work Community
                  </h3>
                  <p className="text-gray-400">
                    Select a channel to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Sidebar - Navigation */}
      <div className="w-20 bg-gray-900 flex flex-col items-center py-4 border-r border-gray-800">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${
              activeView === "dashboard" ? "bg-gray-800" : ""
            }`}
            onClick={() => setActiveView("dashboard")}
          >
            <Home className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${
              activeView === "servers" ? "bg-gray-800" : ""
            }`}
            onClick={() => setActiveView("servers")}
          >
            <Users className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${activeView === "dms" ? "bg-gray-800" : ""}`}
            onClick={() => setActiveView("dms")}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-auto space-y-2">
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Settings className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Top Bar */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">
              {activeView === "dashboard"
                ? "Dashboard"
                : activeView === "servers"
                ? "Servers"
                : activeView === "dms"
                ? "Direct Messages"
                : ""}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-64 bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>

      {/* Right Sidebar - Users & Activity */}
      <div className="w-60 bg-gray-900 border-l border-gray-800 p-4">
        <div className="space-y-4">
          <h3 className="font-bold">Online Members</h3>
          <div className="space-y-2">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                        ? "bg-yellow-500"
                        : user.status === "dnd"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      Lvl {user.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-800">
            <h3 className="font-bold mb-2">Recent Activity</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <p className="text-gray-400">New project shared in #showcase</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Game jam starting soon!</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
