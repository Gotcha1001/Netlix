"use client";

import { createClient } from "@/lib/supabase/client";
import React, { useMemo, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/auth/Header";
import Background from "@/components/auth/Background";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characers"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const Page = () => {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const flat = z.flattenError(result.error);
      setFieldErrors({
        email: flat.fieldErrors.email?.[0],
        password: flat.fieldErrors.password?.[0],
      });
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      await axios.post("/api/auth/login").catch((err) => {
        setError(err.response?.data?.error || "An error occurred during login");
      });

      router.push("/");
    } catch (error) {
      console.log("There was an error logging in");
      setError("An error occured during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      <Header />
      <Background />
      <div className="flex-1 flex items-center flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-black/65 rounded-lg flex flex-col gap-4 w-full max-w-md"
        >
          <h1 className="mb-4 text-2xl font-bold text-white">Sign In</h1>
          <div className="flex gap-1 flex-col">
            <Input
              placeholder="Write your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-1 flex-col">
            <Input
              placeholder="Write your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs">{fieldErrors.password}</p>
            )}
            <Link
              href={"/forogt-password"}
              className="text-white/50 text-xs hover:text-white self-end mt-1"
            >
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <Button type="submit" variant={"brand-primary"} className="h-12">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
