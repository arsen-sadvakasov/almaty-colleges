import { College } from "@/types";
import { Building2, MapPin, Phone, Mail, Globe, Camera, Clock, CheckCircle2, ShieldCheck, BookOpen } from "lucide-react";
import Link from "next/link";

interface CollegeProfileProps {
  college: College;
}

export function CollegeProfile({ college }: CollegeProfileProps) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/colleges" className="text-primary-200 hover:text-white transition-colors mb-6 inline-block font-medium">
            &larr; Назад в каталог
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden">
              <Building2 className="w-12 h-12 text-primary-900/30" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                  {college.isState ? "Государственный" : "Частный"}
                </span>
                {college.hasGrants && (
                  <span className="bg-success px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                    Есть гранты
                  </span>
                )}
                {college.hasDormitory && (
                  <span className="bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                    Общежитие
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">{college.name}</h1>
              <div className="flex items-center gap-4 text-primary-100 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {college.city}</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Лицензия МОН РК</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">О колледже</h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-lg text-neutral-600 mb-4">{college.description || "Информация о колледже обновляется."}</p>
                {college.history && (
                  <>
                    <h3 className="text-xl font-bold mt-6 mb-3">История</h3>
                    <p className="text-neutral-600">{college.history}</p>
                  </>
                )}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Специальности ({college.specialties.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {college.specialties.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-neutral-100 bg-neutral-50 rounded-xl hover:border-primary-200 transition-colors cursor-pointer group">
                    <div className="bg-white p-2 rounded-lg text-primary-500 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900">{spec}</h4>
                      <p className="text-sm text-neutral-500">Грант / Платно</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admissions & Tuition */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Поступление и условия</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" /> Правила приема
                  </h3>
                  <p className="text-neutral-600 ml-7">{college.admissionRules || "На базе 9 и 11 классов."}</p>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" /> Стоимость обучения
                  </h3>
                  <p className="text-neutral-600 ml-7">{college.tuitionFee || "Уточняйте в приемной комиссии."}</p>
                </div>
                {college.hasDormitory && (
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" /> Общежитие
                    </h3>
                    <p className="text-neutral-600 ml-7">{college.dormitoryInfo || "Предоставляется иногородним студентам."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contacts Card */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm sticky top-24">
              <h3 className="font-serif font-bold text-xl text-neutral-900 mb-6">Контакты</h3>
              
              <ul className="space-y-4">
                {college.contacts?.address && (
                  <li className="flex items-start gap-3 text-neutral-600">
                    <MapPin className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <span>{college.contacts.address}</span>
                  </li>
                )}
                {college.contacts?.phone && (
                  <li className="flex items-center gap-3 text-neutral-600">
                    <Phone className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    <a href={`tel:${college.contacts.phone}`} className="hover:text-primary-500 font-medium">{college.contacts.phone}</a>
                  </li>
                )}
                {college.contacts?.email && (
                  <li className="flex items-center gap-3 text-neutral-600">
                    <Mail className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    <a href={`mailto:${college.contacts.email}`} className="hover:text-primary-500">{college.contacts.email}</a>
                  </li>
                )}
                {college.contacts?.website && (
                  <li className="flex items-center gap-3 text-neutral-600">
                    <Globe className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    <a href={`https://${college.contacts.website}`} target="_blank" rel="noreferrer" className="hover:text-primary-500">{college.contacts.website}</a>
                  </li>
                )}
                {college.contacts?.instagram && (
                  <li className="flex items-center gap-3 text-neutral-600">
                    <Camera className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    <a href={`https://instagram.com/${college.contacts.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="hover:text-primary-500">{college.contacts.instagram}</a>
                  </li>
                )}
              </ul>

              <button className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-xl transition-colors">
                Сохранить в избранное
              </button>
            </div>
            
            {/* Meta Info */}
            <div className="text-xs text-neutral-400 text-center flex flex-col gap-1">
              {college.lastUpdated && <span className="flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> Обновлено: {college.lastUpdated}</span>}
              {college.dataSource && <span>Источник данных: {college.dataSource}</span>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
