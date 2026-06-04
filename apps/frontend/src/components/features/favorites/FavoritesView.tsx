"use client";

import { useState } from "react";
import { MOCK_COLLEGES, MOCK_SPECIALTIES } from "@/lib/mock-data";
import { College, Specialty } from "@/types";
import { Link } from "@/i18n/routing";
import { Building2, BookOpen, MapPin, Check, Trash2, HeartOff, Star } from "lucide-react";
import { useTranslations } from 'next-intl';

export function FavoritesView() {
  const t = useTranslations('FavoritesView');
  const [activeTab, setActiveTab] = useState<"colleges" | "specialties">("colleges");
  
  // Mock favorites
  const [favoriteCollegeIds, setFavoriteCollegeIds] = useState<string[]>(["1", "4"]);
  const [favoriteSpecialtyIds, setFavoriteSpecialtyIds] = useState<string[]>(["it"]);

  const favoriteColleges = MOCK_COLLEGES.filter(c => favoriteCollegeIds.includes(c.id));
  const favoriteSpecialties = MOCK_SPECIALTIES.filter(s => favoriteSpecialtyIds.includes(s.id));

  const removeCollege = (id: string) => {
    setFavoriteCollegeIds(prev => prev.filter(cId => cId !== id));
  };

  const removeSpecialty = (id: string) => {
    setFavoriteSpecialtyIds(prev => prev.filter(sId => sId !== id));
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm min-h-[500px] transition-colors">
      
      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-8 transition-colors">
        <button 
          onClick={() => setActiveTab("colleges")}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === "colleges" ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"}`}
        >
          {t('colleges', { count: favoriteCollegeIds.length })}
          {activeTab === "colleges" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
        </button>
        <button 
          onClick={() => setActiveTab("specialties")}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === "specialties" ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"}`}
        >
          {t('specialties', { count: favoriteSpecialtyIds.length })}
          {activeTab === "specialties" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
        </button>
      </div>

      {/* Content */}
      {activeTab === "colleges" && (
        <div>
          {favoriteColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteColleges.map((college) => (
                <div key={college.id} className="group bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-md transition-all flex items-start gap-4 p-4 relative">
                  <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Building2 className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/colleges/${college.id}`} className="block pr-8 hover:text-primary-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">
                          <Star className="w-3 h-3 fill-warning text-warning" />
                          {college.rating}
                        </div>
                      </div>
                      <h3 className="font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-tight">
                        {college.name}
                      </h3>
                      <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{college.city}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <button 
                    onClick={() => removeCollege(college.id)}
                    className="absolute top-4 right-4 p-2 text-neutral-400 dark:text-neutral-500 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                    title={t('removeFromFavorites')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <HeartOff className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">{t('noColleges')}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">{t('noCollegesDesc')}</p>
              <Link href="/colleges" className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium py-2 px-6 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                {t('goToCatalog')}
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === "specialties" && (
        <div>
          {favoriteSpecialties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteSpecialties.map((specialty) => (
                <div key={specialty.id} className="group bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-md transition-all relative">
                  <button 
                    onClick={() => removeSpecialty(specialty.id)}
                    className="absolute top-4 right-4 p-2 text-neutral-400 dark:text-neutral-500 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors z-10"
                    title={t('removeFromFavorites')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link href={`/specialties/${specialty.id}`} className="block hover:text-primary-500 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl text-primary-500">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded mb-1 inline-block">
                          {specialty.code}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100 leading-tight">
                          {specialty.name}
                        </h3>
                      </div>
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {specialty.description}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 pt-4">
                      {t('qualification')} <span className="font-medium text-neutral-900 dark:text-neutral-100">{specialty.qualification}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <HeartOff className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">{t('noSpecialties')}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">{t('noSpecialtiesDesc')}</p>
              <Link href="/specialties" className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium py-2 px-6 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                {t('viewSpecialties')}
              </Link>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
