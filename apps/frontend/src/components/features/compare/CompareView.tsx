"use client";

import { useState } from "react";
import { College } from "@/types";
import { MOCK_COLLEGES } from "@/lib/mock-data";
import { CheckCircle2, XCircle, Trash2, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function CompareView() {
  const t = useTranslations('CompareView');
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2"]);

  const selectedColleges = selectedIds.map(id => MOCK_COLLEGES.find(c => c.id === id)).filter(Boolean) as College[];
  const availableColleges = MOCK_COLLEGES.filter(c => !selectedIds.includes(c.id));

  const addCollege = (id: string) => {
    if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCollege = (id: string) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-neutral-900">{t('title')}</h2>
          <p className="text-neutral-500">{t('subtitle')}</p>
        </div>
        
        {selectedIds.length < 3 && availableColleges.length > 0 && (
          <select 
            onChange={(e) => {
              if (e.target.value) addCollege(e.target.value);
              e.target.value = "";
            }}
            defaultValue=""
            className="border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium"
          >
            <option value="" disabled>{t('addCollege')}</option>
            {availableColleges.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      {selectedColleges.length > 0 ? (
        <div className="min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-neutral-200 w-1/4">{t('parameters')}</th>
                {selectedColleges.map((college) => (
                  <th key={college.id} className="p-4 border-b border-neutral-200 w-1/4 relative align-top">
                    <button 
                      onClick={() => removeCollege(college.id)}
                      className="absolute top-4 right-4 text-neutral-300 hover:text-danger transition-colors"
                      title={t('removeFromCompare')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <Link href={`/colleges/${college.id}`} className="block pr-8 hover:text-primary-500 transition-colors">
                      <div className="font-serif font-bold text-lg text-neutral-900 mb-2 leading-tight">
                        {college.name}
                      </div>
                      <div className="text-sm font-normal text-neutral-500">{college.city}</div>
                    </Link>
                  </th>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="p-4 border-b border-neutral-200 w-1/4">
                    <div className="h-full min-h-[100px] border-2 border-dashed border-neutral-200 rounded-xl flex items-center justify-center text-neutral-400">
                      {t('emptySlot')}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              <tr>
                <td className="p-4 font-medium text-neutral-700 bg-neutral-50 rounded-l-xl">{t('rating')}</td>
                {selectedColleges.map(c => (
                  <td key={c.id} className="p-4 font-bold text-primary-600 bg-neutral-50">{c.rating} / 5.0</td>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`empty-${i}`} className="bg-neutral-50 rounded-r-xl"></td>)}
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-700">{t('institutionType')}</td>
                {selectedColleges.map(c => (
                  <td key={c.id} className="p-4">{c.isState ? t('state') : t('private')}</td>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-700 bg-neutral-50 rounded-l-xl">{t('dormitory')}</td>
                {selectedColleges.map(c => (
                  <td key={c.id} className="p-4 bg-neutral-50">
                    {c.hasDormitory ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-neutral-300" />}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`empty-${i}`} className="bg-neutral-50 rounded-r-xl"></td>)}
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-700">{t('grants')}</td>
                {selectedColleges.map(c => (
                  <td key={c.id} className="p-4">
                    {c.hasGrants ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-neutral-300" />}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-700 bg-neutral-50 rounded-l-xl">{t('studentsCount')}</td>
                {selectedColleges.map(c => (
                  <td key={c.id} className="p-4 bg-neutral-50">~{c.studentsCount}</td>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`empty-${i}`} className="bg-neutral-50 rounded-r-xl"></td>)}
              </tr>
              <tr>
                <td className="p-4 font-medium text-neutral-700 align-top">{t('specialties')}</td>
                {selectedColleges.map(c => (
                  <td key={c.id} className="p-4 align-top">
                    <ul className="list-disc list-inside space-y-1 text-neutral-600">
                      {c.specialties.slice(0, 4).map((s, idx) => <li key={idx}>{s}</li>)}
                      {c.specialties.length > 4 && <li>{t('andMore', { count: c.specialties.length - 4 })}</li>}
                    </ul>
                  </td>
                ))}
                {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => <td key={`empty-${i}`}></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-500 mb-4">{t('noCollegesSelected')}</p>
        </div>
      )}
    </div>
  );
}
