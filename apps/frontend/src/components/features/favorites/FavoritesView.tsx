"use client";

import { useState } from "react";
import { MOCK_COLLEGES, MOCK_SPECIALTIES } from "@/lib/mock-data";
import { College, Specialty } from "@/types";
import Link from "next/link";
import { Building2, BookOpen, MapPin, Check, Trash2, HeartOff, Star } from "lucide-react";

export function FavoritesView() {
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
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm min-h-[500px]">
      
      {/* Tabs */}
      <div className="flex border-b border-neutral-200 mb-8">
        <button 
          onClick={() => setActiveTab("colleges")}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === "colleges" ? "text-primary-600" : "text-neutral-500 hover:text-neutral-900"}`}
        >
          Колледжи ({favoriteCollegeIds.length})
          {activeTab === "colleges" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
        </button>
        <button 
          onClick={() => setActiveTab("specialties")}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === "specialties" ? "text-primary-600" : "text-neutral-500 hover:text-neutral-900"}`}
        >
          Специальности ({favoriteSpecialtyIds.length})
          {activeTab === "specialties" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
        </button>
      </div>

      {/* Content */}
      {activeTab === "colleges" && (
        <div>
          {favoriteColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteColleges.map((college) => (
                <div key={college.id} className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all flex items-start gap-4 p-4 relative">
                  <div className="w-24 h-24 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/colleges/${college.id}`} className="block pr-8 hover:text-primary-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1 text-sm font-bold text-neutral-900">
                          <Star className="w-3 h-3 fill-warning text-warning" />
                          {college.rating}
                        </div>
                      </div>
                      <h3 className="font-serif font-bold text-neutral-900 mb-2 leading-tight">
                        {college.name}
                      </h3>
                      <div className="space-y-1 text-xs text-neutral-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{college.city}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <button 
                    onClick={() => removeCollege(college.id)}
                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                    title="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <HeartOff className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Нет сохраненных колледжей</h3>
              <p className="text-neutral-500 mb-6">Вы еще не добавили ни один колледж в избранное.</p>
              <Link href="/colleges" className="inline-block bg-primary-50 text-primary-600 font-medium py-2 px-6 rounded-xl hover:bg-primary-100 transition-colors">
                Перейти в каталог
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
                <div key={specialty.id} className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-all relative">
                  <button 
                    onClick={() => removeSpecialty(specialty.id)}
                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors z-10"
                    title="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link href={`/specialties/${specialty.id}`} className="block hover:text-primary-500 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary-50 p-3 rounded-xl text-primary-500">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded mb-1 inline-block">
                          {specialty.code}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-neutral-900 leading-tight">
                          {specialty.name}
                        </h3>
                      </div>
                    </div>
                    <div className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {specialty.description}
                    </div>
                    <div className="text-xs text-neutral-500 border-t border-neutral-100 pt-4">
                      Квалификация: <span className="font-medium text-neutral-900">{specialty.qualification}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <HeartOff className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Нет сохраненных специальностей</h3>
              <p className="text-neutral-500 mb-6">Вы еще не добавили ни одну специальность в избранное.</p>
              <Link href="/specialties" className="inline-block bg-primary-50 text-primary-600 font-medium py-2 px-6 rounded-xl hover:bg-primary-100 transition-colors">
                Смотреть специальности
              </Link>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
