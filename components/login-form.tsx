"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { logIn } from "@/app/actions/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function clientAction(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const result = await logIn(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <form
      action={clientAction}
      className={cn("flex flex-col gap-6 font-display", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          {/* MUST have the name="email" attribute */}
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-[#10b77f]"
            >
              Forgot your password?
            </a>
          </div>
          {/* MUST have the name="password" attribute */}
          <Input id="password" name="password" type="password" required />
        </Field>

        <Field>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-[#10b77f] hover:bg-[#0e9f6e] text-white font-bold disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Field>
        
        <FieldDescription className="text-center">
          Don't have an account?{" "}
          <a href="/sign-up" className="underline underline-offset-4 text-[#10b77f] hover:text-[#0e9f6e]">
            Sign up
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}