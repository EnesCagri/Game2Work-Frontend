"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">GameToWork</h3>
            <p className="text-sm">
              Oyun geliştirme ve oyun endüstrisi için kapsamlı bir platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/games" className="hover:text-white transition">
                  Oyunlar
                </Link>
              </li>
              <li>
                <Link
                  href="/kickstarts"
                  className="hover:text-white transition"
                >
                  Kickstarts
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="hover:text-white transition"
                >
                  Geliştiriciler
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition">
                  Topluluk
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kaynaklar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:text-white transition">
                  Eğitimler
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition">
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  İş İlanları
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} GameToWork. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
