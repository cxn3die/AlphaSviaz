import { workSteps } from "@/lib/data/workSteps";

export function WorkStepsSection() {
  return (
    <section className="border-t border-white/8 bg-[#0E2542] py-16 md:py-20">
      <div className="container mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#64B5F6]">
          Как мы работаем
        </p>
        <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
          Этапы реализации проекта
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {workSteps.map((step) => (
            <li
              key={step.step}
              className="relative rounded-[16px] border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="font-heading text-3xl font-bold text-[#64B5F6]">
                {step.step}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
