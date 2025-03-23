import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/button";
import AppLayout from "@/components/layout/app-layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-7xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full bg-primary hover:bg-primary/90 button-hover" size="lg">
                Return to Home
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
