"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  //UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  GamepadIcon,
  BriefcaseIcon,
  BuildingIcon,
  GraduationCapIcon,
  UsersIcon,
  //BookOpenIcon,
  RocketIcon,
  CodeIcon,
  DollarSignIcon,
  ChevronDown,
  ChevronRight,
  //MessageSquareIcon,
  NewspaperIcon,
  CalendarIcon,
  SparklesIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Simüle edilmiş auth durumu - gerçek implementasyonda auth servisinden gelecek
const isAuthenticated = false;
const user = {
  name: "John Doe",
  image: "/avatars/placeholder.jpg",
};

// Single links
const singleLinks = [
  {
    name: "Oyunlar",
    href: "/games",
    icon: GamepadIcon,
  },
  {
    name: "İş İlanları",
    href: "/jobs",
    icon: BriefcaseIcon,
  },
  {
    name: "Eğitim",
    href: "/education",
    icon: GraduationCapIcon,
  },
  {
    name: "Kickstart",
    href: "/kickstarts",
    icon: RocketIcon,
  },
  {
    name: "Kod Kütüphanesi",
    href: "/code-library",
    icon: CodeIcon,
  },
];

// Grouped links
const groupedLinks = [
  {
    name: "Ekosistem",
    items: [
      {
        name: "Şirketler",
        href: "/companies",
        icon: BuildingIcon,
        description: "Oyun sektöründeki şirketler hakkında bilgi edinin",
      },
      {
        name: "Geliştiriciler",
        href: "/developers",
        icon: CodeIcon,
        description: "Oyun geliştiricileri ile tanışın ve iletişime geçin",
      },
      {
        name: "Yatırımcılar",
        href: "/investors",
        icon: DollarSignIcon,
        description: "Oyun yatırımcıları ve fonlama fırsatları",
      },
    ],
  },
  {
    name: "İçerik",
    items: [
      {
        name: "Topluluk",
        href: "/community",
        icon: UsersIcon,
        description: "Oyun sektörü profesyonelleri ile iletişime geçin",
      },
      {
        name: "Blog",
        href: "/blogs",
        icon: NewspaperIcon,
        description: "Oyun endüstrisi hakkında güncel haberler ve yazılar",
      },
      {
        name: "Etkinlikler",
        href: "/events",
        icon: CalendarIcon,
        description: "Oyun dünyasındaki etkinlikleri keşfedin",
      },
      {
        name: "Quizler",
        href: "/quizzes",
        icon: SparklesIcon,
        description: "Oyun sektöründe kendinizi test edin",
      },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCollapsibles, setOpenCollapsibles] = useState<
    Record<string, boolean>
  >({});

  const toggleCollapsible = (groupName: string) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/20 border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Image
                src="/GameToWorkLogo.png"
                alt="GameToWork"
                width={32}
                height={32}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              GameToWork
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Single Links */}
                {singleLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="flex items-center space-x-1">
                          <link.icon className="w-4 h-4" />
                          <span>{link.name}</span>
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* Grouped Links */}
                {groupedLinks.map((group) => (
                  <NavigationMenuItem key={group.name}>
                    <NavigationMenuTrigger className="flex items-center space-x-1">
                      <span>{group.name}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                        {group.items.map((item) => (
                          <li key={item.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 hover:text-slate-50 focus:bg-slate-700 focus:text-slate-50"
                              >
                                <div className="flex items-center space-x-2">
                                  <item.icon className="h-5 w-5" />
                                  <div className="text-sm font-medium leading-none">
                                    {item.name}
                                  </div>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/generative">
              <Button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-white font-bold relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-red-500/50 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
                <div className="relative flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span>Code Goblin</span>
                </div>
              </Button>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all duration-300">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="ghost" size="icon">
                  <LogOutIcon className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost">Giriş Yap</Button>
                <Link href="/register">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XIcon className="w-6 h-6 text-gray-300" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu with Collapsibles */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-2">
              {/* Single Links */}
              {singleLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800/50"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}

              {/* Grouped Links with Collapsibles */}
              {groupedLinks.map((group) => (
                <Collapsible
                  key={group.name}
                  open={openCollapsibles[group.name]}
                  onOpenChange={() => toggleCollapsible(group.name)}
                  className="border border-gray-800 rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50">
                    <span>{group.name}</span>
                    {openCollapsibles[group.name] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-2 pb-2 pt-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-gray-300 hover:text-white flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800/50"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-800">
                  <Link href="/generative" className="w-full">
                    <Button className="w-full justify-start bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-pink-500/50 to-red-500/50 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
                      <div className="relative flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5" />
                        <span>Code Goblin</span>
                      </div>
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start">
                    Giriş Yap
                  </Button>
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
                    Kayıt Ol
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-4 pt-4 border-t border-gray-800">
                  <Link href="/profile" className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-300">{user.name}</span>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <LogOutIcon className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
