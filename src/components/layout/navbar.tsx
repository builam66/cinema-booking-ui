import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';
import { Button } from '@/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock authentication state
const useAuth = () => {
  return {
    isAuthenticated: true,  // For demo purposes, assume user is logged in
    user: {
      name: 'John Doe'
    },
    logout: () => console.log('Logged out')
  };
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Coming Soon', path: '/coming-soon' },
    { name: 'Theaters', path: '/theaters' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-border">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">CINEMA BOOKING</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(route.path)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile ? (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(route.path)
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {route.name}
                    </Link>
                  ))}
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="text-sm font-medium transition-colors hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Button variant="outline" onClick={logout}>
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <Button>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <User className="h-4 w-4" />
                      {user?.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
