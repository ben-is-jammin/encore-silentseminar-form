import SilentSeminarForm from './SilentSeminarForm'
import styles from './ShowcasePage.module.css'

// ─── Shared icon sub-components ───────────────────────────────────────────────

function ForwardIcon() {
  return (
    <svg className={styles.forwardIcon} viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="16" height="16" rx="0.5" transform="rotate(45 16 16)" fill="#C41E3A"/>
      <rect x="20" y="3" width="9" height="9" rx="0.3" transform="rotate(45 24.5 7.5)" fill="#0075BF"/>
      <rect x="22" y="18" width="8" height="8" rx="0.3" transform="rotate(45 26 22)" fill="#00B5C8"/>
      <rect x="14" y="24" width="7" height="7" rx="0.3" transform="rotate(45 17.5 27.5)" fill="#F47920"/>
      <rect x="5" y="18" width="6" height="6" rx="0.3" transform="rotate(45 8 21)" fill="#8DC63F"/>
      <rect x="3" y="9" width="5" height="5" rx="0.3" transform="rotate(45 5.5 11.5)" fill="#7B2D8B"/>
      <rect x="23" y="8" width="5" height="5" rx="0.3" transform="rotate(45 25.5 10.5)" fill="#0075BF" opacity="0.6"/>
    </svg>
  )
}

function DiamondAccent({ color }) {
  const fill = color || 'var(--magenta)'
  return (
    <span className={styles.diamondAccent} style={{ background: fill }} aria-hidden="true" />
  )
}

function scrollToForm(e) {
  e.preventDefault()
  const el = document.getElementById('order-form')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroPixels} aria-hidden="true">
        <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="280" y="30" width="60" height="60" transform="rotate(45 310 60)" fill="#DA006A" opacity="0.18"/>
          <rect x="340" y="80" width="40" height="40" transform="rotate(45 360 100)" fill="#00B5C8" opacity="0.14"/>
          <rect x="20"  y="220" width="50" height="50" transform="rotate(45 45 245)" fill="#7B2D8B" opacity="0.12"/>
          <rect x="360" y="200" width="30" height="30" transform="rotate(45 375 215)" fill="#F47920" opacity="0.15"/>
          <rect x="60"  y="40"  width="20" height="20" transform="rotate(45 70 50)"  fill="#0075BF" opacity="0.20"/>
          <rect x="310" y="160" width="18" height="18" transform="rotate(45 319 169)" fill="#8DC63F" opacity="0.18"/>
          <rect x="100" y="270" width="16" height="16" transform="rotate(45 108 278)" fill="#DA006A" opacity="0.12"/>
          <rect x="370" y="260" width="14" height="14" transform="rotate(45 377 267)" fill="#00B5C8" opacity="0.16"/>
        </svg>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroEyebrow}>
          <DiamondAccent color="var(--teal)" />
          <span>Silent Seminars by Show Gear</span>
        </div>

        <h1 id="hero-heading" className={styles.heroHeading}>
          Turn any room into as many crystal-clear, distraction-free theatres as you need.
        </h1>

        <p className={styles.heroSub}>
          Run more sessions, reach every attendee, spend less on setup.
        </p>

        <a href="#order-form" onClick={scrollToForm} className={styles.heroCta}>
          Request a quote
        </a>
      </div>
    </section>
  )
}

// ─── Section 2: The problem ───────────────────────────────────────────────────

const PAINS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="36" height="28" rx="3" stroke="#DA006A" strokeWidth="2.5" fill="none"/>
        <line x1="16" y1="36" x2="12" y2="44" stroke="#DA006A" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="32" y1="36" x2="36" y2="44" stroke="#DA006A" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="10" y1="44" x2="38" y2="44" stroke="#DA006A" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="24" y1="20" x2="24" y2="20" stroke="#DA006A" strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 22 Q24 14 30 22" stroke="#DA006A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    heading: 'Not enough rooms',
    body: 'One venue, multiple concurrent sessions, nowhere near enough separate spaces. Demand outpaces available meeting rooms every time.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="18" r="8" stroke="#DA006A" strokeWidth="2.5" fill="none"/>
        <path d="M12 40 C12 32 36 32 36 40" stroke="#DA006A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <line x1="32" y1="8" x2="38" y2="14" stroke="#DA006A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="38" y1="8" x2="32" y2="14" stroke="#DA006A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    heading: 'Cannot be heard',
    body: 'Background noise, poor room acoustics, and parallel tracks bleeding into one another mean speakers and attendees are constantly fighting the space.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="17" stroke="#DA006A" strokeWidth="2.5" fill="none"/>
        <path d="M20 16 L20 32 L32 24 Z" fill="#DA006A" opacity="0.25"/>
        <path d="M20 16 L20 32 L32 24 Z" stroke="#DA006A" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <path d="M35 18 Q40 24 35 30" stroke="#DA006A" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    heading: 'Must be inclusive',
    body: 'Attendees with hearing loss, those joining in a second language, and anyone seated at the back deserve the same experience as the front row.',
  },
]

