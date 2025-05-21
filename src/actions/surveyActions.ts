
'use server';

import { createServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type SurveyInput = {
  survey_id: string;
  responses: any;
};

export async function submitSurvey(values: SurveyInput) {
  const supabase = createServerClient(cookies());
  const { data: user, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user?.user) {
    return { error: "You must be signed in to submit a survey." };
  }
  // Basic validation
  if (!values.survey_id) {
    return { error: "Survey ID required." };
  }
  if (
    !values.responses ||
    typeof values.responses !== "object" ||
    Object.keys(values.responses).length === 0
  ) {
    return { error: "Responses are required." };
  }

  const { error } = await supabase.from("survey_responses").insert([
    {
      user_id: user.user.id,
      survey_id: values.survey_id,
      responses: values.responses,
    },
  ]);

  if (error) {
    return { error: error.message || "Failed to save survey response." };
  }
  return { success: true };
}
