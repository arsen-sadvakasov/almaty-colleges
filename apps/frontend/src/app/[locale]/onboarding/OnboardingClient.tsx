"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, User, ArrowRight, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/features/i18n/LanguageSwitcher";
import { LoginForm } from "../login/LoginForm";
import { RegisterForm } from "../register/RegisterForm";

export function OnboardingClient() {
  const t = useTranslations("Onboarding");
  const authT = useTranslations("Auth");
  
  const [slideIndex, setSlideIndex] = useState(0);
  const [authMode, setAuthMode] = useState<"none" | "login" | "register">("none");

  const slides = [
    {
      title: t("slide1Title"),
      text: t("slide1Text"),
      image: "/images/onboarding-1.png", // Or a nice illustration
    },
    {
      title: t("slide2Title"),
      text: t("slide2Text"),
      image: "/images/onboarding-2.jpg",
    },
    {
      title: t("slide3Title"),
      text: t("slide3Text"),
      image: "/images/onboarding-3.png",
    },
  ];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const completeOnboardingAsGuest = () => {
    document.cookie = "onboarding_complete=true; path=/; max-age=31536000";
    window.location.href = "/";
  };

  const handleLoginSuccess = () => {
    // NextAuth will handle the redirect to "/" since we use redirectTo: "/" in authenticate.
    // However, we should also set the cookie just in case.
    document.cookie = "onboarding_complete=true; path=/; max-age=31536000";
  };

  // If a user registers, we'll want to switch them to the login tab
  // The RegisterForm will need to support the inline mode. We'll add a wrapper to capture it,
  // but for now let's just render the forms.

  return (
    <div className="relative min-h-screen bg-neutral-50 flex items-center justify-center overflow-hidden">
      {/* Top Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="font-serif font-bold text-lg text-primary-900 hidden sm:block">
            Almaty Colleges
          </span>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Main Content */}
      <div className="w-full max-w-6xl px-4 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 py-20 lg:py-0">
        
        {/* Left Side: Slider */}
        <div className="w-full lg:w-1/2 flex flex-col items-start h-[400px] justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6 leading-tight">
                {slides[slideIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg leading-relaxed">
                {slides[slideIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center gap-3 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  slideIndex === idx ? "w-8 bg-primary-600" : "w-2 bg-neutral-300 hover:bg-primary-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            {slideIndex < slides.length - 1 && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-primary-100 text-primary-800 px-6 py-3 rounded-xl font-bold hover:bg-primary-200 transition-colors"
              >
                Далее <ArrowRight className="w-5 h-5" />
              </button>
            )}
            
            {/* Small unobtrusive buttons as requested, available on all slides */}
            <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={completeOnboardingAsGuest}
                className="text-sm text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
              >
                {t("skip")}
              </button>
              <span className="text-neutral-300 hidden sm:inline">•</span>
              <button
                onClick={() => setAuthMode("login")}
                className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
              >
                {t("login")}
              </button>
              <span className="text-neutral-300 hidden sm:inline">•</span>
              <button
                onClick={() => setAuthMode("register")}
                className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
              >
                {t("register")}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Image/Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative h-[300px] sm:h-[400px] lg:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={slides[slideIndex].image} 
                  alt={slides[slideIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Auth Modal overlay */}
      <AnimatePresence>
        {authMode !== "none" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 relative">
                <button 
                  onClick={() => setAuthMode("none")}
                  className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors bg-neutral-100 p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2 pr-10">
                  {authMode === "login" ? authT("loginWelcome") : authT("registerWelcome")}
                </h2>
                <p className="text-neutral-500 text-sm mb-6">
                  {authMode === "login" ? authT("loginSubtitle") : authT("registerSubtitle")}
                </p>

                {authMode === "login" ? (
                  <>
                    <div onClick={handleLoginSuccess} className="w-full">
                      <LoginForm />
                    </div>
                    <div className="mt-6 text-center text-sm text-neutral-600">
                      {authT("noAccount")}{" "}
                      <button onClick={() => setAuthMode("register")} className="text-primary-600 hover:underline font-medium">
                        {authT("registerLink")}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <RegisterForm onSuccess={() => setAuthMode("login")}>
                        <input type="hidden" name="redirectTo" value="none" />
                      </RegisterForm>
                    </div>
                    <div className="mt-6 text-center text-sm text-neutral-600">
                      {authT("hasAccount")}{" "}
                      <button onClick={() => setAuthMode("login")} className="text-primary-600 hover:underline font-medium">
                        {authT("loginLink")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
