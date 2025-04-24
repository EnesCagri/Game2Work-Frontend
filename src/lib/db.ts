import {
  jobs,
  users,
  companies,
  applications,
  tests,
  certifications,
  games,
  courses,
  developers,
} from "@/data/db";
import investorsData from "@/data/db/investors.json";
import _blogsData from "@/data/db/blogs.json";
const blogsData: Blog[] = _blogsData;

// Add type for playerCount parsing
type PlayerCount = {
  count: number;
  multiplier: number;
};

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  stats: {
    projects: number;
    awards: number;
    experience: number;
  };
}

interface DevelopersData {
  developers: Member[];
}

interface Achievement {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface Investor {
  id: number;
  name: string;
  type: string;
  level: number;
  image: string;
  description: string;
  investments: number;
  totalFunds: number;
  achievements: Achievement[];
  focus: string[];
  location: string;
  founded: string;
}

interface InvestorsData {
  investors: Investor[];
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

type Blog = {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  topic: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
  authorAvatar: string;
  likes: number;
  comments: Comment[];
};

export interface DbService {
  // Jobs
  getJobs: () => Promise<typeof jobs.jobs>;
  getJobById: (id: number) => Promise<(typeof jobs.jobs)[0] | undefined>;
  getJobsByCompany: (companyId: number) => Promise<typeof jobs.jobs>;
  getSimilarJobs: (jobId: number) => Promise<typeof jobs.jobs>;

  // Companies
  getCompanies: () => Promise<typeof companies.companies>;
  getCompanyById: (
    id: number
  ) => Promise<(typeof companies.companies)[0] | undefined>;

  // Users
  getUserById: (id: number) => Promise<(typeof users.jobs)[0] | undefined>;
  getUserApplications: (
    userId: number
  ) => Promise<typeof applications.applications>;

  // Applications
  createApplication: (
    application: Omit<(typeof applications.applications)[0], "id">
  ) => Promise<(typeof applications.applications)[0]>;
  updateApplicationStatus: (id: number, status: string) => Promise<void>;

  // Tests
  getTestById: (id: number) => Promise<(typeof tests.tests)[0] | undefined>;
  getTestsByJob: (jobId: number) => Promise<typeof tests.tests>;

  // Certifications
  getCertificationById: (
    id: number
  ) => Promise<(typeof certifications.certifications)[0] | undefined>;

  // Games
  getGames: () => Promise<typeof games.games>;
  getGameById: (id: string) => Promise<(typeof games.games)[0] | undefined>;
  getGamesByGenre: (genre: string) => Promise<typeof games.games>;
  getGamesByPlatform: (platform: string) => Promise<typeof games.games>;
  getFreeGames: () => Promise<typeof games.games>;
  getMostPlayedGames: () => Promise<typeof games.games>;
  getRecentlyPlayedGames: () => Promise<typeof games.games>;
  getKickstarts: () => Promise<any[]>;

  // Courses
  getCourses: () => Promise<typeof courses.courses>;
  getCourseById: (
    id: number
  ) => Promise<(typeof courses.courses)[0] | undefined>;
  getCoursesByField: (field: string) => Promise<typeof courses.courses>;
  getCoursesByDifficulty: (
    difficulty: string
  ) => Promise<typeof courses.courses>;
  getCoursesByTutor: (tutorName: string) => Promise<typeof courses.courses>;

  // Developers
  getDevelopers: () => Promise<Member[]>;
  getDeveloperById: (id: number) => Promise<Member | undefined>;
  getDevelopersByRole: (role: string) => Promise<Member[]>;
  getDevelopersByRarity: (rarity: string) => Promise<Member[]>;

  // Investors
  getInvestors: () => Promise<Investor[]>;
  getInvestorById: (id: number) => Promise<Investor | null>;
  getInvestorsByType: (type: string) => Promise<Investor[]>;
  getInvestorsByLevel: (level: number) => Promise<Investor[]>;

  // Blogs
  getBlogs: () => Promise<Blog[]>;
  getBlogById: (id: number) => Promise<Blog | null>;
  getBlogsByTopic: (topic: string) => Promise<Blog[]>;
  getBlogsByTag: (tag: string) => Promise<Blog[]>;
  createBlog: (blog: Omit<Blog, "id" | "likes" | "comments">) => Promise<Blog>;

  // Auth
  register: (data: any) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  getCurrentUser: () => any;
  updateProfile: (userId: number, profileData: any) => Promise<any>;
  updateRoles: (userId: number, roles: string[]) => Promise<any>;
}

export class MockDbService implements DbService {
  private static instance: MockDbService;

