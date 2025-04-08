import FeaturesGrid from "@/components/FeaturesGrid";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import About from "@/components/About";
import Ecosystem from "@/components/Ecosystem";
import MemberCards from "@/components/MemberCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black" />

        {/* Content */}
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Bağımsız Oyun Geliştiricilerini Hayallerine Kavuşturuyoruz
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Yeteneğini dünyaya göster, projelerini sergile ve oyun dünyasında
              fark yarat!
            </p>
            <p className="text-gray-400">
              Discover innovative companies and explore exciting career
              opportunities
            </p>
            <p className="text-lg md:text-xl text-gray-400 italic mb-8">
              "Bağımsız geliştiriciler için, bağımsız ruhlarla..."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6"
              >
                Hemen Başla
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-black/50"
              >
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </section>
      <About />
      <Statistics />
      <FeaturesGrid />
      <Ecosystem />
      <MemberCards />
    </main>
  );
}
