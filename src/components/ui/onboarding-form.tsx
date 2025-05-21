
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createOnboarding } from "@/src/actions/onboardingActions";

export default function OnboardingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await createOnboarding({ name, email });
      if (res?.error) {
        setError(res.error);
        toast.error(res.error);
      } else {
        toast.success("Onboarding complete! Welcome aboard.");
        router.push("/"); // Go to homepage or dashboard
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
        <form className="flex flex-col gap-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <Label htmlFor="onb-name" className="text-base text-blue-900 font-medium mb-1 block">
              Full Name
            </Label>
            <Input
              id="onb-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              required
              autoFocus
              className="bg-white/90"
              minLength={2}
              maxLength={64}
            />
          </div>
          <div>
            <Label htmlFor="onb-email" className="text-base text-blue-900 font-medium mb-1 block">
              Email Address
            </Label>
            <Input
              id="onb-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="bg-white/90"
              pattern="^[^@]+@[^@]+\.[^@]+$"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-md">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-xl transition duration-150 py-2 text-lg"
            disabled={loading || !name || !email}
          >
            {loading ? "Submitting..." : "Start My Journey"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
