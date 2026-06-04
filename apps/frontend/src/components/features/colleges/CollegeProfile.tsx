import { College } from "@/types";
import { Building2, MapPin, Phone, Mail, Globe, Camera, Clock, CheckCircle2, ShieldCheck, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

interface CollegeProfileProps {
  college: College;
}

export function CollegeProfile({ college }: CollegeProfileProps) {
  const t = useTranslations('CollegeProfile');

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen transition-colors">
      {/* Hero Section */}
      <div className="bg-primary-900 dark:bg-neutral-900 text-white py-16 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/colleges" className="text-primary-200 hover:text-white transition-colors mb-6 inline-block font-medium">
            {t('back')}
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden transition-colors">
              <Building2 className="w-12 h-12 text-primary-900/30" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                  {college.isState ? t('state') : t('private')}
                </span>
                {college.hasGrants && (
                  <span className="bg-success px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                    {t('hasGrants')}
                  </span>
                )}
                {college.hasDormitory && (
                  <span className="bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                    {t('dormitory')}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-white">{college.name}</h1>
              <div className="flex items-center gap-4 text-primary-100 dark:text-neutral-400 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {college.city}</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {t('license')}</span>
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
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-6">{t('aboutTitle')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">{college.description || t('aboutEmpty')}</p>
                {college.history && (
                  <>
                    <h3 className="text-xl font-bold mt-6 mb-3 text-neutral-900 dark:text-neutral-100">{t('historyTitle')}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{college.history}</p>
                  </>
                )}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-6">{t('specialtiesTitle', { count: college.specialties.length })}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {college.specialties.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl hover:border-primary-200 dark:hover:border-primary-800 transition-colors cursor-pointer group">
                    <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg text-primary-500 dark:text-primary-400 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{spec}</h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('grantOrPaid')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admissions & Tuition */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-6">{t('admissionsTitle')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" /> {t('rulesTitle')}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 ml-7">{college.admissionRules || t('rulesEmpty')}</p>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" /> {t('tuitionTitle')}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 ml-7">{college.tuitionFee || t('tuitionEmpty')}</p>
                </div>
                {college.hasDormitory && (
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" /> {t('dormitoryTitle')}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 ml-7">{college.dormitoryInfo || t('dormitoryEmpty')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contacts Card */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm sticky top-24 transition-colors">
              <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-6">{t('contactsTitle')}</h3>
              
              <ul className="space-y-4">
                {college.contacts?.address && (
                  <li className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400">
                    <MapPin className="w-5 h-5 text-neutral-400 dark:text-neutral-500 mt-0.5 flex-shrink-0" />
                    <span>{college.contacts.address}</span>
                  </li>
                )}
                {college.contacts?.phone && (
                  <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                    <Phone className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                    <a href={`tel:${college.contacts.phone}`} className="hover:text-primary-500 dark:hover:text-primary-400 font-medium">{college.contacts.phone}</a>
                  </li>
                )}
                {college.contacts?.email && (
                  <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                    <Mail className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                    <a href={`mailto:${college.contacts.email}`} className="hover:text-primary-500 dark:hover:text-primary-400">{college.contacts.email}</a>
                  </li>
                )}
                {college.contacts?.website && (
                  <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                    <Globe className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                    <a href={`https://${college.contacts.website}`} target="_blank" rel="noreferrer" className="hover:text-primary-500 dark:hover:text-primary-400">{college.contacts.website}</a>
                  </li>
                )}
                {college.contacts?.instagram && (
                  <li className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                    <Camera className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                    <a href={`https://instagram.com/${college.contacts.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="hover:text-primary-500 dark:hover:text-primary-400">{college.contacts.instagram}</a>
                  </li>
                )}
              </ul>

              <button className="w-full mt-8 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-xl transition-colors">
                {t('saveFavorite')}
              </button>
            </div>
            
            {/* Meta Info */}
            <div className="text-xs text-neutral-400 text-center flex flex-col gap-1">
              {college.lastUpdated && <span className="flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> {t('updatedAt', { date: college.lastUpdated })}</span>}
              {college.dataSource && <span>{t('dataSource', { source: college.dataSource })}</span>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
