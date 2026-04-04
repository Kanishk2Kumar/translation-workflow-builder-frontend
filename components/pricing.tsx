import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing that Scales with You
          </h1>
          <p>
            VoiceMed AI enables hospitals and healthcare providers to build
            AI-powered voice agents and communication systems with built-in
            compliance and real-time intelligence.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
          <Card className="flex flex-col bg-transparent text-gray-100">
            <CardHeader>
              <CardTitle className="font-medium">Free</CardTitle>
              <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
              <CardDescription className="text-sm">Per editor</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Basic Voice Agent Builder",
                  "1 Workflow Nodes",
                  "1 Healthcare Template",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link href="">Start Free</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative bg-transparent text-gray-100 border-green-500">
            <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-green-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Most Popular
            </span>

            <div className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-medium">Pro</CardTitle>
                <span className="my-3 block text-2xl font-semibold">
                  $19 / mo
                </span>
                <CardDescription className="text-sm">
                  Per editor
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 mt-6">
                <hr className="border-dashed" />
                <ul className="list-outside space-y-3 text-sm">
                  {[
                    "Everything in Free Plan",
                    "Advanced Voice Agent Workflows",
                    "Multilingual Translation Engine",
                    "Compliance & Risk Scoring",
                    "Real-time Debug Panel",
                    "Access to Healthcare Templates",
                    "Exportable API",
                    "Priority Email & Chat Support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full mt-8 hover:bg-green-600 text-gray-900 font-black"
                >
                  <Link href="">Get Started</Link>
                </Button>
              </CardFooter>
            </div>
          </Card>

          <Card className="flex flex-col bg-transparent text-gray-100">
            <CardHeader>
              <CardTitle className="font-medium">Startup</CardTitle>
              <span className="my-3 block text-2xl font-semibold">
                $29 / mo
              </span>
              <CardDescription className="text-sm">Per editor</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Pro Plan",
                  "Full Compliance & Audit Logs",
                  "On-prem / Private Deployment Options",
                  "Dedicated Support & SLA",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link href="">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
