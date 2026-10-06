import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { ProjectsExperience } from "@/components/sections/projects/ProjectsExperience";
import { ProjectsPageHero } from "@/components/sections/projects/ProjectsPageHero";

export const metadata = {
  title: "Проекты — Альфа-Связь",
  description:
    "Реализованные и типовые объекты «Альфа-Связь»: видеонаблюдение, СКУД, пожарная безопасность и сети по всей России.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#0C2340]">
      <ProjectsPageHero />
      <ProjectsExperience />
      <PageCtaSection />
    </div>
  );
}