  // Singleton pattern to ensure we only have one instance
  public static getInstance(): MockDbService {
    if (!MockDbService.instance) {
      MockDbService.instance = new MockDbService();
    }
    return MockDbService.instance;
  }

  private courses = [
    {
      id: 1,
      title: "Unity Game Development Fundamentals",
      description:
        "Learn the basics of Unity game development, from setting up your first project to creating simple games.",
      descriptionImages: [
        "/Education/course1-desc1.jpg",
        "/Education/course1-desc2.jpg",
        "/Education/course1-desc3.jpg",
      ],
      thumbnail: "/Education/course1.jpg",
      field: "Game Development",
      difficulty: "Beginner",
      duration: "8 weeks",
      rating: 4.8,
      price: 49.99,
      originalPrice: 199.99,
      lectures: 48,
      language: "English",
      technologies: ["Unity", "C#"],
      previewVideo: "LOhfqjmasi0?si=6ut0e6CdPm0f2l7j", // Example YouTube video ID
      learningObjectives: [
        "Build your own RTS game in Unity, from units to buildings to upgrades and more",
        "Create unit AI that reacts to player input using behaviour trees (no magic, just logic)",
        "Develop a config-driven setup to add new units fast—no spaghetti code here",
        "Hook up an event bus system so your units can talk without yelling across the codebase",
      ],
      benefits: [
        {
          title: "30 Day Money-Back Guarantee",
          description: "100% refund, no questions asked.",
        },
        {
          title: "Lifetime Access",
          description: "Access your content on any device, at any time.",
        },
        {
          title: "Teaching Support",
          description: "Never get stuck with our teaching assistants on call.",
        },
      ],
      curriculum: [
        {
          title: "Introduction and Setup",
          lessons: [
            {
              title: "Welcome to the Course",
              duration: "01:39",
              type: "video",
              isPreview: true,
              isCompleted: true,
              videoUrl: "ke5KpqcoiIU?si=h64b5ALBjULqYcoM",
              thumbnail: "/Education/lesson1-thumb.jpg",
            },
            {
              title: "Initial Project Setup",
              duration: "06:27",
              type: "video",
              isPreview: false,
              isLocked: true,
              thumbnail: "/Education/lesson2-thumb.jpg",
            },
            {
              title: "Community & Support",
              type: "text",
              duration: "5 min read",
              isPreview: true,
              content:
                "Join our Discord community for support and collaboration. Learn how to get help and share your progress with fellow students.",
            },
            {
              title: "Project Files Download",
              type: "resource",
              isLocked: true,
              resourceType: "zip",
              size: "156 MB",
            },
          ],
        },
        {
          title: "Camera Controls",
          lessons: [
            {
              title: "Cinemachine Camera",
              duration: "07:55",
              type: "video",
              isPreview: false,
              isLocked: true,
              thumbnail: "/Education/lesson3-thumb.jpg",
              prerequisites: ["Initial Project Setup"],
            },
            {
              title: "Top-Down Keyboard Movement",
              duration: "07:46",
              type: "video",
              isPreview: true,
              videoUrl: "LOhfqjmasi0?si=6ut0e6CdPm0f2l7j",
              thumbnail: "/Education/lesson4-thumb.jpg",
            },
            {
              title: "Camera Zoom",
              duration: "14:09",
              type: "video",
              isLocked: true,
              thumbnail: "/Education/lesson5-thumb.jpg",
            },
            {
              title: "Camera Controls Documentation",
              type: "text",
              duration: "10 min read",
              isLocked: true,
              content:
                "Detailed documentation about camera control implementation and best practices.",
            },
            {
              title: "Camera Setup Quiz",
              type: "quiz",
              isLocked: true,
              questionCount: 5,
              passingScore: 80,
            },
          ],
        },
        {
          title: "Level Design",
          lessons: [
            {
              title: "Mouse Edge Panning",
              duration: "12:27",
              type: "video",
              isLocked: true,
              thumbnail: "/Education/lesson6-thumb.jpg",
            },
            {
              title: "Level Bounds",
              duration: "07:04",
              type: "video",
              isLocked: true,
              thumbnail: "/Education/lesson7-thumb.jpg",
            },
            {
              title: "Level Design Document",
              type: "assignment",
              isLocked: true,
              deadline: "2 weeks",
              description:
                "Create a detailed level design document for your game.",
            },
          ],
        },
      ],
      reviews: [
        {
          id: 1,
          user: {
            name: "Ahmet Yılmaz",
            avatar: "/avatars/user1.jpg",
          },
          rating: 5,
          comment:
            "Harika bir kurs! Unity'de RTS oyun geliştirme konusunda çok şey öğrendim. Özellikle yapay zeka ve davranış ağaçları bölümleri çok faydalıydı.",
          date: "2024-03-15",
          likes: 24,
          helpful: true,
        },
        {
          id: 2,
          user: {
            name: "Mehmet Demir",
            avatar: "/avatars/user2.jpg",
          },
          rating: 4,
          comment:
            "Detaylı ve kapsamlı bir kurs. Eğitmenin anlatım tarzı çok iyi. Sadece bazı konular biraz daha detaylı anlatılabilirdi.",
          date: "2024-03-10",
          likes: 12,
          helpful: false,
        },
      ],
      tutor: {
        name: "John Smith",
        avatar: "/tutors/john-smith.jpg",
        expertise: "Game Developer with 10+ years of experience",
        bio: "I graduated college with a Software Engineering degree after always tinkering with custom map editors in games like StarCraft and CounterStrike. I've been programming since I was old enough to understand how to piece together some Visual Basic.",
      },
      students: 1234,
    },
    {
      id: 2,
      title: "Advanced Unity Game Development",
      description:
        "Take your Unity skills to the next level with advanced game development techniques and patterns.",
      descriptionImages: [
        "/Education/course2-desc1.jpg",
        "/Education/course2-desc2.jpg",
      ],
      thumbnail: "/Education/course2.jpg",
      field: "Game Development",
      difficulty: "Advanced",
      duration: "12 weeks",
      rating: 4.9,
      price: 79.99,
      originalPrice: 299.99,
      lectures: 72,
      language: "English",
      technologies: ["Unity", "C#", "Shader Graph"],
      previewVideo: "LOhfqjmasi0?si=6ut0e6CdPm0f2l7j",
      learningObjectives: [
        "Master advanced Unity features and optimization techniques",
        "Create custom shaders and visual effects",
        "Implement advanced AI and pathfinding systems",
        "Build a complete multiplayer game framework",
      ],
      benefits: [
        {
          title: "30 Day Money-Back Guarantee",
          description: "100% refund, no questions asked.",
        },
        {
          title: "Lifetime Access",
          description: "Access your content on any device, at any time.",
        },
        {
          title: "Teaching Support",
          description: "Never get stuck with our teaching assistants on call.",
        },
      ],
      curriculum: [
        {
          title: "Advanced Unity Features",
          lessons: [
            {
              title: "Custom Shader Development",
              duration: "15:20",
              type: "video",
              isPreview: true,
              videoUrl: "LOhfqjmasi0?si=6ut0e6CdPm0f2l7j",
              thumbnail: "/Education/lesson8-thumb.jpg",
            },
            {
              title: "Advanced Particle Systems",
              duration: "18:45",
              type: "video",
              isLocked: true,
              thumbnail: "/Education/lesson9-thumb.jpg",
            },
            {
              title: "Shader Documentation",
              type: "text",
              duration: "15 min read",
              isLocked: true,
              content: "Comprehensive guide to shader development in Unity.",
            },
            {
              title: "Shader Project Files",
              type: "resource",
              isLocked: true,
              resourceType: "unitypackage",
              size: "234 MB",
            },
          ],
        },
      ],
      reviews: [
        {
          id: 3,
          user: {
            name: "Zeynep Kaya",
            avatar: "/avatars/user3.jpg",
          },
          rating: 5,
          comment:
            "İleri seviye Unity teknikleri için mükemmel bir kaynak. Shader Graph konusu özellikle etkileyiciydi.",
          date: "2024-03-18",
          likes: 31,
          helpful: true,
        },
      ],
      tutor: {
        name: "Sarah Johnson",
        avatar: "/tutors/sarah-johnson.jpg",
        expertise: "Senior Game Developer & Technical Artist",
        bio: "With over 12 years in the gaming industry, I've worked on multiple AAA titles and indie games. I specialize in graphics programming and technical art.",
      },
      students: 856,
    },
    {
      id: 3,
      title: "Unity Mobile Game Development",
      description:
        "Learn to create and optimize games for mobile platforms using Unity.",
      thumbnail: "/Education/course3.jpg",
      field: "Game Development",
      difficulty: "Intermediate",
      duration: "10 weeks",
      rating: 4.7,
      price: 59.99,
      originalPrice: 249.99,
      lectures: 56,
      language: "English",
      technologies: ["Unity", "C#", "Mobile"],
      previewVideo: "ke5KpqcoiIU?si=h64b5ALBjULqYcoM",
      learningObjectives: [
        "Design and develop games for mobile platforms",
        "Implement touch controls and mobile-specific features",
        "Optimize performance for mobile devices",
        "Integrate mobile ads and in-app purchases",
      ],
      benefits: [
        {
          title: "30 Day Money-Back Guarantee",
          description: "100% refund, no questions asked.",
        },
        {
          title: "Lifetime Access",
          description: "Access your content on any device, at any time.",
        },
        {
          title: "Teaching Support",
          description: "Never get stuck with our teaching assistants on call.",
        },
      ],
      curriculum: [
        {
          title: "Mobile Game Fundamentals",
          lessons: [
            {
              title: "Touch Input Systems",
              duration: "12:30",
              isPreview: true,
              videoUrl: "dQw4w9WgXcQ",
            },
            {
              title: "Mobile UI Design",
              duration: "14:15",
              isPreview: false,
            },
          ],
        },
      ],
      reviews: [
        {
          id: 4,
          user: {
            name: "Can Yıldız",
            avatar: "/avatars/user4.jpg",
          },
          rating: 4,
          comment:
            "Mobil oyun geliştirme sürecini çok iyi anlatan bir kurs. Optimizasyon teknikleri özellikle faydalı oldu.",
          date: "2024-03-20",
          likes: 18,
          helpful: true,
        },
      ],
      tutor: {
        name: "Mike Chen",
        avatar: "/tutors/mike-chen.jpg",
        expertise: "Mobile Game Developer",
        bio: "Former lead mobile developer at major game studios, now teaching others how to create successful mobile games.",
      },
      students: 1102,
    },
    {
      id: 4,
      title: "Game Design Principles",
      description:
        "Master the fundamentals of game design, from concept to player experience.",
      thumbnail: "/Education/course4.jpg",
      field: "Game Design",
      difficulty: "Beginner",
      duration: "6 weeks",
      rating: 4.6,
      price: 39.99,
      originalPrice: 159.99,
      lectures: 36,
      language: "English",
      technologies: ["Unity", "Game Design"],
      previewVideo: "LOhfqjmasi0?si=6ut0e6CdPm0f2l7j",
      learningObjectives: [
        "Understand core game design principles",
        "Create engaging player experiences",
        "Design balanced game mechanics",
        "Develop compelling game narratives",
      ],
      benefits: [
        {
          title: "30 Day Money-Back Guarantee",
          description: "100% refund, no questions asked.",
        },
        {
          title: "Lifetime Access",
          description: "Access your content on any device, at any time.",
        },
        {
          title: "Teaching Support",
          description: "Never get stuck with our teaching assistants on call.",
        },
      ],
      curriculum: [
        {
          title: "Game Design Fundamentals",
          lessons: [
            {
              title: "What Makes Games Fun?",
              duration: "10:15",
              isPreview: true,
              videoUrl: "ke5KpqcoiIU?si=h64b5ALBjULqYcoM",
            },
            {
              title: "Core Game Loops",
              duration: "12:30",
              isPreview: false,
            },
          ],
        },
      ],
      reviews: [
        {
          id: 5,
          user: {
            name: "Ayşe Kara",
            avatar: "/avatars/user5.jpg",
          },
          rating: 5,
          comment:
            "Oyun tasarımının temellerini çok iyi anlatan bir kurs. Örnekler ve uygulamalar çok faydalı.",
          date: "2024-03-22",
          likes: 15,
          helpful: true,
        },
      ],
      tutor: {
        name: "Emily Parker",
        avatar: "/tutors/emily-parker.jpg",
        expertise: "Game Designer & Creative Director",
        bio: "With a background in psychology and 8 years of game design experience, I help students understand what makes games truly engaging.",
      },
      students: 945,
    },
    {
      id: 5,
      title: "3D Character Animation",
      description:
        "Learn professional character animation techniques for games using industry-standard tools.",
      thumbnail: "/Education/course5.jpg",
      field: "Animation",
      difficulty: "Intermediate",
      duration: "10 weeks",
      rating: 4.8,
      price: 69.99,
      originalPrice: 279.99,
      lectures: 52,
      language: "English",
      technologies: ["Unity", "Blender", "Animation"],
      previewVideo: "ke5KpqcoiIU?si=h64b5ALBjULqYcoM",
      learningObjectives: [
        "Master character animation principles",
        "Create smooth and natural movements",
        "Implement animation state machines",
        "Optimize animations for games",
      ],
      benefits: [
        {
          title: "30 Day Money-Back Guarantee",
          description: "100% refund, no questions asked.",
        },
        {
          title: "Lifetime Access",
          description: "Access your content on any device, at any time.",
        },
        {
          title: "Teaching Support",
          description: "Never get stuck with our teaching assistants on call.",
        },
      ],
      curriculum: [
        {
          title: "Animation Basics",
          lessons: [
            {
              title: "12 Principles of Animation",
              duration: "14:20",
              isPreview: true,
              videoUrl: "LOhfqjmasi0?si=6ut0e6CdPm0f2l7j",
            },
            {
              title: "Character Rigging",
              duration: "16:45",
              isPreview: false,
            },
          ],
        },
      ],
      reviews: [
        {
          id: 6,
          user: {
            name: "Burak Yılmaz",
            avatar: "/avatars/user6.jpg",
          },
          rating: 5,
          comment:
            "Animasyon konusunda harika bir kaynak. Özellikle karakter hareketleri konusunda çok şey öğrendim.",
          date: "2024-03-25",
          likes: 28,
          helpful: true,
        },
      ],
      tutor: {
        name: "David Anderson",
        avatar: "/tutors/david-anderson.jpg",
        expertise: "Senior Character Animator",
        bio: "15 years of experience in character animation for games and film. Previously worked at major animation studios and game companies.",
      },
      students: 782,
    },
  ];

