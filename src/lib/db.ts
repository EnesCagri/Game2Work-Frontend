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
    return courses.courses;
  }

  async getCourseById(id: number) {
    return courses.courses.find((course) => course.id === id);
  }

  async getCoursesByField(field: string) {
    return courses.courses.filter((course) => course.field === field);
  }

  async getCoursesByDifficulty(difficulty: string) {
    return courses.courses.filter((course) => course.difficulty === difficulty);
  }

  async getCoursesByTutor(tutorName: string) {
    return courses.courses.filter((course) => course.tutor.name === tutorName);
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
