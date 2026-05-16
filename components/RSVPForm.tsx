// components/RSVPForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { rsvpSchema, type RsvpInput } from "@/lib/validations";
import SuccessOverlay from "./SuccessOverlay";
import WaveDivider from "./ocean/WaveDivider";

interface RSVPFormProps {
  maxAdults: number | null;
  maxChildren: number | null;
  name: string | null;
}

export default function RSVPForm({ maxAdults, maxChildren, name }: RSVPFormProps) {
  const authorized = maxAdults !== null && maxChildren !== null;
  const [showSuccess, setShowSuccess] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [willAttend, setWillAttend] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      adult_attendees: 1,
      child_attendees: 0,
      name: name ?? "",
    },
  });

  function incrementAdults() {
    if (maxAdults !== null && adults < maxAdults) {
      const next = adults + 1;
      setAdults(next);
      setValue("adult_attendees", next);
    }
  }

  function decrementAdults() {
    if (adults > 1) {
      const next = adults - 1;
      setAdults(next);
      setValue("adult_attendees", next);
    }
  }

  function incrementChildren() {
    if (maxChildren !== null && children < maxChildren) {
      const next = children + 1;
      setChildren(next);
      setValue("child_attendees", next);
    }
  }

  function decrementChildren() {
    if (children > 0) {
      const next = children - 1;
      setChildren(next);
      setValue("child_attendees", next);
    }
  }

  async function onSubmit(data: RsvpInput) {
    setToast(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          adult_attendees: data.adult_attendees,
          child_attendees: data.child_attendees,
          will_attend: data.will_attend,
          message: data.message ?? null,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setToast((json as { error?: string }).error ?? "Something went wrong. Please try again.");
        return;
      }
      reset();
      setAdults(1);
      setChildren(0);
      setWillAttend(null);
      setShowSuccess(true);

      // Trigger wishes API to refresh any external caches or listeners.
      // Fire-and-forget; non-critical if it fails.
      try {
        await fetch("/api/wishes");
      } catch {
        // ignore
      } finally {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("wishes:updated"));
        }
      }
    } catch {
      setToast("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay onClose={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>
      <WaveDivider fill="#8FC4B7" />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="-mt-px px-4 py-10 bg-[#8FC4B7]"
        id="rsvp"
      >
        <h2 className="font-heading text-3xl text-center text-[#F8FBFF] mb-2">
          RSVP 🐠
        </h2>
        {authorized ? (
          <p className="text-center text-[#F8FBFF] font-body mb-6 text-sm">
            This invitation allows up to{" "}
            <span className="font-bold text-[#1c6e95]">
              {maxAdults} adult{maxAdults !== 1 ? "s" : ""}
            </span>
            {maxChildren! > 0 && (
              <> &amp; <span className="font-bold text-[#1c6e95]">{maxChildren} child{maxChildren !== 1 ? "ren" : ""}</span></>
            )}
          </p>
        ) : (
          <p className="text-center text-[#F8FBFF] font-body mb-6 text-sm">
            {name ? "Your name is not on the invitation list." : "No invitation found."}
          </p>
        )}

        <div className="bg-[#F8FBFF] rounded-4xl p-6 shadow-sm">
        {!authorized && (
          <div className="text-center py-6">
            <p className="font-heading text-2xl text-[#2C5F7A] mb-2">🚫</p>
            <p className="font-body text-gray-600 text-sm">
              {name
                ? `"${name}" is not on the guest list. Please check your invitation link.`
                : "Please open your personalized invitation link to RSVP."}
            </p>
          </div>
        )}
        {authorized && toast && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3 mb-4 font-body">
            {toast}
          </div>
        )}

        {authorized && <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Hidden fields */}
          <input type="hidden" {...register("adult_attendees", { valueAsNumber: true })} />
          <input type="hidden" {...register("child_attendees", { valueAsNumber: true })} />

          {/* Full Name */}
          <div>
            <label htmlFor="rsvp-name" className="block text-sm font-body font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="rsvp-name"
              {...register("name")}
              placeholder="Your full name"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base font-body focus:outline-none focus:border-[#8FC4B7] transition-colors min-h-[44px]"
            />
            {errors.name && (
              <p role="alert" className="text-red-500 text-xs mt-1 font-body">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="rsvp-phone" className="block text-sm font-body font-semibold text-gray-700 mb-1">
              Phone / WhatsApp *
            </label>
            <input
              id="rsvp-phone"
              {...register("phone")}
              type="tel"
              placeholder="Your phone number"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base font-body focus:outline-none focus:border-[#8FC4B7] transition-colors min-h-[44px]"
            />
            {errors.phone && (
              <p role="alert" className="text-red-500 text-xs mt-1 font-body">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Attendees Steppers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-body text-gray-400">
              <span className="font-body font-semibold text-gray-700 text-sm">Number of Attendees *</span>
            </div>

            {/* Adults */}
            <div>
              <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
                Adults
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={decrementAdults}
                  disabled={adults <= 1}
                  className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 text-xl font-bold disabled:opacity-40 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  aria-label="Decrease adults"
                >
                  −
                </button>
                <span className="font-heading text-2xl text-[#2C5F7A] w-8 text-center">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={incrementAdults}
                  disabled={maxAdults === null || adults >= maxAdults}
                  className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 text-xl font-bold disabled:opacity-40 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  aria-label="Increase adults"
                >
                  +
                </button>
              </div>
              {errors.adult_attendees && (
                <p role="alert" className="text-red-500 text-xs mt-1 font-body">
                  {errors.adult_attendees.message}
                </p>
              )}
            </div>

            {/* Children */}
            <div>
              <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
                Children
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={decrementChildren}
                  disabled={children <= 0}
                  className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 text-xl font-bold disabled:opacity-40 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  aria-label="Decrease children"
                >
                  −
                </button>
                <span className="font-heading text-2xl text-[#2C5F7A] w-8 text-center">
                  {children}
                </span>
                <button
                  type="button"
                  onClick={incrementChildren}
                  disabled={maxChildren === null || children >= maxChildren}
                  className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 text-xl font-bold disabled:opacity-40 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  aria-label="Increase children"
                >
                  +
                </button>
              </div>
              {errors.child_attendees && (
                <p role="alert" className="text-red-500 text-xs mt-1 font-body">
                  {errors.child_attendees.message}
                </p>
              )}
            </div>
          </div>

          {/* Will Attend Radio */}
          <div>
            <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
              Will you attend? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer bg-green-50 border-2 border-transparent rounded-2xl px-4 py-3 has-[:checked]:border-green-400 transition-colors min-h-[44px]">
                <input
                  type="radio"
                  name="will_attend"
                  checked={willAttend === true}
                  onChange={() => {
                    setWillAttend(true);
                    setValue("will_attend", true, { shouldValidate: true });
                  }}
                  className="w-5 h-5 accent-green-500"
                />
                <span className="font-body text-gray-700">
                  Yes, I'll be there! 🎉
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-3 has-[:checked]:border-gray-400 transition-colors min-h-[44px]">
                <input
                  type="radio"
                  name="will_attend"
                  checked={willAttend === false}
                  onChange={() => {
                    setWillAttend(false);
                    setValue("will_attend", false, { shouldValidate: true });
                  }}
                  className="w-5 h-5 accent-gray-500"
                />
                <span className="font-body text-gray-700">
                  Sadly, I can't make it 😢
                </span>
              </label>
            </div>
            {errors.will_attend && (
              <p role="alert" className="text-red-500 text-xs mt-1 font-body">
                {errors.will_attend.message}
              </p>
            )}
          </div>

          {/* Message (optional) */}
          <div>
            <label htmlFor="rsvp-message" className="block text-sm font-body font-semibold text-gray-700 mb-1">
              Message for Joash{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="rsvp-message"
              {...register("message")}
              rows={3}
              placeholder="Leave a birthday wish for Joash! 🎂"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base font-body focus:outline-none focus:border-[#8FC4B7] transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E8967A] text-[#F8FBFF] font-heading text-xl py-4 rounded-full hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 disabled:scale-100 min-h-[44px] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              "RSVP Now! 🎊"
            )}
          </button>
        </form>}
        </div>
      </motion.section>
    </>
  );
}
