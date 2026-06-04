"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, User, ArrowRight, ArrowLeft, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/features/i18n/LanguageSwitcher";
import { LoginForm } from "../login/LoginForm";
import { RegisterForm } from "../register/RegisterForm";

export function OnboardingClient() {
  const t = useTranslations("Onboarding");
  const authT = useTranslations("Auth");
  
  const [slideIndex, setSlideIndex] = useState(0);
  const [authMode, setAuthMode] = useState<"none" | "login" | "register">("none");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

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

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
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

  // Swipe logic
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

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
      <div 
        className="w-full max-w-6xl px-4 flex flex-col items-center justify-center z-10 py-16 lg:py-24 min-h-screen"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Top Section: Text & Image */}
        <div className={`w-full flex flex-col lg:flex-row ${slideIndex === 1 ? 'lg:flex-row-reverse' : ''} items-center justify-between gap-8 lg:gap-20 flex-1 mt-10 lg:mt-0`}>
          
          {/* Text Container */}
          <motion.div 
            layout 
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative min-h-[200px] lg:min-h-[250px] text-center lg:text-left"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.5 }}
                className="w-full"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 mb-4 lg:mb-6 leading-tight">
                  {slides[slideIndex].title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {slides[slideIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image Container */}
          <motion.div 
            layout 
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-full lg:w-1/2 flex justify-center relative h-[250px] sm:h-[350px] lg:h-auto lg:min-h-[450px] mt-6 lg:mt-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={slides[slideIndex].image} 
                    alt={slides[slideIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply" />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Bottom Section: Dots & Buttons */}
        <div className="w-full flex flex-col items-center justify-center mt-12 mb-8">
          
          {/* Dots Indicator */}
          <div className="flex items-center gap-3 mb-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  slideIndex === idx ? "w-8 bg-primary-500" : "w-2 bg-neutral-300 hover:bg-primary-500/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              {slideIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center bg-neutral-200 text-neutral-600 w-12 h-12 rounded-xl hover:bg-neutral-300 transition-colors"
                  aria-label="Назад"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              {slideIndex < slides.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-primary-100 text-primary-900 px-8 h-12 rounded-xl font-bold hover:bg-primary-200 transition-colors"
                >
                  Далее <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={completeOnboardingAsGuest}
                  className="flex items-center gap-2 bg-primary-500 text-white px-8 h-12 rounded-xl font-bold hover:bg-primary-500/90 transition-colors shadow-lg shadow-primary-500/30"
                >
                  {t("skip")} <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Small unobtrusive buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAuthMode("login")}
                className="text-sm text-primary-500 hover:text-primary-900 font-medium transition-colors"
              >
                {t("login")}
              </button>
              <span className="text-neutral-300">•</span>
              <button
                onClick={() => setAuthMode("register")}
                className="text-sm text-primary-500 hover:text-primary-900 font-medium transition-colors"
              >
                {t("register")}
              </button>
            </div>
          </div>

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
