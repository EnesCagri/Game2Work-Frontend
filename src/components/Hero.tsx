import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient and overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-black" />

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-red-500 font-semibold text-2xl md:text-3xl mb-4">
            GİRİŞİMCİLİK ARTIK BİR OYUN
          </h2>

          <h1 className="text-5xl md:text-7xl font-bold text-red-600">
            KAZANMAYA
            <br />
            HAZIR MISIN?
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Geliştiriciler, yatırımcılar ve oyun tutkunları
            <br />
            Game To Work'te buluşuyor.
          </p>
          <p className="text-base md:text-lg text-gray-400 font-light tracking-wide">
            Projeni tanıt, destek al, işbirliği kur ve büyü
          </p>

          <div className="pt-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6"
            >
              Hemen Keşfet
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
  );
}
