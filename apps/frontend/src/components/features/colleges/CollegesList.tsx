"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Building2, Check, Star } from "lucide-react";
import Link from "next/link";

interface CollegeType {
  id: string;
  name: string;
  city: string;
  isState: boolean;
  hasDormitory: boolean;
  hasGrants: boolean;
  rating: number;
  specialties: string[];
}

export function CollegesList({ colleges }: { colleges: CollegeType[] }) {
  const CITIES = useMemo(() => Array.from(new Set(colleges.map(c => c.city))).sort(), [colleges]);
  const SPECIALTIES = useMemo(() => {
    const all = colleges.flatMap(c => c.specialties);
    return Array.from(new Set(all)).sort();
  }, [colleges]);

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "state" | "private">("all");
  const [hasDormitory, setHasDormitory] = useState(false);
  const [hasGrants, setHasGrants] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [page, setPage] = useState(1);
  
  const ITEMS_PER_PAGE = 6;

  const filteredColleges = useMemo(() => {
    let result = colleges;

    if (search) {
      result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (cityFilter) {
      result = result.filter(c => c.city === cityFilter);
    }
    if (specialtyFilter) {
      result = result.filter(c => c.specialties.includes(specialtyFilter));
    }
    if (typeFilter !== "all") {
      result = result.filter(c => c.isState === (typeFilter === "state"));
    }
    if (hasDormitory) {
      result = result.filter(c => c.hasDormitory);
    }
    if (hasGrants) {
      result = result.filter(c => c.hasGrants);
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [search, cityFilter, specialtyFilter, typeFilter, hasDormitory, hasGrants, sortBy]);

  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE);
  const paginatedColleges = filteredColleges.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200">
          <h3 className="font-serif font-bold text-lg mb-6">Фильтры</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Город</label>
              <select 
                className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                value={cityFilter}
                onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
              >
                <option value="">Все города</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Специальность</label>
              <select 
                className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                value={specialtyFilter}
                onChange={(e) => { setSpecialtyFilter(e.target.value); setPage(1); }}
              >
                <option value="">Все направления</option>
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-3">Тип учреждения</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="type" checked={typeFilter === "all"} onChange={() => { setTypeFilter("all"); setPage(1); }} className="text-primary-500 focus:ring-primary-500" />
                  Все
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="type" checked={typeFilter === "state"} onChange={() => { setTypeFilter("state"); setPage(1); }} className="text-primary-500 focus:ring-primary-500" />
                  Государственный
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="type" checked={typeFilter === "private"} onChange={() => { setTypeFilter("private"); setPage(1); }} className="text-primary-500 focus:ring-primary-500" />
                  Частный
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-3">Дополнительно</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={hasDormitory} onChange={(e) => { setHasDormitory(e.target.checked); setPage(1); }} className="rounded text-primary-500 focus:ring-primary-500" />
                  Есть общежитие
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={hasGrants} onChange={(e) => { setHasGrants(e.target.checked); setPage(1); }} className="rounded text-primary-500 focus:ring-primary-500" />
                  Есть гранты
                </label>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search & Sort */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Поиск колледжа..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-neutral-500 whitespace-nowrap">Сортировка:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as "rating" | "name")}
              className="w-full sm:w-auto border-none bg-neutral-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            >
              <option value="rating">По рейтингу</option>
              <option value="name">По алфавиту</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-neutral-500">
          Найдено колледжей: <span className="font-bold text-neutral-900">{filteredColleges.length}</span>
        </div>

        {/* Grid */}
        {paginatedColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedColleges.map((college) => (
              <Link 
                key={college.id} 
                href={`/colleges/${college.id}`}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-40 bg-neutral-200 relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-primary-900/5 flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-primary-900/20" />
                  </div>
                  {college.hasGrants && (
                    <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                      Гранты
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-primary-500 bg-primary-50 w-fit px-2 py-1 rounded-md">
                      {college.isState ? "Государственный" : "Частный"}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-neutral-900">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      {college.rating}
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-900 mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {college.name}
                  </h3>
                  <div className="space-y-2 text-sm text-neutral-500 mt-auto">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{college.city}</span>
                    </div>
                    {college.hasDormitory && (
                      <div className="flex items-center gap-2 text-success">
                        <Check className="w-4 h-4" />
                        <span>Есть общежитие</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
            <Building2 className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Колледжи не найдены</h3>
            <p className="text-neutral-500">Попробуйте изменить параметры фильтрации</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-neutral-200 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-neutral-50"
            >
              Назад
            </button>
            <div className="flex items-center gap-1">
              {Array.from({length: totalPages}).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page === i + 1 ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100 text-neutral-700'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-neutral-200 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-neutral-50"
            >
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
