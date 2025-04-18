import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between p-2">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-bold text-xl">
            OneTrip
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Travel</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/travels/bus/routes" title="Bus">
                      Book bus tickets to hundreds of destinations
                    </ListItem>
                    <ListItem href="/travels/train/routes" title="Train">
                      Travel by train with comfort and speed
                    </ListItem>
                    <ListItem href="/travels/filght/routes" title="Fligh">
                      Explore coastal and island destinations
                    </ListItem>
                    <ListItem href="/travels/packages" title="Packages">
                      Find travel packages and save
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <ListItem href="/search-results" title="Popular Cities">
                      Explore the most visited cities
                    </ListItem>
                    <ListItem href="/search-results" title="Weekend Getaways">
                      Perfect destinations for short trips
                    </ListItem>
                    <ListItem href="/search-results" title="International">
                      Cross-border travel options
                    </ListItem>
                    <ListItem href="/search-results" title="Seasonal">
                      Best places to visit this season
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/manage-booking" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Manage Booking
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/help" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Help
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
