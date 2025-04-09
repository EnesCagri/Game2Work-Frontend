"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  id: number;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  year: number;
}

interface Developer {
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
  description: string;
  skills: string[];
  certifications: Certification[];
  projects: Project[];
}

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
};

export default function DeveloperProfile({
  params,
}: {
  params: { id: string };
}) {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const data = await db.getDeveloperById(parseInt(params.id));
        setDeveloper(data as Developer);
      } catch (error) {
        console.error("Error fetching developer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!developer) {
    return <div className="text-center py-8">Developer not found</div>;
  }

  return (
    <section className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black" />
      <GradientOrb
        color="#3b82f6"
        position="top-right"
        size="sm"
        opacity={0.08}
      />
      <GradientOrb
        color="#06b6d4"
        position="bottom-left"
        size="sm"
        opacity={0.08}
      />

      <div className="container relative z-10 mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 items-start mb-12"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden">
            <Image
              src={developer.image}
              alt={developer.name}
              fill
              className="object-cover"
            />
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-sm ${
                rarityColors[developer.rarity]
              }`}
            >
              {developer.rarity}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{developer.name}</h1>
            <p className="text-xl text-gray-400 mb-4">{developer.role}</p>
            <p className="text-gray-300 mb-6">{developer.description}</p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {developer.stats.projects}
                </div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {developer.stats.awards}
                </div>
                <div className="text-gray-400">Awards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {developer.stats.experience}
                </div>
                <div className="text-gray-400">Years</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developer.certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle>{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Issued by: {cert.issuer}</p>
                  <p className="text-gray-400">
                    Date: {new Date(cert.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developer.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <p className="text-gray-400">{project.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-400 mt-4">Year: {project.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
