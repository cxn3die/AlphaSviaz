import { privacySections } from "@/lib/data/privacy";

export function PrivacyContentSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="text-sm text-white/55">
          Документ в макетной версии. Перед публикацией согласуйте текст с
          юристом.
        </p>

        <div className="mt-10 space-y-10">
          {privacySections.map((section) => (
            <article key={section.title}>
              <h2 className="font-heading text-xl font-bold text-white">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-white/65"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
