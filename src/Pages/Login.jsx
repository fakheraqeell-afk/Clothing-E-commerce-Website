import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// =========================
// Validation Schema
// =========================

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .min(6, "username must be at least 6 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// =========================
// Login Component
// =========================

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // =========================
  // Submit
  // =========================

  const onSubmit = async () => {
    setServerError("");

    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login',
        {
          "username": "mor_2314",
          "password": "83r5^_"
        }
      );

      console.log("Login successful:", response.data);
      localStorage.setItem('token', response.data.token)
      window.location = '/'

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setServerError(
          error.response.data?.message ||
          error.response.data?.detail ||
          "Invalid email or password."
        );
      } else if (error.request) {
        setServerError(
          "Unable to connect to the server. Please try again."
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f7f7f7] font-sans text-[#111]">

      {/* =========================
          Header
      ========================= */}

      <header className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-16">

        {/* Logo */}
        <a
          href="/"
          className="text-xl font-black tracking-[-2px]"
        >
          XIV
          <span className="ml-1 text-[#d9d9d9]">
            QR
          </span>
        </a>

        {/* Back */}
        <a
          href="/"
          className="text-[10px] tracking-wide text-[#888] transition-colors hover:text-black sm:text-[11px]"
        >
          BACK TO HOME
        </a>

      </header>

      {/* =========================
          Login Section
      ========================= */}

      <section className="flex min-h-[calc(100vh-150px)] items-center justify-center px-6 py-12 sm:py-16">

        <div className="w-full max-w-[420px]">

          {/* Heading */}

          <div className="mb-12">

            <span className="text-[10px] tracking-wide text-[#a4a4a4] sm:text-[11px]">
              ACCOUNT
            </span>

            <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-4px] sm:text-6xl">
              LOGIN
            </h1>

          </div>

          {/* =========================
              Server Error
          ========================= */}

          {serverError && (
            <div className="mb-8 border-l-2 border-black bg-[#eeeeee] px-4 py-3">

              <p className="text-[11px] leading-5 text-[#555]">
                {serverError}
              </p>

            </div>
          )}

          {/* =========================
              Form
          ========================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-8"
          >

            {/* =========================
                username
            ========================= */}

            <div>

              <label
                htmlFor="email"
                className="mb-3 block text-[10px] tracking-wide text-[#999] sm:text-[11px]"
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="text"
                placeholder="your username"
                autoComplete="username"
                {...register("username")}
                className={`w-full border-b bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#c5c5c5] ${
                  errors.username
                    ? "border-red-500"
                    : "border-[#cfcfcf] focus:border-black"
                }`}
              />

              {errors.username && (
                <p className="mt-2 text-[10px] text-red-500">
                  {errors.username.message}
                </p>
              )}

            </div>

            {/* =========================
                Password
            ========================= */}

            <div>

              <div className="mb-3 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-[10px] tracking-wide text-[#999] sm:text-[11px]"
                >
                  PASSWORD
                </label>

                <a
                  href="/forgot-password"
                  className="text-[9px] text-[#999] transition-colors hover:text-black sm:text-[10px]"
                >
                  FORGOT PASSWORD?
                </a>

              </div>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  className={`w-full border-b bg-transparent px-0 py-3 pr-14 text-sm outline-none transition-colors placeholder:text-[#c5c5c5] ${
                    errors.password
                      ? "border-red-500"
                      : "border-[#cfcfcf] focus:border-black"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] tracking-wide text-[#999] transition-colors hover:text-black sm:text-[10px]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>

              </div>

              {errors.password && (
                <p className="mt-2 text-[10px] text-red-500">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* =========================
                Remember Me
            ========================= */}

            <div className="flex items-center gap-3 pt-1">

              <input
                id="remember"
                type="checkbox"
                className="h-3.5 w-3.5 cursor-pointer accent-black"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-[10px] text-[#777] sm:text-[11px]"
              >
                REMEMBER ME
              </label>

            </div>

            {/* =========================
                Submit Button
            ========================= */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-between bg-black px-5 py-4 text-[10px] font-medium tracking-wide text-white transition-all hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[11px]"
            >

              <span>
                {isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </button>

          </form>

          {/* =========================
              Register
          ========================= */}

          <div className="mt-10 border-t border-[#dedede] pt-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">

              <span className="text-[10px] text-[#999] sm:text-[11px]">
                DONT HAVE AN ACCOUNT?
              </span>

              <a
                href="/register"
                className="w-fit text-[10px] font-medium tracking-wide underline underline-offset-4 transition-colors hover:text-[#777] sm:text-[11px]"
              >
                CREATE ACCOUNT
              </a>

            </div>

          </div>

        </div>

      </section>


    </main>
  );
};

export default Login;