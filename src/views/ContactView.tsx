import ContactForm from '@/components/ContactForm'
import { CONTACT, whatsappLink } from '@/lib/config'
import Reveal from '@/components/Reveal'
import SplitReveal from '@/components/SplitReveal'
import { dict, type Locale } from '@/lib/i18n'

export default function ContactView({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const waMsg =
    locale === 'fr'
      ? 'Bonjour, je souhaite un renseignement.'
      : locale === 'en'
      ? 'Hello, I would like to enquire.'
      : 'السلام عليكم، أودّ الاستفسار.'

  const h1Text =
    locale === 'fr'
      ? 'Contact — Location moto & scooter à Marrakech'
      : locale === 'en'
      ? 'Contact — Motorcycle & scooter rental in Marrakech'
      : 'التواصل — تأجير دراجات نارية وسكوترات بمراكش'

  return (
    <>
      <h1 className="sr-only">{h1Text}</h1>
      {/* Hero */}
      <section className="section-warm pt-40 pb-16 md:pt-56 md:pb-24 border-b border-black/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal delay={0.1} className="flex items-center gap-3 mb-8">
            <span className="editorial-num">{t.contact.heroNum}</span>
            <span className="tag text-blood">{t.contact.heroTag}</span>
          </Reveal>
          <SplitReveal
            as="h2"
            delay={0.2}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[9rem] leading-[0.88] tracking-tightest"
            lines={[
              <>{t.contact.heroA}</>,
              <><em className="italic text-blood font-normal">{t.contact.heroEm}</em></>,
            ]}
          />
          <Reveal delay={0.6}>
            <p className="mt-10 max-w-2xl text-lg text-dust leading-relaxed">{t.contact.heroLede}</p>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="section-warm py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, var(--ochre) 0%, transparent 70%)' }} />
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-3 mb-6">
              <span className="editorial-num">{t.contact.aboutNum}</span>
              <span className="tag text-blood">{t.contact.aboutTag}</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
              lines={[
                <>{t.contact.aboutTitleA}</>,
                <><em className="italic text-blood">{t.contact.aboutTitleEmA}</em> {t.contact.aboutTitleB}</>,
              ]}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-lg leading-relaxed">
            <Reveal><p>{t.contact.aboutP1a}<span className="font-semibold">{t.contact.aboutP1b}</span></p></Reveal>
            <Reveal delay={0.1}><p>{t.contact.aboutP2a}<em className="italic">{t.contact.aboutP2Em}</em>{t.contact.aboutP2b}</p></Reveal>
            <Reveal delay={0.2}><p>{t.contact.aboutP3}</p></Reveal>
          </div>
        </div>
      </section>

      {/* Coordonnées + Map */}
      <section className="section-warm border-y border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <Reveal className="flex items-center gap-3 mb-8">
              <span className="editorial-num">{t.contact.coordNum}</span>
              <span className="tag text-blood">{t.contact.coordTag}</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest mb-12"
              lines={[
                <>{t.contact.coordTitleA}</>,
                <><em className="italic text-blood">{t.contact.coordTitleEm}</em></>,
              ]}
            />

            <dl className="space-y-8">
              {[
                { label: t.contact.address, node: (
                  <>
                    <div className="text-cream">{CONTACT.address}</div>
                    <a href={CONTACT.mapsLink} target="_blank" rel="noreferrer" className="tag link-under mt-2 inline-block">
                      {t.common.directions}
                    </a>
                  </>
                ) },
                { label: t.contact.phone, node: (
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${CONTACT.phoneE164}`} className="link-under text-lg font-mono">
                      {CONTACT.phoneDisplay}
                    </a>
                    <a href={`tel:${CONTACT.phone2E164}`} className="link-under text-lg font-mono">
                      {CONTACT.phone2Display}
                    </a>
                  </div>
                ) },
                { label: t.contact.whatsapp, node: (
                  <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer" className="link-under text-lg font-mono">
                    {t.contact.whatsappOpen}
                  </a>
                ) },
                { label: t.contact.email, node: (
                  <a href={`mailto:${CONTACT.email}`} className="link-under font-mono">
                    {CONTACT.email}
                  </a>
                ) },
                { label: t.contact.instagram, node: (
                  <a
                    href={CONTACT.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 link-under text-lg font-mono"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                    @{CONTACT.instagram}
                  </a>
                ) },
                { label: t.contact.hours, node: (
                  <div className="font-mono">
                    <div>{t.contact.hoursLine1}</div>
                    <div className="text-sm mt-1 opacity-70">{t.contact.hoursLine2}</div>
                  </div>
                ) },
              ].map((it, i) => (
                <Reveal key={it.label} delay={i * 0.08} as="div">
                  <div className="border-t border-white/10 pt-4">
                    <dt className="tag text-dust mb-2">{it.label}</dt>
                    <dd>{it.node}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[500px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-black/10">
            <iframe
              title="Minuit Midnight — Rue Oum Errebia, Gueliz, Marrakech"
              src={`https://www.google.com/maps?q=${CONTACT.mapsEmbedQuery}&hl=${locale}&z=15&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: 'contrast(0.9) saturate(0.85) sepia(0.15)' }}
            />
            {/* Encart adresse en bas-gauche — évite de couvrir le label
                Google Maps de la fiche business (positionné en haut) */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm z-10 bg-ink/95 backdrop-blur-md px-5 py-4 border border-cream/10">
              <div className="tag text-coral mb-1">{t.contact.findUs}</div>
              <div className="text-cream text-sm">{CONTACT.address}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-warm py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal className="flex items-center gap-3 mb-6">
                <span className="editorial-num">{t.contact.formNum}</span>
                <span className="tag text-blood">{t.contact.formTag}</span>
              </Reveal>
              <SplitReveal
                as="h2"
                className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tightest"
                lines={[<>{t.contact.formTitle}</>]}
              />
              <Reveal delay={0.3}>
                <p className="mt-6 text-dust leading-relaxed max-w-sm">{t.contact.formLede}</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.2}>
              <ContactForm locale={locale} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
