import Link from 'next/link'
import { pathFor, type Locale } from '@/lib/i18n'

const t = {
  fr: {
    tag: '— 404',
    title: 'Cette route n’existe pas.',
    lede:
      'La page que vous cherchez n’est plus là — ou n’a jamais été. Reprenez au début, ou consultez la flotte.',
    home: "Retour à l'accueil",
    fleet: 'Voir la flotte',
  },
  en: {
    tag: '— 404',
    title: 'This route does not exist.',
    lede:
      'The page you are looking for is gone — or was never here. Head back to the start, or take a look at the fleet.',
    home: 'Back to the start',
    fleet: 'See the fleet',
  },
  ar: {
    tag: '— 404',
    title: 'هذا المسار غير موجود.',
    lede:
      'الصفحة التي تبحث عنها لم تعد متاحة — أو لم تكن يوماً. عد إلى البداية، أو اطّلع على الأسطول.',
    home: 'العودة إلى البداية',
    fleet: 'مشاهدة الأسطول',
  },
} as const

export default function NotFoundContent({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="tag text-blood mb-6">{c.tag}</div>
      <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tightest max-w-3xl">
        {c.title}
      </h1>
      <p className="mt-8 max-w-xl text-dust leading-relaxed">{c.lede}</p>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link href={pathFor(locale, 'home')} className="btn-blood btn-fx">
          <span>{c.home}</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link href={pathFor(locale, 'fleet')} className="btn-ghost btn-fx">
          <span>{c.fleet}</span>
        </Link>
      </div>
    </section>
  )
}
