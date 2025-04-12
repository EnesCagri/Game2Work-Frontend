import FeaturesGrid from "@/components/FeaturesGrid";
import Statistics from "@/components/Statistics";
import About from "@/components/About";
import Ecosystem from "@/components/Ecosystem";
import MemberCards from "@/components/MemberCards";
import Hero from "@/components/Hero";
import MediaSignup from "@/components/MediaSignup";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Ecosystem />
      <FeaturesGrid />
      <MemberCards />
      <MediaSignup />
    </main>
  );
}
