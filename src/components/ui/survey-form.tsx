
'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { submitSurvey } from "@/src/actions/surveyActions";
import { useRouter } from "next/navigation";

const defaultQuestions = [
  {
    id: "q1",
    question: "How would you rate your overall experience?",
    type: "rating",
    options: [
      { value: "1", label: "1 - Poor" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5 - Excellent" },
    ],
  },
  {
    id: "q2",
    question: "What did you like most about your care?",
    type: "text",
  },
  {
    id: "q3",
    question: "Any suggestions for improvement?",
    type: "text",
  },
];

export default function SurveyForm() {
  const [responses, setResponses] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleInput(id: string, value: string) {
    setResponses((prev: any) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Basic validation: Ensure all questions are answered
    for (const q of defaultQuestions) {
      if (!responses[q.id] || (q.type === "rating" && responses[q.id] === "")) {
        setError("Please answer all questions before submitting.");
        setLoading(false);
        return;
      }
    }
    try {
      const res = await submitSurvey({
        survey_id: "default", // In a real app, use actual survey id
        responses,
      });
      if (res?.error) {
        setError(res.error);
        toast.error(res.error);
      } else {
        toast.success("Survey submitted! Thank you for your feedback.");
        router.push("/");
      }
    } catch (err: any) {
      setError("Unexpected error. Please try again.");
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-white/95">
      <CardContent className="p-0">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="off">
          {defaultQuestions.map(q =>
            q.type === "rating" ? (
              <div key={q.id}>
                <Label className="font-medium text-teal-900">{q.question}</Label>
                <RadioGroup
                  className="flex gap-3 mt-2"
                  value={responses[q.id] || ""}
                  onValueChange={val => handleInput(q.id, val)}
                  required
                >
                  {q.options.map(opt => (
                    <RadioGroupItem
                      key={opt.value}
                      value={opt.value}
                      id={`${q.id}-${opt.value}`}
                      className="peer sr-only"
                    />
                  ))}
                  <div className="flex gap-2">
                    {q.options.map(opt => (
                      <label
                        htmlFor={`${q.id}-${opt.value}`}
                        key={opt.value}
                        className={`inline-block px-3 py-1 rounded-full border-2 cursor-pointer transition-all
                          ${
                            responses[q.id] === opt.value
                              ? "bg-teal-700 text-white border-teal-700 shadow-md"
                              : "bg-white border-gray-300 text-gray-600 hover:bg-teal-50"
                          }
                        `}
                      >
                        {opt.label}
                        <RadioGroupItem
                          value={opt.value}
                          id={`${q.id}-${opt.value}`}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ) : (
              <div key={q.id}>
                <Label htmlFor={q.id} className="font-medium text-teal-900">
                  {q.question}
                </Label>
                <Textarea
                  id={q.id}
                  value={responses[q.id] || ""}
                  onChange={e => handleInput(q.id, e.target.value)}
                  className="bg-white/90 mt-2"
                  rows={q.type === "text" ? 3 : 1}
                  required
                />
              </div>
            )
          )}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-md">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-2 bg-teal-700 hover:bg-teal-900 text-white font-semibold rounded-xl transition duration-150 py-2 text-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
