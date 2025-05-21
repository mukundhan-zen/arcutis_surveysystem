'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type OnboardingInput = {
  name: string;
  email: string;
};

export async function createOnboarding(values: OnboardingInput) {
  const supabase = await createClient();
  const { data: user, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user?.user) {
    return { error: "You must be signed in to complete onboarding." };
  }

  // Simple validation
  if (!values.name || values.name.length < 2) {
    return { error: "Name is required." };
  }
  if (
    !values.email ||
    !/^[^@]+@[^@]+\.[^@]+$/.test(values.email) ||
    values.email.length < 3
  ) {
    return { error: "A valid email address is required." };
  }

  const { error } = await supabase.from("onboarding_data").insert([
    {
      user_id: user.user.id,
      name: values.name,
      email: values.email,
    },
  ]);

  if (error) {
    return { error: error.message || "Failed to save onboarding info." };
  }
  return { success: true };
}