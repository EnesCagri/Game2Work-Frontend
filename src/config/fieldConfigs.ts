import { Job, Company, Game, Developer, User } from "@/types";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "image"
  | "select"
  | "array"
  | "object";

interface FieldConfig {
  name: keyof (Job | Company | Game | Developer | User);
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  isArray?: boolean;
  isObject?: boolean;
  nestedFields?: FieldConfig[];
}

export const jobFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "companyId", label: "Company ID", type: "number", required: true },
  { name: "location", label: "Location", type: "text", required: true },
  {
    name: "type",
    label: "Job Type",
    type: "select",
    required: true,
    options: [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Contract", label: "Contract" },
      { value: "Internship", label: "Internship" },
    ],
  },
  {
    name: "experience",
    label: "Experience Level",
    type: "select",
    required: true,
    options: [
      { value: "Entry Level", label: "Entry Level" },
      { value: "Mid Level", label: "Mid Level" },
      { value: "Senior", label: "Senior" },
      { value: "Lead", label: "Lead" },
    ],
  },
  { name: "salary", label: "Salary", type: "text", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    name: "requirements",
    label: "Requirements",
    type: "array",
    isArray: true,
    nestedFields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "required",
        label: "Required",
        type: "select",
        required: true,
        options: [
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ],
      },
    ],
  },
  {
    name: "responsibilities",
    label: "Responsibilities",
    type: "array",
    isArray: true,
  },
  {
    name: "skills",
    label: "Skills",
    type: "array",
    isArray: true,
    nestedFields: [
      { name: "name", label: "Skill Name", type: "text", required: true },
      { name: "level", label: "Skill Level", type: "number", required: true },
    ],
  },
  { name: "benefits", label: "Benefits", type: "array", isArray: true },
  { name: "youtubeVideoId", label: "YouTube Video ID", type: "text" },
];

export const companyFields: FieldConfig[] = [
  { name: "name", label: "Company Name", type: "text", required: true },
  { name: "logo", label: "Logo", type: "image" },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  { name: "industry", label: "Industry", type: "text", required: true },
  { name: "website", label: "Website", type: "text", required: true },
  { name: "location", label: "Location", type: "text", required: true },
  {
    name: "size",
    label: "Company Size",
    type: "select",
    required: true,
    options: [
      { value: "1-50", label: "1-50" },
      { value: "51-200", label: "51-200" },
      { value: "201-1000", label: "201-1000" },
      { value: "1000+", label: "1000+" },
    ],
  },
  { name: "founded", label: "Founded Year", type: "number", required: true },
  {
    name: "socialMedia",
    label: "Social Media",
    type: "object",
    isObject: true,
    nestedFields: [
      { name: "twitter", label: "Twitter", type: "text" },
      { name: "linkedin", label: "LinkedIn", type: "text" },
    ],
  },
  { name: "benefits", label: "Benefits", type: "array", isArray: true },
  { name: "techStack", label: "Tech Stack", type: "array", isArray: true },
];

export const gameFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  { name: "image", label: "Cover Image", type: "image" },
  { name: "genres", label: "Genres", type: "array", isArray: true },
  { name: "platforms", label: "Platforms", type: "array", isArray: true },
  { name: "price", label: "Price", type: "text", required: true },
  { name: "rating", label: "Rating", type: "number" },
  { name: "playerCount", label: "Player Count", type: "text" },
  { name: "releaseDate", label: "Release Date", type: "date" },
  { name: "developer", label: "Developer", type: "text" },
  { name: "publisher", label: "Publisher", type: "text" },
  { name: "screenshots", label: "Screenshots", type: "array", isArray: true },
  { name: "youtubeId", label: "YouTube ID", type: "text" },
  { name: "metacritic", label: "Metacritic Score", type: "number" },
  { name: "esrbRating", label: "ESRB Rating", type: "text" },
  { name: "features", label: "Features", type: "array", isArray: true },
  {
    name: "systemRequirements",
    label: "System Requirements",
    type: "object",
    isObject: true,
    nestedFields: [
      {
        name: "minimum",
        label: "Minimum",
        type: "object",
        isObject: true,
        nestedFields: [
          { name: "os", label: "OS", type: "text" },
          { name: "processor", label: "Processor", type: "text" },
          { name: "memory", label: "Memory", type: "text" },
          { name: "storage", label: "Storage", type: "text" },
        ],
      },
      {
        name: "recommended",
        label: "Recommended",
        type: "object",
        isObject: true,
        nestedFields: [
          { name: "os", label: "OS", type: "text" },
          { name: "processor", label: "Processor", type: "text" },
          { name: "memory", label: "Memory", type: "text" },
          { name: "storage", label: "Storage", type: "text" },
        ],
      },
    ],
  },
];

export const developerFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "image", label: "Profile Image", type: "image" },
  {
    name: "rarity",
    label: "Rarity",
    type: "select",
    required: true,
    options: [
      { value: "common", label: "Common" },
      { value: "rare", label: "Rare" },
      { value: "epic", label: "Epic" },
      { value: "legendary", label: "Legendary" },
    ],
  },
  {
    name: "stats",
    label: "Stats",
    type: "object",
    isObject: true,
    nestedFields: [
      { name: "projects", label: "Projects", type: "number" },
      { name: "awards", label: "Awards", type: "number" },
      { name: "experience", label: "Experience", type: "number" },
    ],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  { name: "skills", label: "Skills", type: "array", isArray: true },
  {
    name: "certifications",
    label: "Certifications",
    type: "array",
    isArray: true,
  },
  { name: "projects", label: "Projects", type: "array", isArray: true },
];

export const userFields: FieldConfig[] = [
  { name: "email", label: "Email", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
      { value: "developer", label: "Developer" },
    ],
  },
  { name: "avatar", label: "Avatar", type: "image" },
  { name: "bio", label: "Bio", type: "textarea" },
  {
    name: "skills",
    label: "Skills",
    type: "array",
    isArray: true,
    nestedFields: [
      { name: "name", label: "Skill Name", type: "text", required: true },
      { name: "level", label: "Skill Level", type: "number", required: true },
    ],
  },
  { name: "experience", label: "Experience", type: "array", isArray: true },
  { name: "education", label: "Education", type: "array", isArray: true },
  {
    name: "certifications",
    label: "Certifications",
    type: "array",
    isArray: true,
  },
];

export const fieldConfigs = {
  jobs: jobFields,
  companies: companyFields,
  games: gameFields,
  developers: developerFields,
  users: userFields,
};
