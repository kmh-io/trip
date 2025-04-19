"use client";
import HeroSection from "@/app/travels/[vehicle]/routes/components/hero-section";
import FeaturedRoutes from "@/components/featured-routes";
import PopularDestinations from "@/components/popular-destinations";
import SearchBar from "@/components/search-bar";
import Testimonials from "@/components/testimonials";
import SiteFooter from "./travels/[vehicle]/routes/components/site-footer";
import SiteHeader from "./travels/[vehicle]/routes/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
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
      <SiteFooter />
    </>
  );
}