  async getJobs() {
    return jobs.jobs;
  }

  async getJobById(id: number) {
    return jobs.jobs.find((job) => job.id === id);
  }

  async getJobsByCompany(companyId: number) {
    return jobs.jobs.filter((job) => job.companyId === companyId);
  }

  async getCompanies() {
    return companies.companies;
  }

  async getCompanyById(id: number) {
    return companies.companies.find((company) => company.id === id);
  }

  async getUserById(id: number) {
    return users.jobs.find((job) => job.id === id);
  }

  async getUserApplications(userId: number) {
    return applications.applications.filter((app) => app.userId === userId);
  }

  async createApplication(
    application: Omit<(typeof applications.applications)[0], "id">
  ) {
    const newId =
      Math.max(...applications.applications.map((app) => app.id)) + 1;
    const newApplication = { ...application, id: newId };
    applications.applications.push(newApplication);
    return newApplication;
  }

  async updateApplicationStatus(id: number, status: string) {
    const application = applications.applications.find((app) => app.id === id);
    if (application) {
      application.status = status;
    }
  }

  async getTestById(id: number) {
    return tests.tests.find((test) => test.id === id);
  }

  async getTestsByJob(jobId: number) {
    const job = await this.getJobById(jobId);
    if (!job?.requiredTestIds) return [];
    return tests.tests.filter((test) => job.requiredTestIds.includes(test.id));
  }

