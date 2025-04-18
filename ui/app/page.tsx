"use client";
import PopularDestinations from "@/components/popular-destinations";
import HeroSection from "@/app/travels/[vehicle]/routes/components/hero-section";
import FeaturedRoutes from "@/components/featured-routes";
import Testimonials from "@/components/testimonials";
import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative">
        <HeroSection />
        <div className="absolute inset-x-0 bottom-12 px-4 mx-auto max-w-6xl">
          <SearchBar />
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto mt-16">
        <PopularDestinations />
      </div>

      <div className="container px-4 py-12 mx-auto">
        <FeaturedRoutes />
      </div>

      <div className="container px-4 py-12 mx-auto">
        <Testimonials />
      </div>
    </main>
  );
}
