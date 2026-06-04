import { Specialty, College } from "@/types";
import { BookOpen, Briefcase, GraduationCap, Clock, CheckCircle2, Building2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

interface SpecialtyProfileProps {
  specialty: Specialty;
  colleges: College[];
}

export function SpecialtyProfile({ specialty, colleges }: SpecialtyProfileProps) {
  const t = useTranslations('SpecialtyProfile');

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen transition-colors">
      {/* Hero Section */}
      <div className="bg-primary-900 dark:bg-neutral-900 text-white py-16 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6 flex gap-2 items-center">
             <span className="bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                {t('code', { code: specialty.code })}
             </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">{specialty.name}</h1>
          <p className="text-primary-100 dark:text-neutral-300 text-lg max-w-3xl">
            {specialty.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4 transition-colors">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl text-primary-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{t('qualification')}</div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">{specialty.qualification}</div>
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4 transition-colors">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-xl text-primary-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{t('studyDuration')}</div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">{specialty.studyDuration}</div>
                </div>
              </div>
            </div>

            {/* Career Prospects */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary-500" />
                {t('careerProspects')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.careerProspects.map((career, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary-500" />
                {t('skills')}
              </h2>
              <ul className="space-y-3">
                {specialty.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
                     <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                     {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Admissions Info */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-4">{t('profileSubjectsTitle')}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{t('profileSubjectsDesc')}</p>
              <div className="flex flex-wrap gap-2">
                {specialty.profileSubjects.map((subject, i) => (
                  <span key={i} className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-primary-100 dark:border-primary-900/50 transition-colors">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Colleges offering this */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-4">{t('whereToStudy')}</h3>
              <div className="space-y-4">
                {colleges.length > 0 ? colleges.map(college => (
                  <Link 
                    key={college.id} 
                    href={`/colleges/${college.id}`}
                    className="block group border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl hover:border-primary-500 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-primary-500 transition-colors leading-tight mb-1">
                          {college.name}
                        </h4>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">{college.city}</div>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <p className="text-sm text-neutral-500">{t('noCollegesData')}</p>
                )}
              </div>
              
              <Link href="/colleges" className="w-full mt-6 flex items-center justify-center border border-primary-200 dark:border-primary-900 text-primary-600 dark:text-primary-400 font-medium py-2.5 rounded-xl transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/30">
                {t('viewAllColleges')}
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
