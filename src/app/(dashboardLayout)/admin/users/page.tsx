"use client";

import { Ban, CheckCircle2, Search } from "lucide-react";
import { useEffect, useState } from "react";

const users = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 3,
    name: "Maria Khan",
    email: "maria@example.com",
    role: "Customer",
    status: "Banned",
  },
  {
    id: 4,
    name: "David Smith",
    email: "david@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 5,
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 7,
    name: "Robert Lee",
    email: "robert@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 8,
    name: "Sophia Williams",
    email: "sophia@example.com",
    role: "Customer",
    status: "Banned",
  },
  {
    id: 9,
    name: "Daniel Taylor",
    email: "daniel@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 10,
    name: "Olivia Martin",
    email: "olivia@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 11,
    name: "William Anderson",
    email: "william@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 12,
    name: "Emma Thomas",
    email: "emma@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 13,
    name: "Benjamin Jackson",
    email: "benjamin@example.com",
    role: "Technician",
    status: "Banned",
  },
  {
    id: 14,
    name: "Ava White",
    email: "ava@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 15,
    name: "Henry Harris",
    email: "henry@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 16,
    name: "Isabella Clark",
    email: "isabella@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 17,
    name: "Lucas Lewis",
    email: "lucas@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 18,
    name: "Mia Walker",
    email: "mia@example.com",
    role: "Customer",
    status: "Banned",
  },
  {
    id: 19,
    name: "Alexander Hall",
    email: "alexander@example.com",
    role: "Technician",
    status: "Active",
  },
  {
    id: 20,
    name: "Charlotte Allen",
    email: "charlotte@example.com",
    role: "Customer",
    status: "Active",
  },
];

const ITEMS_PER_PAGE = 5;

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);

  // Search users
  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Total pages
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  // Current page users
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Make sure current page remains valid
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Ban / Unban
  const handleBanToggle = (id: number) => {
    setUserList((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Banned" ? "Active" : "Banned",
            }
          : user,
      ),
    );
  };

  // Previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  // Next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  return (
    <div className="m-10 mb-8 rounded-lg border border-[#00224A]/10 bg-white py-8 px-2 shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#00224A]/10 p-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-[#00224A]">
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
                      {user.name.charAt(0)}
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
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Ban className="h-3 w-3" />
                    )}

                    {user.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleBanToggle(user.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors ${
                      user.status === "Active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.status === "Active" ? "Ban User" : "Unban User"}
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
                  No users found.
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
                filteredUsers.length,
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
              {Array.from({ length: totalPages }, (_, index) => {
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
              })}
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