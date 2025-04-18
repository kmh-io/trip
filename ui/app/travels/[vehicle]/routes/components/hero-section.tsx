import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Image
        src="/hero.jpg?height=1080&width=1920"
        alt="Travel destinations"
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Travel Anywhere, Anytime
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl">
          Book tickets for buses, trains, and ferries to your favorite
          destinations with ease
        </p>
      </div>
    </div>
  );
}
