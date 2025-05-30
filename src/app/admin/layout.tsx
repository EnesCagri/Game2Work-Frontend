import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - GameToWork",
  description: "Admin dashboard for managing GameToWork content",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-900">{children}</div>;
}
