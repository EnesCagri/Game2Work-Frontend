"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GradientOrb } from "@/components/ui/gradient-orb";
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Download,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { MarkdownContent } from "@/components/ui/markdown-content";

// This would typically come from your database or API
const codeExample = {
  id: "1",
  title: "Unity'de El Bombası Scripti",
  description:
    "Unity'de gerçekçi el bombası fırlatma ve patlama sistemini fizik ve parçacık efektleriyle nasıl oluşturacağınızı öğrenin.",
  category: "Oynanış",
  difficulty: "orta",
  tags: ["Unity", "Fizik", "Parçacıklar", "C#"],
  author: {
    name: "Ahmet Yılmaz",
    avatar: "/akura.png",
  },
  createdAt: "2024-03-15",
  likes: 45,
  views: 120,
  coverImage: "/akura.png",
  snapshots: [
    "/Codes/GrandeTutorial/granade1.png",
    "/Codes/GrandeTutorial/granade2.png",
    "/Codes/GrandeTutorial/grande3.png",
  ],
  prerequisites: [
    "Unity ve C# temel bilgisi",
    "Unity 2022.3 veya daha yeni sürüm",
    "Rigidbody ve Collider bileşenleri hakkında bilgi",
  ],
  assets: [
    {
      name: "El Bombası Modeli",
      type: "3D Model",
      format: ".fbx",
      size: "2.5MB",
      link: "#",
    },
    {
      name: "Patlama Sesi",
      type: "Ses",
      format: ".wav",
      size: "1.2MB",
      link: "#",
    },
    {
      name: "Patlama Parçacık Efekti",
      type: "Parçacık Sistemi",
      format: ".unitypackage",
      size: "3.1MB",
      link: "#",
    },
  ],
  steps: [
    {
      title: "El Bombası Modelini Oluştur",
      content: {
        markdown: `### Model İmport İşlemi
1. Unity **Asset Store**'dan bir el bombası modeli indirin veya kendi modelinizi oluşturun
2. Modeli projenize import edin
3. Hierarchy penceresinde yeni bir obje oluşturun
4. Modeli bu objenin altına sürükleyin

### Model Ayarları
- Scale değerleri: x:1, y:1, z:1
- Pivot noktasının merkezde olduğunu kontrol edin
- Mesh Collider'ın doğru şekilde ayarlandığından emin olun

> **İpucu**: Modelin boyutunu test etmek için sahneye bir karakter modeli ekleyip karşılaştırabilirsiniz.`,
        notes: [
          "Bu adımda herhangi bir kod yazmanıza gerek yok",
          "Sadece modelinizin doğru import edildiğinden ve ölçeklendirildiğinden emin olun",
        ],
      },
      screenshots: [
        {
          url: "/Codes/GrandeTutorial/granade1.png",
          alt: "El bombası modeli Unity'de import edilmiş hali",
          description: "Unity'de import edilmiş el bombası modeli",
        },
      ],
    },
    {
      title: "Rigidbody Bileşeni Ekle",
      content: {
        markdown: `### Rigidbody Ekleme Adımları
1. Hierarchy'de el bombası objesini seçin
2. Inspector panelinde **Add Component** butonuna tıklayın
3. Arama kutusuna "Rigidbody" yazın ve seçin

### Önemli Ayarlar
Mass: 1.0
Drag: 0.1
Angular Drag: 0.05
Use Gravity: ✓
Is Kinematic: ✗
Interpolate: Interpolate
Collision Detection: Continuous

> **Not**: Collision Detection'ı Continuous olarak ayarlamak, yüksek hızlarda daha doğru çarpışma tespiti sağlar.`,
        notes: [
          "Inspector'da Rigidbody bileşenini ekleyin",
          "Tüm ayarları önerilen değerlere göre yapılandırın",
        ],
      },
      screenshots: [
        {
          url: "/Codes/GrandeTutorial/granade2.png",
          alt: "Rigidbody bileşeni ekleme",
          description: "Add Component menüsünden Rigidbody seçimi",
        },
        {
          url: "/Codes/GrandeTutorial/grande3.png",
          alt: "Rigidbody ayarları",
          description: "Rigidbody bileşeni ayarları",
        },
      ],
    },
    {
      title: "El Bombası Scriptini Oluştur",
      content: {
        markdown: `### Script Oluşturma
1. **Project** penceresinde **Scripts** klasörü oluşturun
2. Sağ tık > Create > C# Script > "ElBombasi" olarak adlandırın

### Değişkenler
- firlatmaGucu: Bombanın fırlatılma kuvveti
- patlamaYaricapi: Patlamanın etki alanı
- patlamaGucu: Patlama sonucu oluşan itme kuvveti
- patlamaGecikmesi: Bombanın patlama süresi

### Önemli Metodlar
- Start(): İlk fırlatma kuvvetini uygular
- Patla(): Patlama efektlerini ve fiziğini yönetir

> **İpucu**: Değişkenleri [Header] attribute'u ile gruplandırmak, Inspector'da daha düzenli bir görünüm sağlar.`,
        codeBlocks: [
          {
            title: "ElBombasi.cs",
            code: `using UnityEngine;

public class ElBombasi : MonoBehaviour
{
    [Header("El Bombası Ayarları")]
    public float firlatmaGucu = 10f;
    public float patlamaYaricapi = 5f;
    public float patlamaGucu = 700f;
    public float patlamaGecikmesi = 3f;
    
    [Header("Efektler")]
    public GameObject patlamaEfekti;
    public AudioClip patlamaSesi;
    
    private Rigidbody rb;
    private bool patladi = false;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rb.AddForce(transform.forward * firlatmaGucu, ForceMode.Impulse);
        Invoke("Patla", patlamaGecikmesi);
    }
    
    void Patla()
    {
        if (patladi) return;
        patladi = true;
        
        // Patlama efektini oluştur
        if (patlamaEfekti != null)
        {
            Instantiate(patlamaEfekti, transform.position, Quaternion.identity);
        }
        
        // Patlama sesini çal
        if (patlamaSesi != null)
        {
            AudioSource.PlayClipAtPoint(patlamaSesi, transform.position);
        }
        
        // Yakındaki nesnelere patlama gücü uygula
        Collider[] colliders = Physics.OverlapSphere(transform.position, patlamaYaricapi);
        foreach (Collider yakinNesne in colliders)
        {
            Rigidbody rb = yakinNesne.GetComponent<Rigidbody>();
            if (rb != null)
            {
                rb.AddExplosionForce(patlamaGucu, transform.position, patlamaYaricapi);
            }
        }
        
        // El bombasını yok et
        Destroy(gameObject);
    }
}`,
          },
        ],
      },
      screenshots: [
        {
          url: "/Codes/GrandeTutorial/grande4.png",
          alt: "Yeni script oluşturma",
          description: "Project penceresinde yeni C# script oluşturma",
        },
        {
          url: "/Codes/GrandeTutorial/grande5.png",
          alt: "Script Inspector görünümü",
          description: "Script Inspector'da değişkenlerin görünümü",
        },
      ],
    },
    {
      title: "Patlama Efektini Yapılandır",
      content: {
        markdown: `### Parçacık Sistemi Oluşturma
1. Hierarchy'de sağ tık > Effects > **Particle System**
2. Sistemi "PatlamaEfekti" olarak adlandırın

### Temel Ayarlar
Duration: 1
Looping: ✗
Start Lifetime: 0.5
Start Speed: 10
Start Size: 2
Start Color: Turuncu → Kırmızı (Gradient)
Simulation Space: World

### Modül Ayarları
1. **Emission**
   - Rate over Time: 0
   - Burst: Count 100, Time 0
   
2. **Shape**
   - Shape: Sphere
   - Radius: 0.1
   
3. **Color over Lifetime**
   - Gradient: Turuncu → Kırmızı → Saydam
   
4. **Size over Lifetime**
   - Curve: Başlangıçta büyük, sonda küçük

> **İpucu**: Test etmek için Play Mode'da Particle System'i manuel olarak tetikleyebilirsiniz.`,
        notes: [
          "Unity Editor'de parçacık sistemini oluşturun",
          "Tüm ayarları önerilen değerlere göre yapılandırın",
          "Test ederek görsel efektin istediğiniz gibi olduğundan emin olun",
        ],
      },
      screenshots: [
        {
          url: "/Codes/GrandeTutorial/granade6.png",
          alt: "Parçacık sistemi ayarları",
          description: "Parçacık sistemi Inspector ayarları",
        },
        {
          url: "/Codes/GrandeTutorial/granade7.png",
          alt: "Parçacık sistemi görünümü",
          description: "Parçacık sisteminin Scene görünümü",
        },
      ],
    },
  ],
  videoUrl: "https://www.youtube.com/embed/BYL6JtUdEY0?si=Pxf8qbG2pOBBjY7h",
  reviews: [
    {
      author: "Mehmet Yılmaz",
      avatar: "/akura.png",
      rating: 5,
      comment:
        "Harika öğretici! Adım adım talimatlar çok net ve kod mükemmel çalıştı.",
      date: "2024-03-16",
    },
    {
      author: "Ayşe Demir",
      avatar: "/crown.png",
      rating: 4,
      comment:
        "Çok yardımcı oldu, ancak parçacık sistemi ayarları hakkında daha fazla açıklama olabilirdi.",
      date: "2024-03-15",
    },
  ],
};

