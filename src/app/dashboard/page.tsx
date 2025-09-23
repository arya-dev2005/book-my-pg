"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">
                  Welcome, {session?.user?.name}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Role: {session?.user?.role}
                </span>
                <Button onClick={() => signOut()} variant="outline">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/dashboard/food" className="block">
                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                          🍽️
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Food Management
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Manage food items and menus
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/dashboard/pg" className="block">
                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                          🏠
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            PG Management
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Manage PG listings and details
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        🚌
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Transport Management
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Coming Soon
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
