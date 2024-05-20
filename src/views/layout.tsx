import {Link, useLocation} from "react-router-dom"
import {
  Menu,
  Package2,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    return location.pathname === path ? 'text-foreground' : 'text-muted-foreground';
  };
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Capsim</span>
          </Link>
          <Link
            to="/"
            className={`${getLinkClass("/")} transition-colors hover:text-foreground`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin"
            className={`${getLinkClass("/admin")} transition-colors hover:text-foreground`}
          >
            Admin
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link to="/" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                to="/admin"
                className="text-muted-foreground hover:text-foreground"
              >
                Admin
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
