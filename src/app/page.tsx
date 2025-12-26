import ProfileFeed from "@/components/ProfileFeed";
import { portfolioData } from "@/data/portfolioData";

export default function Home() {
  return <ProfileFeed profiles={portfolioData} />;
}
