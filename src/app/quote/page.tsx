"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { materialOptions, quantityOptions, deadlineOptions, quoteFormContent } from "@/lib/content";
import { quoteSchema, type QuoteFormValues } from "@/lib/quote-schema";

const steps = ["Contact", "Project", "Details", "Confirm"];

export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
  });

  const nextStep = async () => {
    const fieldsPerStep: (keyof QuoteFormValues)[][] = [
      ["name", "email"],
      ["material", "quantity", "description", "deadline"],
      ["notes"],
    ];

    if (step < 3) {
      const valid = await trigger(fieldsPerStep[step]);
      if (valid) setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setTrackingCode(json.trackingCode ?? null);
        setSuccessMessage(json.message ?? "Quote request received.");
      } else {
        setSuccessMessage(json.message ?? "Something went wrong. Please try again or email us directly at ok3dinc@gmail.com.");
      }
      setSubmitted(true);
    } catch {
      setSuccessMessage("Something went wrong. Please try again or email us directly at ok3dinc@gmail.com.");
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          {/* Animated checkmark */}
          <div className="relative mx-auto w-20 h-20 mb-8">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center border-2 border-accent">
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckIcon className="w-10 h-10 text-accent" />
              </motion.div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3">Quote Request Sent</h2>
          <p className="text-gray-400 mb-6">
            {successMessage ||
              "We\u2019ll review your project and send a detailed quote within 24 hours."}
          </p>
          {trackingCode && (
            <div className="mb-8 bg-accent/10 border border-accent/30 rounded-xl px-6 py-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">
                Tracking Code
              </p>
              <p className="font-mono text-accent text-base break-all">
                {trackingCode}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Save this code to check the status of your order.
              </p>
            </div>
          )}
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
          {/* TODO: replace with real Calendly link */}
          <a
            href="https://calendly.com/ok3dinc"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            Want to talk through your project? Schedule a call →
          </a>
        </motion.div>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white font-bold text-xs">
              3D
            </div>
            <span className="font-semibold text-sm">Get a Quote</span>
          </div>
          <div className="w-14" /> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-border">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: "25%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </nav>

      {/* Form */}
      <div className="pt-28 pb-16 px-6 max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-12 text-sm">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`font-mono text-xs ${
                  i <= step ? "text-accent" : "text-gray-600"
                }`}
              >
                {i + 1}. {s}
              </span>
              {i < steps.length - 1 && (
                <span className="text-gray-700">/</span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-2">Contact Info</h2>
                <p className="text-gray-400 text-sm mb-8">
                  How can we reach you?
                </p>

                <InputField
                  label="Full Name"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <InputField
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <InputField
                  label="Company (optional)"
                  {...register("company")}
                />
                <InputField
                  label="Phone (optional)"
                  type="tel"
                  {...register("phone")}
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-2">Project Details</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Tell us about what you need printed.
                </p>

                <SelectField
                  label="Material"
                  options={materialOptions}
                  error={errors.material?.message}
                  {...register("material")}
                />
                <SelectField
                  label="Quantity"
                  options={quantityOptions}
                  error={errors.quantity?.message}
                  {...register("quantity")}
                />
                <TextareaField
                  label={quoteFormContent.step2DescriptionLabel}
                  placeholder={quoteFormContent.step2DescriptionPlaceholder}
                  error={errors.description?.message}
                  {...register("description")}
                />
                <SelectField
                  label="Deadline"
                  options={deadlineOptions}
                  error={errors.deadline?.message}
                  {...register("deadline")}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-2">
                  Additional Details
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Anything else we should know?
                </p>

                <TextareaField
                  label="Notes (optional)"
                  rows={6}
                  {...register("notes")}
                />

                <div className="bg-card border border-border rounded-lg p-4 text-sm text-gray-400">
                  <p>
                    You can also email CAD files (STL, STEP, 3MF, OBJ) directly
                    to{" "}
                    <span className="text-accent">ok3dinc@gmail.com</span>{" "}
                    after submitting.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Double-check your details before sending.
                </p>

                <SummaryBlock data={getValues()} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {step > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button type="button" onClick={nextStep} magnetic>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={submitting} magnetic>
                {submitting ? "Sending..." : "Submit Quote Request"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Form components ---

import { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        placeholder=" "
        className={`peer w-full bg-transparent border-b-2 ${
          error ? "border-red-500" : "border-border focus:border-accent"
        } py-3 pt-6 text-white outline-none transition-colors`}
        {...props}
      />
      <label className="absolute left-0 top-1 text-xs text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent transition-all pointer-events-none">
        {label}
      </label>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
);
InputField.displayName = "InputField";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, ...props }, ref) => (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <select
        ref={ref}
        className={`w-full bg-transparent border-b-2 ${
          error ? "border-red-500" : "border-border focus:border-accent"
        } py-3 text-white outline-none transition-colors appearance-none cursor-pointer`}
        {...props}
      >
        <option value="" className="bg-background">
          Select...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-background">
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
);
SelectField.displayName = "SelectField";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <textarea
        ref={ref}
        rows={4}
        className={`w-full bg-transparent border-b-2 ${
          error ? "border-red-500" : "border-border focus:border-accent"
        } py-3 text-white outline-none transition-colors resize-none`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
);
TextareaField.displayName = "TextareaField";

function SummaryBlock({ data }: { data: QuoteFormValues }) {
  const rows = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Company", value: data.company || "—" },
    { label: "Material", value: data.material },
    { label: "Quantity", value: data.quantity },
    { label: "Deadline", value: data.deadline },
    { label: "Description", value: data.description },
    { label: "Notes", value: data.notes || "—" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl divide-y divide-border">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between px-5 py-3">
          <span className="text-gray-500 text-sm">{row.label}</span>
          <span className="text-sm text-right max-w-[60%]">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
