import { AnimatedBackground } from "@/components/landing/animated-background";
import { AiRiskSection } from "@/components/landing/ai-risk-section";
import { DashboardPreviewSection } from "@/components/landing/dashboard-preview-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FaucetSection } from "@/components/landing/faucet-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingNav } from "@/components/landing/landing-nav";
import { LiquidationSection } from "@/components/landing/liquidation-section";

export function LandingPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <AnimatedBackground />
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AiRiskSection />
        <LiquidationSection />
        <FaucetSection />
        <DashboardPreviewSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
