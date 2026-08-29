/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import Logo from "@/assets/logo.png";

import { useLoginMutation } from "@/redux/api/authApi";

import { useAppDispatch } from "@/redux/hooks";

import { setUser } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";

interface LoginFormData {
  email: string;
  password: string;
}

interface JwtPayload {
  id: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [login, { isLoading }] = useLoginMutation();

  const onLogin = async (data: LoginFormData) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("Login response:", response);

      if (response?.success) {
        const accessToken = response?.data?.accessToken;

        if (!accessToken) {
          toast.error("Access token not found.");
          return;
        }

        // Store token in Redux
        dispatch(
          setUser({
            token: accessToken,
          })
        );

        // Decode JWT
        const decoded = jwtDecode<JwtPayload>(accessToken);

        const role = decoded.role;

        console.log("Decoded user:", decoded);
        console.log("User role:", role);

        toast.success("Logged in successfully!");

        reset();

        // Redirect according to role
        switch (role) {
          case "ADMIN":
            router.push("/admin");
            break;

          case "TECHNICIAN":
            router.push("/technician");
            break;

          case "CUSTOMER":
            router.push("/customer");
            break;

          default:
            toast.error("Unable to determine your account role.");
            break;
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);

      const errorMessage =
        error?.data?.message ||
        "Login failed. Please check your credentials.";

      toast.error(errorMessage);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-[0_10px_40px_rgba(0,34,74,0.08)] sm:px-8 sm:py-10">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
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
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#00224A] sm:text-3xl">
              Log in
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to your FixItNow account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#00224A]"
              >
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#00224A]"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-12 rounded-lg border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:border-[#EC620B] focus-visible:ring-2 focus-visible:ring-[#EC620B]/10"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
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
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-[#EC620B] text-sm font-semibold text-white transition hover:bg-[#d95608] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>

            {/* Register */}
            <p className="pt-2 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-[#EC620B] transition hover:underline"
              >
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;