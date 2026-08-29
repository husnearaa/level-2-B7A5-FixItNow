"use client";

import { Ban, CheckCircle2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllUserQuery, useUpdateUserStatusMutation} from "@/redux/api/userApi";

const ITEMS_PER_PAGE = 5;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // Get all users
  // =========================
  const {
    data: usersResponse,
    isLoading,
    isFetching,
    error,
  } = useGetAllUserQuery({});

  // =========================
  // Update user status
  // =========================
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();

  // =========================
  // Normalize API response
  // =========================
  const users: User[] =
    usersResponse?.data?.data ||
    usersResponse?.data?.result ||
    usersResponse?.data ||
    [];

  // =========================
  // Search
  // =========================
  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue)
    );
  });

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(
    filteredUsers.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentUsers = filteredUsers.slice(
    startIndex,
    endIndex
  );

  // =========================
  // Reset page when searching
  // =========================
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // =========================
  // Keep current page valid
  // =========================
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // =========================
  // Ban / Unban user
  // =========================
  const handleBanToggle = async (user: User) => {
    try {
      await updateUserStatus({
        id: user.id,
        data: {
          isActive: !user.isActive,
        },
      }).unwrap();

      // No need to manually update state.
      // RTK Query will refetch because
      // updateUserStatus invalidates "UserData".
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  // =========================
  // Previous page
  // =========================
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  // =========================
  // Next page
  // =========================
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  // =========================
  // Loading
  // =========================
  if (isLoading) {
    return (
      <div className="m-10 mb-8 rounded-lg border border-[#00224A]/10 bg-white py-8 px-2 shadow-sm">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm font-medium text-[#00224A]">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (error) {
    return (
      <div className="m-10 mb-8 rounded-lg border border-[#00224A]/10 bg-white py-8 px-2 shadow-sm">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm font-medium text-red-500">
            Failed to load users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-10 mb-8 rounded-lg border border-[#00224A]/10 bg-white py-8 px-2 shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#00224A]/10 p-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#00224A] md:text-3xl">
            User Management
          </h2>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Manage customers and technicians on the platform.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white pl-9 pr-3 text-sm text-[#00224A] outline-none placeholder:text-[#00224A]/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
          />
        </div>
      </div>

      {/* Refetching indicator */}
      {isFetching && !isLoading && (
        <div className="px-5 pt-3 text-xs text-[#EC620B]">
          Updating users...
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                User
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                Role
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#00224A]/10 last:border-b-0 hover:bg-[#EC620B]/5"
              >
                {/* User */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00224A] text-sm font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="font-medium text-[#00224A]">
                        {user.name}
                      </p>

                      <p className="text-xs text-[#00224A]/50">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-[#EC620B]/10 px-3 py-1 text-xs font-semibold text-[#EC620B]">
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Ban className="h-3 w-3" />
                    )}

                    {user.isActive ? "Active" : "Banned"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleBanToggle(user)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                      user.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.isActive ? "Ban User" : "Unban User"}
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {currentUsers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-sm text-[#00224A]/50"
                >
                  {search
                    ? "No users found matching your search."
                    : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 border-t border-[#00224A]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Showing */}
        <p className="text-sm text-[#00224A]/50">
          {filteredUsers.length > 0
            ? `Showing ${startIndex + 1}–${Math.min(
                endIndex,
                filteredUsers.length
              )} of ${filteredUsers.length} users`
            : "Showing 0 users"}
        </p>

        {/* Pagination Buttons */}
        {totalPages > 0 && (
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "cursor-not-allowed border-[#00224A]/10 text-[#00224A]/30"
                  : "border-[#00224A]/15 text-[#00224A] hover:border-[#EC620B] hover:bg-[#EC620B]/5 hover:text-[#EC620B]"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors ${
                        currentPage === pageNumber
                          ? "bg-[#EC620B] text-white"
                          : "border border-[#00224A]/15 text-[#00224A] hover:border-[#EC620B] hover:bg-[#EC620B]/5 hover:text-[#EC620B]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "cursor-not-allowed border-[#00224A]/10 text-[#00224A]/30"
                  : "border-[#00224A]/15 text-[#00224A] hover:border-[#EC620B] hover:bg-[#EC620B]/5 hover:text-[#EC620B]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
