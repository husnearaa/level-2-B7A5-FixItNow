"use client";

import {
  Camera,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const initialSkills = [
  "Plumbing",
  "Electrical",
  "AC Repair",
  "Home Cleaning",
];

export default function TechnicianProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    experience: "5",
    price: "80",
    bio: "Professional home service technician with over 5 years of experience providing reliable and quality services.",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  // Add new skill
  const handleAddSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    const alreadyExists = skills.some(
      (existingSkill) =>
        existingSkill.toLowerCase() === skill.toLowerCase(),
    );

    if (alreadyExists) return;

    setSkills((current) => [...current, skill]);
    setNewSkill("");
    setSaved(false);
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((current) =>
      current.filter((skill) => skill !== skillToRemove),
    );

    setSaved(false);
  };

  // Handle profile image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setSaved(false);
  };

  // Submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend/API call can be added here later.
    setSaved(true);
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="md:text-2xl text-lg font-semibold text-[#00224A]">
            Service Management
          </h1>

          <p className="mt-1 text-sm text-[#00224A]/60">
            Manage your technician profile, skills, experience, and
            pricing.
          </p>
        </div>

        {/* Save Changes */}
        <button
          type="submit"
          form="technician-profile-form"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#EC620B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d95708] focus:outline-none focus:ring-2 focus:ring-[#EC620B]/30"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-5 w-5" />
          Your profile has been updated successfully.
        </div>
      )}

      <form
        id="technician-profile-form"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ========================================
              PROFILE PICTURE
          ======================================== */}
          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Profile Picture
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                Update your profile photo.
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="relative">
                {/* Avatar */}
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-[#EC620B] text-white shadow-sm">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Technician profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-16 w-16" />
                  )}
                </div>

                {/* Hidden image input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Camera */}
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#EC620B] text-white shadow-md transition-colors hover:bg-[#d95708]"
                  aria-label="Upload profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#00224A]">
                {formData.name || "Technician"}
              </h3>

              <p className="mt-1 text-sm text-[#00224A]/50">
                Professional Technician
              </p>

              <div className="mt-4 flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Technician
              </div>
            </div>
          </div>

          {/* ========================================
              PERSONAL INFORMATION
          ======================================== */}
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
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00224A]/40" />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-lg border border-[#00224A]/15 bg-white pl-10 pr-3 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================
              SERVICES & PRICING
          ======================================== */}
          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Services & Pricing
              </h2>

              <p className="mt-1 text-sm text-[#00224A]/60">
                Add your skills and set your service pricing.
              </p>
            </div>

            <div className="space-y-6 p-5">
              {/* Skills */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#00224A]">
                  Skills & Services
                </label>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full bg-[#EC620B]/10 px-3 py-1.5 text-sm font-medium text-[#EC620B]"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveSkill(skill)
                        }
                        className="transition-colors hover:text-red-600"
                        aria-label={`Remove ${skill}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => {
                      setNewSkill(e.target.value);
                      setSaved(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Add a skill..."
                    className="h-10 flex-1 rounded-lg border border-[#00224A]/15 px-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                  />

                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#EC620B] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#d95708]"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Experience & Price */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className="mb-2 block text-sm font-medium text-[#00224A]"
                  >
                    Experience
                  </label>

                  <div className="relative">
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-lg border border-[#00224A]/15 px-3 pr-16 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#00224A]/50">
                      Years
                    </span>
                  </div>
                </div>

                {/* Starting Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-[#00224A]"
                  >
                    Starting Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#00224A]/50">
                      $
                    </span>

                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-lg border border-[#00224A]/15 pl-7 pr-16 text-sm text-[#00224A] outline-none transition-colors focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#00224A]/50">
                      / hour
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-[#00224A]"
                >
                  About You
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-lg border border-[#00224A]/15 p-3 text-sm text-[#00224A] outline-none transition-colors placeholder:text-[#00224A]/40 focus:border-[#EC620B] focus:ring-1 focus:ring-[#EC620B]/20"
                  placeholder="Tell customers about your experience and services..."
                />
              </div>
            </div>
          </div>

          {/* ========================================
              PROFILE SUMMARY
          ======================================== */}
          <div className="rounded-xl border border-[#00224A]/10 bg-white shadow-sm">
            <div className="border-b border-[#00224A]/10 p-5">
              <h2 className="text-lg font-bold text-[#00224A]">
                Profile Summary
              </h2>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#00224A]/60">
                  Experience
                </span>

                <span className="text-sm font-semibold text-[#00224A]">
                  {formData.experience || 0} Years
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#00224A]/60">
                  Hourly Rate
                </span>

                <span className="text-sm font-semibold text-[#00224A]">
                  ${formData.price || 0}/hr
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#00224A]/60">
                  Services
                </span>

                <span className="text-sm font-semibold text-[#00224A]">
                  {skills.length}
                </span>
              </div>

              <div className="border-t border-[#00224A]/10 pt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Profile Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}