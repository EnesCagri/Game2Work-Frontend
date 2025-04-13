import { Quiz, QuizQuestion } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Yazılım Geliştirme Temelleri",
    description:
      "Temel programlama kavramları ve yazılım geliştirme prensipleri hakkında kapsamlı bir değerlendirme.",
    difficulty: "Başlangıç",
    category: "Programlama",
    timeLimit: 45,
    questionCount: 30,
    rewards: {
      points: 100,
      badge: "Yazılım Çaylağı",
      certificate: "Yazılım Geliştirme Temel Sertifikası",
    },
    completionRate: 78,
    image: "/quizzes/software-basics.jpg",
  },
  {
    id: "2",
    title: "Veri Yapıları ve Algoritmalar",
    description:
      "İleri seviye algoritma problemleri ve veri yapıları üzerine zorlu bir sınav.",
    difficulty: "İleri",
    category: "Algoritma",
    timeLimit: 60,
    questionCount: 25,
    rewards: {
      points: 300,
      badge: "Algoritma Ustası",
    },
    completionRate: 45,
    image: "/quizzes/algorithms.jpg",
  },
  {
    id: "3",
    title: "Web Teknolojileri",
    description:
      "Modern web geliştirme teknolojileri ve framework'ler hakkında interaktif quiz.",
    difficulty: "Orta",
    category: "Web",
    timeLimit: 30,
    questionCount: 20,
    rewards: {
      points: 150,
      certificate: "Web Geliştirme Sertifikası",
    },
    completionRate: 65,
    image: "/quizzes/web-dev.jpg",
  },
  {
    id: "4",
    title: "JavaScript Temelleri",
    description:
      "JavaScript'in temel kavramları, veri tipleri ve fonksiyonlar hakkında kapsamlı bir değerlendirme.",
    difficulty: "Başlangıç",
    category: "Programlama",
    timeLimit: 40,
    questionCount: 25,
    rewards: {
      points: 120,
      badge: "JavaScript Çaylağı",
      certificate: "JavaScript Temel Sertifikası",
    },
    completionRate: 82,
    image: "/quizzes/javascript.jpg",
  },
  {
    id: "5",
    title: "React ve Modern Frontend",
    description:
      "React.js, state yönetimi ve modern frontend geliştirme pratikleri üzerine quiz.",
    difficulty: "Orta",
    category: "Web",
    timeLimit: 45,
    questionCount: 30,
    rewards: {
      points: 200,
      badge: "Frontend Uzmanı",
      certificate: "React Geliştirici Sertifikası",
    },
    completionRate: 58,
    image: "/quizzes/react.jpg",
  },
];

export const sampleQuestions: Record<string, QuizQuestion[]> = {
  "1": [
    {
      id: "1-1",
      question: "Aşağıdakilerden hangisi bir programlama paradigması değildir?",
      options: [
        "Nesne Yönelimli Programlama",
        "Fonksiyonel Programlama",
        "Veritabanı Programlama",
        "Prosedürel Programlama",
      ],
      correctAnswer: 2,
      explanation:
        "Veritabanı Programlama bir paradigma değil, veri yönetimi yaklaşımıdır.",
    },
    {
      id: "1-2",
      question: "Aşağıdakilerden hangisi bir değişken isimlendirme kuralıdır?",
      options: [
        "Değişken isimleri sayı ile başlayabilir",
        "Değişken isimleri boşluk içerebilir",
        "Değişken isimleri özel karakterlerle başlayabilir",
        "Değişken isimleri harf veya alt çizgi ile başlamalıdır",
      ],
      correctAnswer: 3,
      explanation:
        "Değişken isimleri harf veya alt çizgi ile başlamalıdır ve sayı ile başlayamaz.",
    },
  ],
  "2": [
    {
      id: "2-1",
      question:
        "Aşağıdaki sıralama algoritmalarından hangisi en iyi durumda O(n) karmaşıklığına sahiptir?",
      options: ["Quicksort", "Merge Sort", "Insertion Sort", "Bubble Sort"],
      correctAnswer: 2,
      explanation:
        "Insertion Sort, dizi zaten sıralıysa O(n) karmaşıklığına sahiptir.",
    },
  ],
};
