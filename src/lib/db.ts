import {
  jobs,
  users,
  companies,
  applications,
  tests,
  certifications,
  games,
} from "@/data/db";

// Add type for playerCount parsing
type PlayerCount = {
  count: number;
  multiplier: number;
};

export interface DbService {
  // Jobs
  getJobs: () => Promise<typeof jobs.jobs>;
  getJobById: (id: number) => Promise<(typeof jobs.jobs)[0] | undefined>;
  getJobsByCompany: (companyId: number) => Promise<typeof jobs.jobs>;

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
}

export const db = MockDbService.getInstance();
