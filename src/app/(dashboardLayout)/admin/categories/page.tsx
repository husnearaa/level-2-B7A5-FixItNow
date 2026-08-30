"use client";

import {
  Edit,
  Plus,
  Search,
  Trash2,
  Wrench,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
} from "@/redux/api/categoriesApi";

type Category = {
  id: string | number;
  name: string;
  description: string;
  isActive: boolean;
  services?: unknown[];
};

export default function CategoryManagement() {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // Get all categories
  // =========================

  const {
    data: categoryResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAllCategoriesQuery({});

  // =========================
  // Create category
  // =========================

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  // =========================
  // Extract categories
  // =========================

  const categories: Category[] =
    categoryResponse?.data || [];

  // =========================
  // Search
  // =========================

  const filteredCategories = categories.filter(
    (category) =>
      category.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      category.description
        ?.toLowerCase()
        .includes(search.toLowerCase()),
  );

  // =========================
  // Add category modal
  // =========================

  const openAddModal = () => {
    setEditingCategory(null);
    setCategoryName("");
    setDescription("");
    setShowModal(true);
  };

  // =========================
  // Edit modal
  // =========================

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setDescription(category.description);
    setShowModal(true);
  };

  // =========================
  // Save category
  // =========================

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    if (editingCategory) {
      toast.info(
        "Edit category API is not connected yet.",
      );
      return;
    }

    try {
      const response = await createCategory({
        name: categoryName.trim(),
        description: description.trim(),
      }).unwrap();

      if (!response?.success) {
        toast.error(
          response?.message || "Failed to create category.",
        );
        return;
      }

      toast.success("Category created successfully.");

      setShowModal(false);
      setCategoryName("");
      setDescription("");
      setEditingCategory(null);

      // RTK Query invalidates Category automatically,
      // so the category list will refresh.
      refetch();
    } catch (error) {
      console.error("Create category error:", error);

      toast.error(
        "Failed to create category. Please try again.",
      );
    }
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = (id: string | number) => {
    console.log("Delete category:", id);

    toast.info(
      "Delete category API is not connected yet.",
    );
  };

  // =========================
  // Status toggle
  // =========================

  const handleStatusToggle = (
    id: string | number,
  ) => {
    console.log("Toggle category status:", id);

    toast.info(
      "Category status API is not connected yet.",
    );
  };

  // =========================
  // Loading state
  // =========================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 md:px-6 lg:px-8 m-6 rounded-lg">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#EC620B]/20 border-t-[#EC620B]" />

            <p className="text-sm font-medium text-[#00224A]">
              Loading categories...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Error state
  // =========================

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 md:px-6 lg:px-8 m-6 rounded-lg">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-sm text-red-500">
              Failed to load categories.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Main UI
  // =========================

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 md:px-6 lg:px-8 m-6 rounded-lg">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#00224A] md:text-3xl">
            Category Management
          </h1>

          <p className="mt-1 text-sm text-black/60">
            Manage service categories available on FixItNow.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border border-[#00224A]/10 bg-white shadow-sm">

        {/* Card Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#00224A]/10 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#00224A]">
              Service Categories
            </h2>

            <p className="mt-1 text-sm text-black/60">
              {categories.length} categories available
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#00224A]/15 bg-white pl-9 pr-3 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b border-[#00224A]/10 bg-[#00224A]/5">

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Description
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Services
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#00224A]">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredCategories.map((category) => {

                const status = category.isActive
                  ? "Active"
                  : "Inactive";

                const serviceCount = Array.isArray(
                  category.services,
                )
                  ? category.services.length
                  : 0;

                return (
                  <tr
                    key={category.id}
                    className="border-b border-[#00224A]/10 transition-colors last:border-b-0 hover:bg-[#EC620B]/5"
                  >

                    {/* Category */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EC620B]">
                          <Wrench className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <p className="font-semibold text-[#00224A]">
                            {category.name}
                          </p>

                          <p className="text-xs text-black/40">
                            ID: {String(category.id)}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-5 py-4">
                      <p className="truncate text-sm text-black/70">
                        {category.description || "No description"}
                      </p>
                    </td>

                    {/* Services */}
                    <td className="px-5 py-4">

                      <span className="text-sm font-semibold text-[#00224A]">
                        {serviceCount}
                      </span>

                      <span className="ml-1 text-xs text-black/50">
                        services
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusToggle(category.id)
                        }
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          category.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {category.isActive ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}

                        {status}

                      </button>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(category)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#00224A]/15 bg-white px-3 py-2 text-xs font-semibold text-[#00224A] transition-colors hover:border-[#EC620B] hover:text-[#EC620B]"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(category.id)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

              {/* Empty State */}
              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">

                      <Search className="mb-3 h-8 w-8 text-black/20" />

                      <p className="font-medium text-[#00224A]">
                        No categories found
                      </p>

                      <p className="mt-1 text-sm text-black/50">
                        Try searching with a different keyword.
                      </p>

                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-[#00224A]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-black/50">
            Showing{" "}
            <span className="font-semibold text-[#00224A]">
              {filteredCategories.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#00224A]">
              {categories.length}
            </span>{" "}
            categories
          </p>

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-sm text-black/60">
              Active:{" "}
              {
                categories.filter(
                  (category) => category.isActive,
                ).length
              }
            </span>

            <span className="ml-3 h-2 w-2 rounded-full bg-red-500" />

            <span className="text-sm text-black/60">
              Inactive:{" "}
              {
                categories.filter(
                  (category) => !category.isActive,
                ).length
              }
            </span>

          </div>

        </div>

      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-xl bg-[#FFF8F4] p-6 shadow-xl">

            {/* Modal Header */}
            <div className="mb-5">

              <h2 className="text-xl font-bold text-[#00224A]">
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <p className="mt-1 text-sm text-black/60">
                {editingCategory
                  ? "Update the category information."
                  : "Create a new service category."}
              </p>

            </div>

            {/* Category Name */}
            <div className="mb-4">

              <label className="mb-2 block text-sm font-semibold text-[#00224A]">
                Category Name
              </label>

              <input
                type="text"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(e.target.value)
                }
                placeholder="e.g. Home Cleaning"
                className="w-full rounded-lg border border-[#00224A]/15 bg-white px-3 py-2.5 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
              />

            </div>

            {/* Description */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-semibold text-[#00224A]">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe this service category..."
                rows={4}
                className="w-full resize-none rounded-lg border border-[#00224A]/15 bg-white px-3 py-2.5 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
              />

            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                  setCategoryName("");
                  setDescription("");
                }}
                className="rounded-lg border border-[#00224A]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#00224A] transition-colors hover:bg-[#00224A]/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isCreating}
                className="rounded-lg bg-[#EC620B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EC620B]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating
                  ? "Saving..."
                  : editingCategory
                    ? "Update"
                    : "Add Category"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

