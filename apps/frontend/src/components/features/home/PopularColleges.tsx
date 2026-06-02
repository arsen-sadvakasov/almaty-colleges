import { Building2, MapPin, Users } from "lucide-react";
import Link from "next/link";

const MOCK_COLLEGES = [
  {
    id: 1,
    name: "Талдыкорганский высший политехнический колледж",
    city: "г. Талдыкорган",
    type: "Государственный",
    students: "2400+",
  },
  {
    id: 2,
    name: "Жетысуский гуманитарно-технический колледж",
    city: "г. Талдыкорган",
    type: "Частный",
    students: "1800+",
  },
  {
    id: 3,
    name: "Каскеленский профессионально-технический колледж",
    city: "г. Каскелен",
    type: "Государственный",
    students: "1200+",
  }
];

export function PopularColleges() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Популярные колледжи</h2>
            <p className="text-neutral-500 max-w-2xl text-lg">
              Учебные заведения, которые чаще всего выбирают абитуриенты в этом году.
            </p>
          </div>
          <Link href="/colleges" className="hidden sm:inline-flex items-center text-primary-500 font-medium hover:text-primary-900 transition-colors">
            Смотреть все &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COLLEGES.map((college) => (
            <Link 
              key={college.id} 
              href={`/colleges/${college.id}`}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 bg-neutral-200 relative overflow-hidden">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-primary-900/10 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-primary-900/20" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-primary-500 bg-primary-50 w-fit px-2.5 py-1 rounded-md mb-4">
                  {college.type}
                </div>
                <h3 className="font-serif font-bold text-xl text-neutral-900 mb-3 group-hover:text-primary-500 transition-colors">
                  {college.name}
                </h3>
                <div className="space-y-2 text-sm text-neutral-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{college.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{college.students} студентов</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
