"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Book My PG</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="secondary">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Find Your Perfect
            <span className="text-blue-600"> PG Accommodation</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover comfortable and affordable PG accommodations near your
            college. Manage food, transport, and all essentials in one place.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/auth/signup">
                <Button className="w-full">Get Started Today</Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/auth/signin">
                <Button variant="secondary" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">
              Everything You Need
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              A comprehensive solution for students to find and manage their PG
              life
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                PG Listings
              </h4>
              <p className="text-gray-600">
                Browse through verified PG accommodations with detailed
                information, photos, and pricing near your college.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Food Management
              </h4>
              <p className="text-gray-600">
                Discover local restaurants, canteens, and food options. Manage
                meal plans and dietary preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚌</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Transport Info
              </h4>
              <p className="text-gray-600">
                Get updated information about bus routes, metro lines, and
                transportation options to your college.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Wishlist
              </h4>
              <p className="text-gray-600">
                Save your favorite PG accommodations and compare them to make
                the best choice for your needs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                College Info
              </h4>
              <p className="text-gray-600">
                Access detailed information about colleges, courses, and nearby
                amenities for students.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile First
              </h4>
              <p className="text-gray-600">
                Optimized for mobile devices with responsive design and smooth
                user experience on all platforms.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-600 rounded-lg shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-white">
                Ready to find your perfect PG?
              </h3>
              <p className="mt-4 text-lg text-blue-100">
                Join thousands of students who have found their ideal
                accommodation
              </p>
              <div className="mt-8">
                <Link href="/auth/signup">
                  <Button variant="secondary">Start Your Journey</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>
              &copy; 2024 Book My PG. Made with ❤️ for students by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
