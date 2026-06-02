import { ShieldAlert, Info, Award } from "lucide-react";

export function AdmissionRules() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="w-6 h-6 text-warning" />
        <h2 className="text-2xl font-serif font-bold text-neutral-900">Правила приема</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
          <h3 className="font-bold text-neutral-900 mb-2">На базе 9 классов</h3>
          <p className="text-sm text-neutral-600">Срок обучения: 3 года 10 месяцев. Зачисление по среднему баллу аттестата и оценкам по профильным предметам.</p>
        </div>
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
          <h3 className="font-bold text-neutral-900 mb-2">На базе 11 классов</h3>
          <p className="text-sm text-neutral-600">Срок обучения: 2 года 10 месяцев. Учитывается средний балл аттестата, результаты ЕНТ (при наличии) не обязательны для большинства специальностей.</p>
        </div>
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 mt-6 flex gap-3 items-start">
          <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-primary-800">
            Для медицинских, педагогических и творческих специальностей проводятся дополнительные специальные/творческие экзамены.
          </p>
        </div>
      </div>
    </div>
  );
}

export function GrantsInfo() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-[100px] -z-10" />
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-success" />
          <h2 className="text-2xl font-serif font-bold text-neutral-900">Гранты и стипендии</h2>
        </div>
        
        <p className="text-neutral-600 mb-6">
          В 2026 году государством выделено более 130 000 грантов на обучение в колледжах. Из них значительная часть квотирована для целевых групп.
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Многодетные семьи</span>
            <span className="font-bold text-success">Квота 5%</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Сельская молодежь</span>
            <span className="font-bold text-success">Квота 30%</span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Дети-сироты</span>
            <span className="font-bold text-success">Квота 1%</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-success/10 rounded-xl text-success-800 text-sm font-medium border border-success/20">
        Студенты, обучающиеся по госзаказу, обеспечиваются стипендией в размере ~32 681 тг/мес.
      </div>
    </div>
  );
}