  async getCertificationById(id: number) {
    return certifications.certifications.find((cert) => cert.id === id);
  }

  // Games methods
  async getGames() {
    return games.games;
  }

  async getGameById(id: string) {
    return games.games.find((game) => game.id === id);
  }

  async getGamesByGenre(genre: string) {
    return games.games.filter((game) => game.genres.includes(genre));
  }

  async getGamesByPlatform(platform: string) {
    return games.games.filter((game) => game.platforms.includes(platform));
  }

  async getFreeGames() {
    return games.games.filter((game) => game.price === "Free to Play");
  }

  private parsePlayerCount(playerCount: string): PlayerCount {
    const count = parseInt(playerCount.split(" ")[0].replace(/[KM]/g, ""));
    const multiplier = playerCount.includes("K")
      ? 1000
      : playerCount.includes("M")
      ? 1000000
      : 1;
    return { count, multiplier };
  }

  async getMostPlayedGames() {
    return [...games.games].sort((a, b) => {
      const aCount = this.parsePlayerCount(a.playerCount);
      const bCount = this.parsePlayerCount(b.playerCount);
      return (
        bCount.count * bCount.multiplier - aCount.count * aCount.multiplier
      );
    });
  }

  async getRecentlyPlayedGames() {
    return [...games.games].sort(
      (a, b) =>
        new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
    );
  }

