import { Hero } from "../components/home/Hero";

type HomeProps = {
  onStartLight: () => void;
  onStartDeep: (description?: string) => void;
  onLoadDemo: () => void;
};

export function Home({ onStartLight, onStartDeep, onLoadDemo }: HomeProps) {
  return (
    <div className="page-stack">
      <Hero onStartLight={onStartLight} onStartDeep={onStartDeep} onLoadDemo={onLoadDemo} />
    </div>
  );
}
