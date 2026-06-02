import { CheckCircle2, FileText, UserCheck, School } from "lucide-react";

export function StepByStepGuide() {
  const steps = [
    {
      icon: <FileText className="w-6 h-6 text-primary-500" />,
      title: "Сбор документов",
      desc: "Подготовьте удостоверение личности, аттестат, медицинскую справку 075-У и фотографии 3х4."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary-500" />,
      title: "Подача заявления",
      desc: "Подайте документы через портал eGov.kz или обратитесь напрямую в приемную комиссию выбранного колледжа."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary-500" />,
      title: "Прохождение конкурса",
      desc: "Участвуйте в конкурсе на грант на основе среднего балла аттестата и профильных предметов."
    },
    {
      icon: <School className="w-6 h-6 text-primary-500" />,
      title: "Зачисление",
      desc: "Получите уведомление о зачислении и подпишите договор на обучение с колледжем."
    }
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm">
      <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Пошаговый гайд: Как поступить</h2>
      
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-primary-100 hidden sm:block" />
        
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary-50 border-4 border-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                {step.icon}
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-neutral-900 text-lg mb-2">Шаг {idx + 1}: {step.title}</h3>
                <p className="text-neutral-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