function TheProblem() {
  return (
    <section className={styles.section} aria-labelledby="problem-heading">
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent />
          <h2 id="problem-heading" className={styles.sectionTitle}>The problem with shared spaces</h2>
        </div>
        <div className={styles.painGrid}>
          {PAINS.map((pain) => (
            <div key={pain.heading} className={styles.painCard}>
              <div className={styles.painIcon}>{pain.icon}</div>
              <h3 className={styles.painHeading}>{pain.heading}</h3>
              <p className={styles.painBody}>{pain.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: Product specs ─────────────────────────────────────────────────

const SPECS = [
  { label: 'Channels', value: 'Up to 45 simultaneous' },
  { label: 'Battery life', value: '10 to 12 hours' },
  { label: 'Arrives charged', value: '100% on arrival' },
  { label: 'Setup', value: 'Plug-and-play transmitters' },
  { label: 'Channel ID', value: 'Color-coded LED indicators' },
  { label: 'Volume', value: 'Per-listener control' },
  { label: 'Locking', value: 'Programmable and lockable' },
  { label: 'Branding', value: 'Custom event branding' },
  { label: 'Comfort', value: 'All-day wear design' },
  { label: 'Audio', value: 'High-fidelity, interference-free' },
  { label: 'Power', value: 'Rechargeable, sustainable build' },
]

function ProductSpecs() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="specs-heading">
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent color="var(--blue-bright)" />
          <h2 id="specs-heading" className={styles.sectionTitle}>Technical specifications</h2>
        </div>
        <div className={styles.specsGrid}>
          {SPECS.map((s) => (
            <div key={s.label} className={styles.specItem}>
              <span className={styles.specLabel}>{s.label}</span>
              <span className={styles.specValue}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 4: Why it works ──────────────────────────────────────────────────

const BENEFITS = [
  {
    color: 'var(--teal)',
    heading: 'Immersive and clear',
    body: 'Each listener hears only their session. High-fidelity audio delivered directly to the ear, with zero interference from adjacent tracks.',
  },
  {
    color: 'var(--blue-bright)',
    heading: 'More capacity',
    body: 'Run as many as 45 simultaneous sessions in a single venue without partitions, soundproofing, or extra rooms.',
  },
  {
    color: 'var(--green)',
    heading: 'Lower cost and faster setup',
    body: 'Plug-and-play transmitters need no specialist rigging. Less infrastructure means faster load-in and more budget for content.',
  },
  {
    color: 'var(--purple)',
    heading: 'Accessible by design',
    body: 'Individual volume control lets every attendee set their own listening level. No more front-row privilege.',
  },
  {
    color: 'var(--orange)',
    heading: 'Multilingual ready',
    body: 'Assign each channel to a different language interpreter. All tracks run simultaneously without a single audio clash.',
  },
  {
    color: 'var(--magenta)',
    heading: 'Sustainable',
    body: 'Rechargeable units with a full charge on arrival reduce single-use waste and eliminate battery logistics on-site.',
  },
  {
    color: 'var(--indigo)',
    heading: 'Social-ready',
    body: 'Silent sessions turn a noisy venue floor into an intimate branded experience that photographs well and generates organic reach.',
  },
]

function WhyItWorks() {
  return (
    <section className={styles.section} aria-labelledby="why-heading">
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent color="var(--teal)" />
          <h2 id="why-heading" className={styles.sectionTitle}>Why it works</h2>
        </div>
        <div className={styles.benefitsGrid}>
          {BENEFITS.map((b) => (
            <div key={b.heading} className={styles.benefitCard}>
              <span className={styles.benefitBar} style={{ background: b.color }} aria-hidden="true" />
              <div>
                <h3 className={styles.benefitHeading}>{b.heading}</h3>
                <p className={styles.benefitBody}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 5: Use cases ─────────────────────────────────────────────────────

const USE_CASES = [
  { label: 'Conferences and breakouts' },
  { label: 'Trade-show demos' },
  { label: 'Simultaneous translation' },
  { label: 'Walking and silent tours' },
  { label: 'Brand activations' },
  { label: 'Immersive experiences' },
  { label: 'Corporate training' },
  { label: 'Accessible events' },
]

function UseCases() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="usecases-heading">
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent color="var(--purple)" />
          <h2 id="usecases-heading" className={styles.sectionTitle}>Where it gets used</h2>
        </div>
        <ul className={styles.useCaseGrid} role="list">
          {USE_CASES.map((u) => (
            <li key={u.label} className={styles.useCaseItem}>
              <span className={styles.useCaseDot} aria-hidden="true" />
              {u.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Section 6: Fully managed ─────────────────────────────────────────────────

const SERVICES = [
  { heading: 'Maintain and store', body: 'Units are serviced, cleaned, and warehoused between events so equipment arrives show-ready every time.' },
  { heading: 'Program', body: 'Channels and lock settings are pre-configured to your session plan before dispatch.' },
  { heading: 'Brand', body: 'Custom event branding applied to each unit to match your show identity.' },
  { heading: 'Package and ship', body: 'Packed securely with full tracking and coordinated to your load-in schedule.' },
  { heading: 'Receive and reset', body: 'Collected on load-out, fully audited, and returned to stock ready for the next event.' },
]

function FullyManaged() {
  return (
    <section className={`${styles.section} ${styles.managedSection}`} aria-labelledby="managed-heading">
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent color="var(--teal)" />
          <h2 id="managed-heading" className={styles.sectionTitle}>Fully managed by Show Gear</h2>
        </div>
        <div className={styles.servicesGrid}>
          {SERVICES.map((s, i) => (
            <div key={s.heading} className={styles.serviceCard}>
              <span className={styles.serviceNumber} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.serviceHeading}>{s.heading}</h3>
              <p className={styles.serviceBody}>{s.body}</p>
            </div>
          ))}
        </div>
        <p className={styles.managedTagline}>Plug in. Power on. Done.</p>
      </div>
    </section>
  )
}

// ─── Section 7: Proven results ────────────────────────────────────────────────

const EVENTS = [
  {
    name: 'AWS Summit London 2026',
    venue: 'ExCeL London',
    date: '22 Apr 2026',
    stats: [
      { value: '8,500', label: 'headsets' },
      { value: '35', label: 'areas' },
      { value: '25,000', label: 'attendees' },
      { value: '200+', label: 'sessions' },
    ],
  },
  {
    name: 'AWS Summit Hamburg 2026',
    venue: null,
    date: null,
    stats: [
      { value: '8,000', label: 'headsets' },
      { value: '20', label: 'stages' },
      { value: '0', label: 'audio clashes' },
    ],
  },
  {
    name: 'International Confex & Event Production Show 2026',
    venue: 'ExCeL London',
    date: '26 to 27 Feb 2026',
    stats: [
      { value: 'TBC', label: 'headsets', tbc: true },
      { value: '16', label: 'theatres' },
      { value: '2', label: 'show halls' },
      { value: '2', label: 'show days' },
    ],
  },
  {
    name: 'ESC Congress 2025',
    venue: 'Battersea Evolution',
    date: 'Apr 2025',
    stats: [
      { value: '900', label: 'headsets' },
      { value: '9', label: 'theatres' },
      { value: '3', label: 'show days' },
    ],
  },
]

const PROOF_STATS = [
  { value: '80', label: 'stages and theatres simultaneously' },
  { value: '0', label: 'audio clashes reported' },
  { value: '100%', label: 'on-site supported deliveries' },
  { value: 'TBC', label: 'total headsets deployed', tbc: true },
]

function ProvenResults() {
  return (
    <section className={styles.section} aria-labelledby="results-heading">
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent color="var(--orange)" />
          <h2 id="results-heading" className={styles.sectionTitle}>Proven at scale</h2>
        </div>

        <div className={styles.proofStrip}>
          {PROOF_STATS.map((s) => (
            <div key={s.label} className={styles.proofStat}>
              <span className={`${styles.proofValue} ${s.tbc ? styles.tbcValue : ''}`}>
                {s.value}
                {s.tbc && <span className={styles.tbcBadge}>placeholder</span>}
              </span>
              <span className={styles.proofLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.eventsGrid}>
          {EVENTS.map((ev) => (
            <div key={ev.name} className={styles.eventCard}>
              <div className={styles.eventMeta}>
                <h3 className={styles.eventName}>{ev.name}</h3>
                {(ev.venue || ev.date) && (
                  <p className={styles.eventDetail}>
                    {[ev.venue, ev.date].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
              <div className={styles.eventStats}>
                {ev.stats.map((st) => (
                  <div key={st.label} className={styles.eventStat}>
                    <span className={`${styles.eventStatValue} ${st.tbc ? styles.tbcValue : ''}`}>
                      {st.value}
                      {st.tbc && <span className={styles.tbcBadge}>placeholder</span>}
                    </span>
                    <span className={styles.eventStatLabel}>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 8: Closing CTA ───────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className={styles.closingCta} aria-labelledby="cta-heading">
      <div className={styles.closingCtaInner}>
        <h2 id="cta-heading" className={styles.closingCtaHeading}>Ready to run your event on headsets?</h2>
        <p className={styles.closingCtaSub}>
          Submit an order request below and the Show Gear team will be in touch to confirm logistics.
        </p>
        <a href="#order-form" onClick={scrollToForm} className={styles.closingCtaBtn}>
          Go to order form
        </a>
        <div className={styles.closingCtaContact}>
          <a href="mailto:andreu@showgear.com">andreu@showgear.com</a>
          <span aria-hidden="true">·</span>
          <a href="tel:+16199026564">(619) 902-6564</a>
          <span aria-hidden="true">·</span>
          <a href="https://showgear.com" target="_blank" rel="noopener noreferrer">showgear.com</a>
        </div>
      </div>
    </section>
  )
}

// ─── Nav header ───────────────────────────────────────────────────────────────

function NavHeader() {
  return (
    <header className={styles.navHeader}>
      <div className={styles.navPixels} aria-hidden="true">
        <svg viewBox="0 0 180 68" fill="none">
          <rect x="128" y="11" width="24" height="24" transform="rotate(45 140 23)" fill="#DA006A" opacity="0.85"/>
          <rect x="105" y="19" width="17" height="17" transform="rotate(45 113 27)" fill="#7B2D8B" opacity="0.65"/>
          <rect x="148" y="30" width="15" height="15" transform="rotate(45 155 37)" fill="#00B5C8" opacity="0.75"/>
          <rect x="94"  y="33" width="11" height="11" transform="rotate(45 99 38)"  fill="#0075BF" opacity="0.45"/>
          <rect x="160" y="12" width="9"  height="9"  transform="rotate(45 164 16)" fill="#F47920" opacity="0.55"/>
          <rect x="120" y="42" width="8"  height="8"  transform="rotate(45 124 46)" fill="#8DC63F" opacity="0.5"/>
        </svg>
      </div>
      <div className={styles.navLogoLockup}>
        <ForwardIcon />
        <span className={styles.navWordmark}>
          Show Gear<sup>TM</sup>
        </span>
      </div>
      <a href="#order-form" onClick={scrollToForm} className={styles.navCta}>
        Request a quote
      </a>
    </header>
  )
}

// ─── Page footer ─────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <footer className={styles.pageFooter}>
      <span>
        &copy; Show Gear Productions &middot;{' '}
        <a href="https://showgear.com" target="_blank" rel="noopener noreferrer">showgear.com</a>
        {' '}&middot; Silent Seminars wireless headset systems
      </span>
    </footer>
  )
}

// ─── Root export ─────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  return (
    <div className={styles.page}>
      <NavHeader />
      <main>
        <Hero />
        <TheProblem />
        <ProductSpecs />
        <WhyItWorks />
        <UseCases />
        <FullyManaged />
        <ProvenResults />
        <ClosingCta />

        <div id="order-form" className={styles.formAnchor}>
          <SilentSeminarForm embedded />
        </div>
      </main>
      <PageFooter />
    </div>
  )
}
