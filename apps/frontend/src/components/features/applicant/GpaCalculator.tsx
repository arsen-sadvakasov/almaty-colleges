"use client";

import { useState } from "react";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { useTranslations } from 'next-intl';

export function GpaCalculator() {
  const t = useTranslations('GpaCalculator');

  const [subjects, setSubjects] = useState<{ id: string; name: string; grade: number }[]>([
    { id: "1", name: t('subjects.algebra'), grade: 4 },
    { id: "2", name: t('subjects.russian'), grade: 4 },
    { id: "3", name: t('subjects.kazakh'), grade: 5 },
    { id: "4", name: t('subjects.profile1'), grade: 5 },
    { id: "5", name: t('subjects.profile2'), grade: 4 },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: Math.random().toString(), name: t('newSubject'), grade: 4 }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: "name" | "grade", value: string | number) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculateGpa = () => {
    const total = subjects.reduce((sum, subject) => sum + subject.grade, 0);
    return (total / subjects.length).toFixed(2);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary-50 p-3 rounded-2xl text-primary-500">
          <Calculator className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-neutral-900">{t('title')}</h2>
          <p className="text-neutral-500">{t('subtitle')}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {subjects.map((subject, index) => (
          <div key={subject.id} className="flex items-center gap-4">
            <span className="text-neutral-400 font-medium w-6">{index + 1}.</span>
            <input 
              type="text" 
              value={subject.name}
              onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
              className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              value={subject.grade}
              onChange={(e) => updateSubject(subject.id, "grade", Number(e.target.value))}
              className="border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[80px]"
            >
              <option value={5}>{t('grade5')}</option>
              <option value={4}>{t('grade4')}</option>
              <option value={3}>{t('grade3')}</option>
            </select>
            <button 
              onClick={() => removeSubject(subject.id)}
              className="p-2.5 text-neutral-400 hover:text-danger hover:bg-danger/10 rounded-xl transition-colors disabled:opacity-50"
              disabled={subjects.length <= 1}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={addSubject}
        className="flex items-center gap-2 text-primary-500 font-medium hover:text-primary-600 transition-colors mb-8"
      >
        <Plus className="w-4 h-4" /> {t('addSubject')}
      </button>

      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-500 mb-1">{t('finalGpa')}</div>
          <div className="text-xs text-neutral-400">{t('basedOn', { count: subjects.length })}</div>
        </div>
        <div className="text-4xl font-serif font-bold text-primary-600">
          {calculateGpa()}
        </div>
      </div>
    </div>
  );
}
