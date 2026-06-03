import { Menu } from "lucide-react";
import Link from "next/link";
import type { JSX } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/docs" },
  { title: "Account", href: "/account" },
];

export function Header(): JSX.Element {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold tracking-tight">Selma</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden gap-2 md:flex">
            <Link
              href="/signin"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign in
            </Link>
            <Link href="/signup" className={buttonVariants()}>
              Sign up
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-60 sm:w-75">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary border-muted border-b py-2 text-sm font-medium transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/signin"
                    className={`${buttonVariants({ variant: "outline" })} w-full`}
                  >
                    Sign in
                  </Link>
                  <Link href="/signup" className={buttonVariants()}>
                    Sign up
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
