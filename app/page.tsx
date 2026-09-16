import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ClientsMarqueeSection } from "@/components/sections/ClientsMarqueeSection";
import { HeroStatsStack } from "@/components/sections/HeroStatsStack";
import { HomeLowerFloor } from "@/components/sections/HomeLowerFloor";
import { ServicesCarouselSection } from "@/components/sections/ServicesCarouselSection";

export default function Home() {
  return (
    <>
      <HeroStatsStack />
      <HomeLowerFloor>
        <ServicesCarouselSection />
        <AdvantagesSection />
        <ClientsMarqueeSection />
      </HomeLowerFloor>
    </>
  );
}
