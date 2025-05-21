
import { Metadata } from "next";
import { Suspense } from "react";
import OnboardingForm from "@/components/ui/onboarding-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Patient Onboarding",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-teal-100 py-8 px-2">
      <div className="max-w-xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
        <Image
          src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Smiling patient"
          width={160}
          height={160}
          className="rounded-full mb-4 shadow-lg"
          unoptimized
        />
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-2 tracking-tight">
          Welcome to Your Health Journey
        </h1>
        <p className="text-gray-700 text-center mb-7">
          Let's get you started. Please fill out your details to personalize your experience.
        </p>
        <Suspense fallback={<div className="w-full text-center py-8">Loading form...</div>}>
          <OnboardingForm />
        </Suspense>
      </div>
    </div>
  );
}