  async getKickstarts(): Promise<any[]> {
    const kickstarts = await this.loadData<{ kickstarts: any[] }>("kickstarts");
    return kickstarts.kickstarts || [];
  }

  // Courses methods
  async getCourses() {
    return this.courses;
  }

  async getCourseById(id: number) {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  }

  async getCoursesByField(field: string) {
    return this.courses.filter((course) => course.field === field);
  }

  async getCoursesByDifficulty(difficulty: string) {
    return this.courses.filter((course) => course.difficulty === difficulty);
  }

  async getCoursesByTutor(tutorName: string) {
    return this.courses.filter((course) => course.tutor.name === tutorName);
  }

  // Developers methods
  async getDevelopers(): Promise<Member[]> {
    return (developers as DevelopersData).developers;
  }

  async getDeveloperById(id: number): Promise<Member | undefined> {
    return (developers as DevelopersData).developers.find(
      (dev) => dev.id === id
    );
  }

  async getDevelopersByRole(role: string): Promise<Member[]> {
    return (developers as DevelopersData).developers.filter(
      (dev) => dev.role === role
    );
  }

  async getDevelopersByRarity(rarity: string): Promise<Member[]> {
    return (developers as DevelopersData).developers.filter(
      (dev) => dev.rarity === rarity
    );
  }

