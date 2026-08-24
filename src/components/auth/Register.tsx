"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .min(11, "Phone number must be 11 digits")
      .max(15, "Phone number is too long")
      .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),

    address: z
      .string()
      .min(3, "Address is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegister = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      // API integration will be added later.
      const registrationData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      };

      console.log("Registration data:", registrationData);

      // Temporary success message
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Registration form submitted successfully!");

      reset();

      // Later:
      // const response = await registration(registrationData).unwrap();
      // router.push("/auth/login");

    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 sm:py-10">
      <div className="w-full max-w-md">
        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-xl sm:px-8 sm:py-9">
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <Image
              src={Logo}
              alt="FixItNow"
              width={180}
              height={180}
              priority
              className="h-16 w-auto object-contain sm:h-20"
            />
          </div>

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#00224A] sm:text-3xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create your FixItNow account to get started
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onRegister)}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#00224A]"
              >
                Full Name
              </label>

              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                className="h-11 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                {...register("name")}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#00224A]"
              >
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="h-11 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-[#00224A]"
              >
                Phone Number
              </label>

              <Input
                id="phone"
                type="tel"
                placeholder="01700000000"
                autoComplete="tel"
                className="h-11 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                {...register("phone")}
              />

              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-1.5 block text-sm font-medium text-[#00224A]"
              >
                Address
              </label>

              <Input
                id="address"
                type="text"
                placeholder="Enter your address"
                autoComplete="street-address"
                className="h-11 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                {...register("address")}
              />

              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#00224A]"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="h-11 rounded-lg border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-[#00224A]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={17} />
                  ) : (
                    <FaEye size={17} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-[#00224A]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="h-11 rounded-lg border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-[#00224A]"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={17} />
                  ) : (
                    <FaEye size={17} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-11 w-full rounded-lg bg-[#EC620B] text-sm font-semibold text-white transition hover:bg-[#d95608] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            {/* Login Link */}
            <p className="pt-2 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#EC620B] transition hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;