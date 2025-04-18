import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-muted">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">TravelEase</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Book tickets for buses, trains, and ferries to your favorite
              destinations with ease.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Youtube className="w-5 h-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/search-results"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Bus Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/search-results"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Train Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/search-results"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Ferry Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-booking"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Manage Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} TravelEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
