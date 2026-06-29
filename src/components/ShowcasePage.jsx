import { useState, useEffect } from 'react'
import SilentSeminarForm from './SilentSeminarForm'
import styles from './ShowcasePage.module.css'

const CDN = 'https://sgpro.b-cdn.net/silentSeminars/images'

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
      <div className={styles.heroContent}>
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

      <div className={styles.heroImageWrap} aria-hidden="true">
        <img
          src={`${CDN}/audience/image2.jpg`}
          alt=""
          className={styles.heroImage}
          loading="eager"
        />
        <div className={styles.heroImageOverlay} />
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

// ─── Section 2.5: Video ───────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section className={styles.videoSection} aria-labelledby="video-heading">
      <div className={styles.videoInner}>
        <div className={styles.sectionLabel}>
          <DiamondAccent color="var(--teal)" />
          <h2 id="video-heading" className={styles.sectionTitle} style={{ color: 'var(--white)' }}>
            See it in action
          </h2>
        </div>
        <div className={styles.videoWrap}>
          <iframe
            className={styles.videoFrame}
            src="https://www.youtube-nocookie.com/embed/lq1GgSATqGg?rel=0&modestbranding=1"
            title="Silent Seminars by Show Gear"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
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
        <div className={styles.specsLayout}>
          <div className={styles.specsGrid}>
            {SPECS.map((s) => (
              <div key={s.label} className={styles.specItem}>
                <span className={styles.specLabel}>{s.label}</span>
                <span className={styles.specValue}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.specsImageWrap}>
            <img
              src={`${CDN}/product/transmitter.png`}
              alt="Silent Seminars transmitter unit"
              className={styles.specsImage}
              loading="lazy"
            />
            <img
              src={`${CDN}/product/image1.jpg`}
              alt="Silent Seminars headset"
              className={styles.specsImage}
              loading="lazy"
            />
          </div>
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

// ─── Photo strip ──────────────────────────────────────────────────────────────

const STRIP_PHOTOS = [
  { src: `${CDN}/audience/image1.jpg`, alt: 'Attendees wearing Silent Seminar headsets' },
  { src: `${CDN}/session/image2.jpg`,  alt: 'Silent session in progress' },
  { src: `${CDN}/booth/image2.jpg`,    alt: 'Show Gear booth at an event' },
  { src: `${CDN}/disco/image1.jpg`,    alt: 'Silent disco experience' },
  { src: `${CDN}/audience/image4.jpg`, alt: 'Conference audience with headsets' },
]

function PhotoStrip() {
  return (
    <div className={styles.photoStrip} aria-hidden="true">
      {STRIP_PHOTOS.map((p) => (
        <div key={p.src} className={styles.photoStripItem}>
          <img src={p.src} alt={p.alt} loading="lazy" />
        </div>
      ))}
    </div>
  )
}

// ─── Section 5: Use cases ─────────────────────────────────────────────────────

const USE_CASES = [
  { label: 'Conferences and breakouts', img: `${CDN}/session/image1.jpg` },
  { label: 'Trade-show demos',          img: `${CDN}/booth/image3.jpg` },
  { label: 'Simultaneous translation',  img: `${CDN}/session/image3.jpg` },
  { label: 'Walking and silent tours',  img: `${CDN}/audience/image3.jpg` },
  { label: 'Brand activations',         img: `${CDN}/booth/image4.jpeg` },
  { label: 'Immersive experiences',     img: `${CDN}/disco/image2.jpeg` },
  { label: 'Corporate training',        img: `${CDN}/audience/image5.jpg` },
  { label: 'Accessible events',         img: `${CDN}/disco/image3.jpeg` },
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
              <div className={styles.useCaseImgWrap}>
                <img src={u.img} alt="" loading="lazy" className={styles.useCaseImg} />
              </div>
              <span className={styles.useCaseLabel}>{u.label}</span>
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
      <div className={styles.closingCtaBg} aria-hidden="true">
        <img src={`${CDN}/audience/image5.jpg`} alt="" loading="lazy" />
      </div>
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

// ─── Floating CTA (appears after hero scrolls out) ────────────────────────────

function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#order-form"
      onClick={scrollToForm}
      className={`${styles.floatingCta} ${visible ? styles.floatingCtaVisible : ''}`}
      aria-label="Request a quote"
    >
      Request a quote
    </a>
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
      <FloatingCta />
      <main>
        <Hero />
        <TheProblem />
        <VideoSection />
        <ProductSpecs />
        <WhyItWorks />
        <PhotoStrip />
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
