
import { Metadata } from "next";
import { Suspense } from "react";
import SurveyForm from "@/components/ui/survey-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Patient Feedback Survey",
};

export default function SurveyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 via-white to-blue-100 py-8 px-2">
      <div className="max-w-xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
        <Image
          src="https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Patient feedback"
          width={160}
          height={160}
          className="rounded-full mb-4 shadow-lg"
          unoptimized
        />
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-2 tracking-tight">
          We Value Your Feedback
        </h1>
        <p className="text-gray-700 text-center mb-7">
          Help us improve your care experience by sharing your thoughts below.
        </p>
        <Suspense fallback={<div className="w-full text-center py-8">Loading survey...</div>}>
          <SurveyForm />
        </Suspense>
      </div>
    </div>
  );
}
