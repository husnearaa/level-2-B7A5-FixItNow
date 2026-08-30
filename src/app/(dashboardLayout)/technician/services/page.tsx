"use client";

import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Plus,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";

import { useGetMeQuery } from "@/redux/api/authApi";

import { useUpdateTechnicianProfileMutation } from "@/redux/api/technicianApi";
import { useGetAllCategoryQuery } from "@/redux/api/categoriesApi";


type User = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string | null;
  role?: string;
  technicianProfile?: TechnicianProfile;
};

type TechnicianProfile = {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  skills?: string[];
  location?: string;
  hourlyRate?: string | number;
  averageRating?: number;
  totalReviews?: number;
  isVerified?: boolean;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  location?: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
};

type Category = {
  id: string;
  name: string;
  description?: string;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function TechnicianProfilePage() {
  /* =======================================================
     GET CURRENT USER
  ======================================================= */

  const {
    data: meResponse,
    isLoading: userLoading,
    isError: userError,
  } = useGetMeQuery(undefined);

  const user: User | null = meResponse?.data || meResponse || null;

  /*
   * Technician profile comes directly from /auth/me
   */

  const technician = user?.technicianProfile || null;

  /* =======================================================
     GET SERVICES
  ======================================================= */

  const {
    data: serviceResponse,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetAllServiceQuery({});

  const services: Service[] =
    serviceResponse?.data || serviceResponse || [];

  /* =======================================================
     GET CATEGORIES
  ======================================================= */

  const {
    data: categoryResponse,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoryQuery({});

  /*
   * API response:
   *
   * {
   *   success: true,
   *   data: {
   *     categories: [...]
   *   }
   * }
   *
   * Therefore categories are:
   * categoryResponse.data.categories
   */

  const categories: Category[] =
    categoryResponse?.data?.categories || [];

  /* =======================================================
     MUTATIONS
  ======================================================= */

  const [updateTechnicianProfile, { isLoading: isUpdatingProfile }] =
    useUpdateTechnicianProfileMutation();

  const [createService, { isLoading: isCreatingService }] =
    useCreateServiceMutation();

  const [updateService, { isLoading: isUpdatingService }] =
    useUpdateServiceMutation();

  const [deleteService, { isLoading: isDeletingService }] =
    useDeleteServiceMutation();

  /* =======================================================
     PROFILE FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    experience: "",
    skills: "",
    location: "",
    hourlyRate: "",
  });

  /* =======================================================
     ADD SERVICE STATE
  ======================================================= */

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    categoryId: "",
  });

  /* =======================================================
     EDIT SERVICE STATE
  ======================================================= */

  const [editingServiceId, setEditingServiceId] =
    useState<string | null>(null);

  const [editingService, setEditingService] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    categoryId: "",
  });

  /* =======================================================
     LOAD PROFILE DATA
  ======================================================= */

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: technician?.bio || "",
      experience: technician?.experience?.toString() || "",
      skills: technician?.skills?.join(", ") || "",
      location: technician?.location || "",
      hourlyRate: technician?.hourlyRate?.toString() || "",
    });
  }, [user, technician]);

  /* =======================================================
     HANDLE PROFILE INPUT
  ======================================================= */

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =======================================================
     UPDATE TECHNICIAN PROFILE
  ======================================================= */

  const handleProfileSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      await updateTechnicianProfile({
        id: technician?.id,
        data: {
          bio: formData.bio,
          experience: Number(formData.experience),
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          location: formData.location,
          hourlyRate: Number(formData.hourlyRate),
        },
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  /* =======================================================
     HANDLE NEW SERVICE INPUT
  ======================================================= */

  const handleNewServiceChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setNewService((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =======================================================
     CREATE SERVICE
  ======================================================= */

  const handleAddService = async () => {
    if (!newService.name.trim()) {
      toast.error("Service name is required.");
      return;
    }

    if (!newService.description.trim()) {
      toast.error("Service description is required.");
      return;
    }

    if (!newService.price) {
      toast.error("Service price is required.");
      return;
    }

    if (!newService.location.trim()) {
      toast.error("Service location is required.");
      return;
    }

    if (!newService.categoryId.trim()) {
      toast.error("Category is required.");
      return;
    }

    try {
      await createService({
        name: newService.name,
        description: newService.description,
        price: Number(newService.price),
        location: newService.location,
        categoryId: newService.categoryId,
      }).unwrap();

      setNewService({
        name: "",
        description: "",
        price: "",
        location: "",
        categoryId: "",
      });

      toast.success("Service added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add service.");
    }
  };

  /* =======================================================
     START EDIT SERVICE
  ======================================================= */

  const handleStartEdit = (service: Service) => {
    setEditingServiceId(service.id);

    setEditingService({
      name: service.name || "",
      description: service.description || "",
      price: service.price?.toString() || "",
      location: service.location || "",
      categoryId:
        service.categoryId || service.category?.id || "",
    });
  };

  /* =======================================================
     HANDLE EDIT SERVICE INPUT
  ======================================================= */

  const handleEditServiceChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setEditingService((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =======================================================
     UPDATE SERVICE
  ======================================================= */

  const handleUpdateService = async () => {
    if (!editingServiceId) return;

    if (!editingService.name.trim()) {
      toast.error("Service name is required.");
      return;
    }

    if (!editingService.description.trim()) {
      toast.error("Service description is required.");
      return;
    }

    if (!editingService.price) {
      toast.error("Service price is required.");
      return;
    }

    if (!editingService.location.trim()) {
      toast.error("Service location is required.");
      return;
    }

    if (!editingService.categoryId.trim()) {
      toast.error("Category is required.");
      return;
    }

    try {
      await updateService({
        id: editingServiceId,
        data: {
          name: editingService.name,
          description: editingService.description,
          price: Number(editingService.price),
          location: editingService.location,
          categoryId: editingService.categoryId,
        },
      }).unwrap();

      setEditingServiceId(null);

      setEditingService({
        name: "",
        description: "",
        price: "",
        location: "",
        categoryId: "",
      });

      toast.success("Service updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service.");
    }
  };

  /* =======================================================
     DELETE SERVICE
  ======================================================= */

  const handleDeleteService = async (serviceId: string) => {
    try {
      await deleteService({
        id: serviceId,
      }).unwrap();

      toast.success("Service deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service.");
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    userLoading ||
    servicesLoading ||
    categoriesLoading
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-2 text-[#00224A]">
          <Loader2 className="h-5 w-5 animate-spin text-[#EC620B]" />
          Loading your profile...
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    userError ||
    servicesError ||
    categoriesError
  ) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          Failed to load your profile or services.
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-semibold text-[#00224A] md:text-2xl">
            Service Management
          </h1>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Manage your profile, services, experience, and pricing.
          </p>
        </div>

        <button
          type="submit"
          form="technician-profile-form"
          disabled={isUpdatingProfile}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdatingProfile ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}

          {isUpdatingProfile ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* ===================================================
          PROFILE FORM
      =================================================== */}

      <form
        id="technician-profile-form"
        onSubmit={handleProfileSubmit}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Profile
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                Your technician information.
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#EC620B] text-white">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Technician"}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <UserRound className="h-14 w-14" />
                )}
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#00224A]">
                {formData.name || "Technician"}
              </h3>

              <p className="mt-1 text-sm text-[#00224A]/50">
                Professional Technician
              </p>

              <div className="mt-4 flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" />

                {technician?.isVerified
                  ? "Verified Technician"
                  : "Technician"}
              </div>
            </div>
          </div>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                Keep your personal information up to date.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
              <InputField
                label="Full Name"
                id="name"
                value={formData.name}
                onChange={handleProfileChange}
                icon={<UserRound className="h-4 w-4" />}
                readOnly
              />

              {/* EMAIL READ ONLY */}

              <InputField
                label="Email Address"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleProfileChange}
                icon={<Mail className="h-4 w-4" />}
                readOnly
              />

              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleProfileChange}
                readOnly
              />

              <InputField
                label="Location"
                id="location"
                value={formData.location}
                onChange={handleProfileChange}
                icon={<MapPin className="h-4 w-4" />}
              />

              <InputField
                label="Experience (Years)"
                id="experience"
                type="number"
                value={formData.experience}
                onChange={handleProfileChange}
              />

              <InputField
                label="Hourly Rate ($)"
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={handleProfileChange}
              />

              <div className="md:col-span-2">
                <InputField
                  label="Skills"
                  id="skills"
                  value={formData.skills}
                  onChange={handleProfileChange}
                  placeholder="Plumbing, Electrical, Pipe Repair"
                />

                <p className="mt-1 text-xs text-[#00224A]/45">
                  Separate multiple skills with commas.
                </p>
              </div>

              {/* BIO */}

              <div className="md:col-span-2">
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  About You
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  value={formData.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell customers about your experience and services..."
                  className="w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm lg:col-span-3">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Services & Pricing
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                Add, update, or remove your services.
              </p>
            </div>

            <div className="space-y-6 p-5">
              {/* =================================================
                  SERVICE LIST
              ================================================= */}

              <div className="space-y-4">
                {services.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-[#00224A]/20 p-6 text-center text-sm text-[#00224A]/50">
                    No services found. Add your first service below.
                  </div>
                ) : (
                  services.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-[#00224A]/10 p-5"
                    >
                      {editingServiceId === service.id ? (
                        /* =================================================
                           EDIT SERVICE
                        ================================================= */

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <InputField
                            label="Service Name"
                            id="name"
                            value={editingService.name}
                            onChange={handleEditServiceChange}
                          />

                          <InputField
                            label="Price ($)"
                            id="price"
                            type="number"
                            value={editingService.price}
                            onChange={handleEditServiceChange}
                          />

                          <InputField
                            label="Location"
                            id="location"
                            value={editingService.location}
                            onChange={handleEditServiceChange}
                          />

                          {/* CATEGORY DROPDOWN */}

                          <CategorySelect
                            value={editingService.categoryId}
                            onChange={(value) =>
                              setEditingService((current) => ({
                                ...current,
                                categoryId: value,
                              }))
                            }
                            categories={categories}
                          />

                          <div className="md:col-span-2">
                            <label
                              htmlFor="description"
                              className="mb-2 block text-sm font-medium text-[#00224A]"
                            >
                              Description
                            </label>

                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              value={editingService.description}
                              onChange={handleEditServiceChange}
                              className="w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm outline-none focus:border-[#EC620B]"
                            />
                          </div>

                          <div className="flex gap-2 md:col-span-2">
                            <button
                              type="button"
                              disabled={isUpdatingService}
                              onClick={handleUpdateService}
                              className="inline-flex items-center gap-2 rounded-lg bg-[#EC620B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d95708] disabled:opacity-60"
                            >
                              {isUpdatingService && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              )}

                              {isUpdatingService
                                ? "Updating..."
                                : "Update Service"}
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditingServiceId(null)}
                              className="rounded-lg border border-[#00224A]/15 px-4 py-2 text-sm font-medium text-[#00224A]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* =================================================
                           SERVICE DISPLAY
                        ================================================= */

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <h3 className="font-bold text-[#00224A]">
                              {service.name}
                            </h3>

                            {service.description && (
                              <p className="mt-1 text-sm text-[#00224A]/60">
                                {service.description}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#00224A]/55">
                              {service.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {service.location}
                                </span>
                              )}

                              {service.category?.name && (
                                <span>
                                  Category: {service.category.name}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="whitespace-nowrap text-lg font-bold text-[#00224A]">
                              ${service.price ?? 0}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleStartEdit(service)
                              }
                              className="rounded-lg border border-[#00224A]/15 px-4 py-2 text-sm font-medium text-[#00224A] hover:border-[#EC620B] hover:text-[#EC620B]"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              disabled={isDeletingService}
                              onClick={() =>
                                handleDeleteService(service.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-50"
                              aria-label={`Delete ${service.name}`}
                            >
                              {isDeletingService ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* =================================================
                  ADD SERVICE
              ================================================= */}

              <div className="rounded-xl border border-[#00224A]/10 bg-[#00224A]/[0.02] p-5">
                <div className="mb-4">
                  <h3 className="font-bold text-[#00224A]">
                    Add New Service
                  </h3>

                  <p className="mt-1 text-xs text-[#00224A]/50">
                    Add a service with name, description, price,
                    location, and category.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Service Name"
                    id="name"
                    value={newService.name}
                    onChange={handleNewServiceChange}
                    placeholder="Home Cleaning Service"
                  />

                  <InputField
                    label="Price ($)"
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={handleNewServiceChange}
                    placeholder="50"
                  />

                  <InputField
                    label="Location"
                    id="location"
                    value={newService.location}
                    onChange={handleNewServiceChange}
                    placeholder="Banasree, Dhaka"
                  />

                  {/* CATEGORY DROPDOWN */}

                  <CategorySelect
                    value={newService.categoryId}
                    onChange={(value) =>
                      setNewService((current) => ({
                        ...current,
                        categoryId: value,
                      }))
                    }
                    categories={categories}
                  />

                  <div className="md:col-span-2">
                    <label
                      htmlFor="service-description"
                      className="mb-2 block text-sm font-medium text-[#00224A]"
                    >
                      Description
                    </label>

                    <textarea
                      id="service-description"
                      name="description"
                      rows={4}
                      value={newService.description}
                      onChange={handleNewServiceChange}
                      placeholder="Complete home cleaning and deep cleaning service"
                      className="w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddService}
                      disabled={isCreatingService}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#EC620B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d95708] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isCreatingService ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}

                      {isCreatingService
                        ? "Adding..."
                        : "Add Service"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              PROFILE SUMMARY
          ================================================= */}

          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm lg:col-span-3">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Profile Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryItem
                label="Experience"
                value={`${formData.experience || 0} Years`}
              />

              <SummaryItem
                label="Hourly Rate"
                value={`$${formData.hourlyRate || 0}/hr`}
              />

              <SummaryItem
                label="Services"
                value={services.length.toString()}
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#00224A]/60">
                  Status
                </span>

                <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   CATEGORY SELECT
========================================================= */

function CategorySelect({
  value,
  onChange,
  categories,
}: {
  value: string;
  onChange: (value: string) => void;
  categories: Category[];
}) {
  return (
    <div>
      <label
        htmlFor="categoryId"
        className="mb-2 block text-sm font-medium text-[#00224A]"
      >
        Category
      </label>

      <select
        id="categoryId"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white px-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
      >
        <option value="">Select a category</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   REUSABLE INPUT
========================================================= */

function InputField({
  label,
  id,
  value,
  onChange,
  type = "text",
  icon,
  readOnly = false,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#00224A]"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00224A]/40">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border border-[#00224A]/15 px-3 text-sm text-[#00224A] outline-none focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20 ${
            icon ? "pl-10" : ""
          } ${
            readOnly
              ? "cursor-not-allowed bg-[#00224A]/5 text-[#00224A]/60"
              : "bg-white"
          }`}
        />
      </div>

      {readOnly && (
        <p className="mt-1 text-xs text-[#00224A]/45">
          Email address cannot be changed.
        </p>
      )}
    </div>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#00224A]/[0.03] p-4">
      <span className="text-sm text-[#00224A]/60">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#00224A]">
        {value}
      </span>
    </div>
  );
}