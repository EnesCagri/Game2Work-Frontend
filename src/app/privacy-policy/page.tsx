"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">
        Gizlilik Politikası
      </h1>

      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Giriş</h2>
          <p>
            GameToWork olarak, gizliliğinize saygı duyuyor ve kişisel
            verilerinizin korunmasına önem veriyoruz. Bu gizlilik politikası,
            web sitemizi kullanırken hangi bilgileri topladığımızı ve bu
            bilgileri nasıl kullandığımızı açıklar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            2. Toplanan Bilgiler
          </h2>
          <p>Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Ad, e-posta adresi ve iletişim bilgileri</li>
            <li>Kullanıcı hesap bilgileri</li>
            <li>Oyun tercihleri ve etkileşimleri</li>
            <li>Teknik bilgiler (IP adresi, tarayıcı türü, cihaz bilgileri)</li>
            <li>
              Çerezler ve benzer teknolojiler aracılığıyla toplanan bilgiler
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            3. Bilgilerin Kullanımı
          </h2>
          <p>Topladığımız bilgileri aşağıdaki amaçlar için kullanıyoruz:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
            <li>Kullanıcı deneyimini kişiselleştirmek</li>
            <li>Güvenliği sağlamak ve dolandırıcılığı önlemek</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            <li>İletişim ve destek hizmetleri sunmak</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            4. Bilgi Paylaşımı
          </h2>
          <p>
            Kişisel bilgilerinizi üçüncü taraflarla yalnızca aşağıdaki
            durumlarda paylaşırız:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Yasal zorunluluk durumunda</li>
            <li>Hizmet sağlayıcılarımızla (veri işleme, hosting vb.)</li>
            <li>İş ortaklarımızla (oyun geliştiricileri, platformlar vb.)</li>
            <li>Kullanıcı izni olduğunda</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            5. Veri Güvenliği
          </h2>
          <p>
            Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve
            organizasyonel önlemleri alıyoruz. Bu önlemler şunları içerir:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>SSL şifreleme</li>
            <li>Güvenli veri depolama</li>
            <li>Düzenli güvenlik güncellemeleri</li>
            <li>Erişim kontrolü ve yetkilendirme</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            6. Kullanıcı Hakları
          </h2>
          <p>Kullanıcılarımız aşağıdaki haklara sahiptir:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Kişisel verilerine erişim</li>
            <li>Verilerinin düzeltilmesi veya silinmesi</li>
            <li>Veri işlemeye itiraz etme</li>
            <li>Veri taşınabilirliği</li>
            <li>İşleme kısıtlama talep etme</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Çerezler</h2>
          <p>
            Web sitemizde çerezler kullanıyoruz. Çerezler, web sitesi
            deneyiminizi geliştirmek ve hizmetlerimizi daha iyi sunmak için
            kullanılır. Çerez tercihlerinizi tarayıcı ayarlarınızdan
            yönetebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. İletişim</h2>
          <p>
            Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa,
            lütfen bizimle iletişime geçin:
          </p>
          <div className="mt-2">
            <p>E-posta: privacy@gametowork.com</p>
            <p>Adres: [Şirket Adresi]</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            9. Güncellemeler
          </h2>
          <p>
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli
            değişiklikler olması durumunda, kullanıcılarımızı bilgilendireceğiz.
          </p>
          <p className="mt-2">
            Son güncelleme tarihi: {new Date().toLocaleDateString("tr-TR")}
          </p>
        </section>
      </div>
    </div>
  );
}