export default function CodeExamplePage({
  params,
}: {
  params: { id: string };
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(codeExample.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <GradientOrb
        color="#ef4442"
        position="top-right"
        size="lg"
        opacity={0.01}
      />
      <GradientOrb
        color="#ef4442"
        position="bottom-left"
        size="lg"
        opacity={0.01}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className={`mb-4 ${
              codeExample.difficulty === "başlangıç"
                ? "bg-green-900/20 border-green-500/50 text-green-400"
                : codeExample.difficulty === "orta"
                ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-400"
                : "bg-red-900/20 border-red-500/50 text-red-400"
            }`}
          >
            {codeExample.difficulty}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            {codeExample.title}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {codeExample.description}
          </p>
        </div>

        {/* Cover Image and Snapshots */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="md:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={codeExample.coverImage}
                alt={codeExample.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {codeExample.snapshots.map((snapshot, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={snapshot}
                  alt={`Görüntü ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites and Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Gereksinimler
            </h3>
            <ul className="space-y-2">
              {codeExample.prerequisites.map((prerequisite, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  {prerequisite}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Gerekli Dosyalar
            </h3>
            <div className="space-y-4">
              {codeExample.assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">{asset.name}</h4>
                    <p className="text-sm text-gray-400">
                      {asset.type} • {asset.format} • {asset.size}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={asset.link}>
                      <Download className="w-4 h-4 mr-2" />
                      İndir
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {codeExample.steps.map((step, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/20 border border-blue-500/50 flex items-center justify-center text-blue-400">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <div className="mb-4">
                    <MarkdownContent content={step.content.markdown} />
                  </div>

                  {/* Notes */}
                  {step.content.notes && step.content.notes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        Notlar
                      </h4>
                      <ul className="list-disc pl-6 text-gray-400">
                        {step.content.notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Screenshots */}
                  {step.screenshots && step.screenshots.length > 0 && (
                    <div className="mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {step.screenshots.map((screenshot, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={screenshot.url}
                                alt={screenshot.alt}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-sm text-gray-400 text-center">
                              {screenshot.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Code Blocks */}
                  {step.content.codeBlocks &&
                    step.content.codeBlocks.length > 0 && (
                      <div className="bg-gray-800 rounded-lg overflow-hidden">
                        {step.content.codeBlocks.map((codeBlock, idx) => (
                          <CodeBlock
                            key={idx}
                            code={codeBlock.code}
                            language="csharp"
                            showLineNumbers
                          />
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Preview */}
        {codeExample.videoUrl && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-4">Sonuç</h3>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                src={codeExample.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-4">Yorumlar</h3>
          <div className="space-y-4">
            {codeExample.reviews.map((review, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-white">{review.author}</h4>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-400">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className={`group ${isLiked ? "text-red-400" : "text-gray-400"}`}
              onClick={handleLike}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {likeCount} Beğeni
            </Button>
            <Button variant="outline" className="text-gray-400">
              <MessageCircle className="w-4 h-4 mr-2" />
              Yorum Yap
            </Button>
            <Button variant="outline" className="text-gray-400">
              <Share2 className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