  // Investors methods
  async getInvestors(): Promise<Investor[]> {
    return investorsData.investors;
  }

  async getInvestorById(id: number): Promise<Investor | null> {
    return (
      investorsData.investors.find((investor) => investor.id === id) || null
    );
  }

  async getInvestorsByType(type: string): Promise<Investor[]> {
    return investorsData.investors.filter((investor) => investor.type === type);
  }

  async getInvestorsByLevel(level: number): Promise<Investor[]> {
    return investorsData.investors.filter(
      (investor) => investor.level === level
    );
  }

  // Blogs methods
  async getBlogs(): Promise<Blog[]> {
    return blogsData;
  }

  async getBlogById(id: number): Promise<Blog | null> {
    const blog = blogsData.find((blog) => blog.id === id);
    if (!blog) return null;
    return blog;
  }

  async getBlogsByTopic(topic: string): Promise<Blog[]> {
    return blogsData.filter((blog) => blog.topic === topic);
  }

  async getBlogsByTag(tag: string): Promise<Blog[]> {
    return blogsData.filter((blog) => blog.tags.includes(tag));
  }

  async createBlog(
    blog: Omit<Blog, "id" | "likes" | "comments">
  ): Promise<Blog> {
    const newId = Math.max(...blogsData.map((b) => b.id), 0) + 1;

    const newBlog = {
      ...blog,
      id: newId,
      likes: 0,
      comments: [] as Comment[],
    } as Blog;

    // Update the blogs array
    blogsData.push(newBlog);
    return newBlog;
  }

  async getSimilarJobs(jobId: number) {
    const currentJob = await this.getJobById(jobId);
    if (!currentJob) return [];

    const allJobs = await this.getJobs();

    // Find jobs with similar skills, type, or from the same company
    const similarJobs = allJobs
      .filter((job) => {
        if (job.id === jobId) return false;

        const sameCompany = job.companyId === currentJob.companyId;
        const sameType =
          job.type.toLowerCase() === currentJob.type.toLowerCase();

        // Check for similar skills
        const currentSkills = new Set(
          (currentJob.skills || []).map((skill: string | { name: string }) =>
            typeof skill === "string"
              ? skill.toLowerCase()
              : skill.name.toLowerCase()
          )
        );

        const jobSkills = new Set(
          (job.skills || []).map((skill: string | { name: string }) =>
            typeof skill === "string"
              ? skill.toLowerCase()
              : skill.name.toLowerCase()
          )
        );

        const hasCommonSkills = [...currentSkills].some((skill) =>
          jobSkills.has(skill)
        );

        return sameCompany || sameType || hasCommonSkills;
      })
      .slice(0, 3); // Limit to 3 similar jobs

    return similarJobs;
  }

  private async loadData<T>(key: string): Promise<T> {
    const data = await import(`@/data/db/${key}.json`);
    return data.default as T;
  }

  // Auth methods
  async register(data: any) {
    // Implementation here
    return data;
  }

  async login(email: string, password: string) {
    // Implementation here
    return null;
  }

  async logout() {
    // Implementation here
  }

  getCurrentUser() {
    // Implementation here
    return null;
  }

  async updateProfile(userId: number, profileData: any) {
    // Implementation here
    return null;
  }

  async updateRoles(userId: number, roles: string[]) {
    // Implementation here
    return null;
  }
}

export const db = MockDbService.getInstance();
