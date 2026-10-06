import { cn } from "@/lib/utils";

/**
 * Иллюстрация для первого экрана «Услуг»: специалист сидит лицом к нам
 * и подписывает договор — документ развёрнут к нам обратной стороной,
 * над краем видна рука с ручкой. Плоский деловой стиль, палитра сайта:
 * серые тона, синий #1E88E5, оранжевый #F25C1F.
 * Нарисована вручную — без сторонних лицензий.
 */
export function SigningIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 380"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Специалист подписывает договор"
    >
      {/* Фон: мягкий круг и пунктирная орбита */}
      <circle cx="220" cy="190" r="152" fill="#1E88E5" fillOpacity="0.1" />
      <circle cx="220" cy="190" r="176" fill="none" stroke="#94A3B8" strokeOpacity="0.2" strokeDasharray="2 8" />

      {/* Отметка «согласовано» */}
      <g transform="translate(340 92)">
        <circle r="24" fill="#F25C1F" />
        <path d="M-9 0 l6 6 l12 -13" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Лист на фоне */}
      <g transform="translate(70 104) rotate(-9)">
        <rect width="60" height="78" rx="8" fill="#2C4766" />
        <rect x="12" y="16" width="36" height="5" rx="2.5" fill="#94A3B8" fillOpacity="0.7" />
        <rect x="12" y="28" width="28" height="5" rx="2.5" fill="#94A3B8" fillOpacity="0.45" />
        <rect x="12" y="40" width="32" height="5" rx="2.5" fill="#94A3B8" fillOpacity="0.45" />
        <rect x="12" y="56" width="20" height="8" rx="4" fill="#1E88E5" />
      </g>

      {/* Спинка кресла */}
      <rect x="132" y="126" width="176" height="190" rx="36" fill="#1F344B" />

      {/* Туловище: пиджак с широкими плечами */}
      <path d="M128 312 C128 232 160 186 220 182 C280 186 312 232 312 312 Z" fill="#1E88E5" />
      {/* Рубашка, галстук, лацканы */}
      <path d="M203 184 L220 226 L237 184 Z" fill="#E2E8F0" />
      <path d="M215 192 L225 192 L223 200 L217 200 Z" fill="#F25C1F" />
      <path d="M217 200 L223 200 L228 246 L220 256 L212 246 Z" fill="#F25C1F" />
      <path d="M203 184 L192 196 L216 250 L210 214 Z" fill="#1565C0" />
      <path d="M237 184 L248 196 L224 250 L230 214 Z" fill="#1565C0" />

      {/* Шея и голова */}
      <path d="M208 150 h24 v30 q-12 8 -24 0 Z" fill="#AEBBCB" />
      <ellipse cx="220" cy="122" rx="33" ry="40" fill="#CBD5E1" />
      <ellipse cx="187" cy="126" rx="5" ry="8" fill="#B8C4D2" />
      <ellipse cx="253" cy="126" rx="5" ry="8" fill="#B8C4D2" />
      {/* Короткая стрижка с пробором */}
      <path d="M186 118 C182 92 198 78 222 78 C244 78 258 92 254 118 C250 104 242 98 232 96 C222 104 204 106 194 104 C190 108 188 112 186 118 Z" fill="#3F4F63" />
      {/* Брови и опущенный на документ взгляд — лицо спокойное, взрослое */}
      <path d="M200 116 h12" stroke="#3F4F63" strokeWidth="3" strokeLinecap="round" />
      <path d="M228 116 h12" stroke="#3F4F63" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="206" cy="127" rx="3" ry="2.2" fill="#334155" />
      <ellipse cx="234" cy="127" rx="3" ry="2.2" fill="#334155" />
      <path d="M220 128 v12 h-3" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M212 148 h16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

      {/* Стол */}
      <rect x="36" y="306" width="368" height="20" rx="10" fill="#94A3B8" />
      <rect x="60" y="326" width="320" height="9" rx="4.5" fill="#64748B" fillOpacity="0.55" />

      {/* Левая рука придерживает документ */}
      <path d="M150 232 C142 262 146 286 166 294" fill="none" stroke="#1976D2" strokeWidth="24" strokeLinecap="round" />

      {/* Документ на столе — к нам обратной стороной */}
      <g transform="rotate(-3 222 276)">
        <rect x="146" y="240" width="154" height="70" rx="7" fill="#E2E8F0" />
        <rect x="146" y="240" width="154" height="70" rx="7" fill="none" stroke="#94A3B8" strokeOpacity="0.6" />
        <rect x="200" y="233" width="46" height="13" rx="5" fill="#F25C1F" />
        <rect x="214" y="228" width="18" height="8" rx="4" fill="#C2410C" />
        <circle cx="223" cy="278" r="13" fill="none" stroke="#94A3B8" strokeOpacity="0.55" strokeWidth="2" />
        <circle cx="223" cy="278" r="4" fill="#94A3B8" fillOpacity="0.55" />
      </g>
      <circle cx="166" cy="292" r="11" fill="#CBD5E1" />

      {/* Правая рука с ручкой над краем документа */}
      <path d="M292 230 C298 250 290 236 266 236" fill="none" stroke="#1976D2" strokeWidth="24" strokeLinecap="round" />
      <g transform="rotate(32 256 238)">
        <rect x="252" y="214" width="7" height="44" rx="3.5" fill="#F25C1F" />
        <rect x="252" y="214" width="7" height="10" rx="3" fill="#C2410C" />
      </g>
      <ellipse cx="258" cy="238" rx="12" ry="10" fill="#CBD5E1" />
    </svg>
  );
}
