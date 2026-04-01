import { useState, useCallback, useEffect, useMemo } from 'react'
import styles from './SilentSeminarForm.module.css'

// ─── Sub-components ────────────────────────────────────────────────────────

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

function HeaderPixels() {
  return (
    <div className={styles.headerPixels} aria-hidden="true">
      <svg viewBox="0 0 180 68" fill="none">
        <rect x="128" y="11" width="24" height="24" transform="rotate(45 140 23)" fill="#DA006A" opacity="0.85"/>
        <rect x="105" y="19" width="17" height="17" transform="rotate(45 113 27)" fill="#7B2D8B" opacity="0.65"/>
        <rect x="148" y="30" width="15" height="15" transform="rotate(45 155 37)" fill="#00B5C8" opacity="0.75"/>
        <rect x="94" y="33" width="11" height="11" transform="rotate(45 99 38)" fill="#0075BF" opacity="0.45"/>
        <rect x="160" y="12" width="9" height="9" transform="rotate(45 164 16)" fill="#F47920" opacity="0.55"/>
        <rect x="120" y="42" width="8" height="8" transform="rotate(45 124 46)" fill="#8DC63F" opacity="0.5"/>
        <rect x="85" y="9" width="8" height="8" transform="rotate(45 89 13)" fill="#DA006A" opacity="0.3"/>
        <rect x="164" y="46" width="7" height="7" transform="rotate(45 167 49)" fill="#00B5C8" opacity="0.35"/>
      </svg>
    </div>
  )
}

function SectionHeading({ label }) {
  return (
    <div className={styles.sectionHeading}>
      <div className={styles.sectionDiamond} />
      <h2 className={styles.sectionLabel}>{label}</h2>
    </div>
  )
}

function FieldError({ message, show }) {
  if (!show) return null
  return <p className={styles.fieldError}>{message}</p>
}

function encodeBasicAuth(username, password) {
  const credentials = `${username}:${password}`
  const bytes = new TextEncoder().encode(credentials)
  let binary = ''

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return `Basic ${btoa(binary)}`
}

const MAX_QTY = 10000

function EquipCard({ id, name, description, icon, checked, quantity, locked, onToggle, onQtyChange }) {
  const [rawQty, setRawQty] = useState(String(quantity))
  useEffect(() => { setRawQty(String(quantity)) }, [quantity])

  const commitQty = (val) => {
    const parsed = parseInt(val, 10)
    const clamped = isNaN(parsed) || parsed < 1 ? 1 : Math.min(MAX_QTY, parsed)
    onQtyChange(clamped)
    setRawQty(String(clamped))
  }

  return (
    <div
      className={`${styles.equipCard} ${checked ? styles.equipCardSelected : ''} ${locked ? styles.equipCardLocked : ''}`}
      onClick={(e) => {
        if (locked) return
        if (e.target.closest(`.${styles.equipQty}`)) return
        onToggle()
      }}
    >
      <input
        type="checkbox"
        className={styles.equipCheck}
        checked={checked}
        disabled={locked}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        aria-label={locked ? `${name} is required` : `Select ${name}`}
      />
      <div className={styles.equipIcon}>{icon}</div>
      <div className={styles.equipName}>{name}</div>
      <div className={styles.equipDesc}>{description}</div>
      {locked && <div className={styles.equipLockNote}>Required minimum of 1</div>}

      <div className={styles.equipCardFooter}>
        {checked ? (
          <>
            <div className={styles.equipQty} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => onQtyChange(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >−</button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={styles.qtyInput}
                value={rawQty}
                onChange={(e) => setRawQty(e.target.value.replace(/[^0-9]/g, ''))}
                onBlur={() => commitQty(rawQty)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commitQty(rawQty) } }}
                aria-label={`Quantity for ${name}`}
              />
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => onQtyChange(Math.min(MAX_QTY, quantity + 1))}
                aria-label="Increase quantity"
              >+</button>
            </div>
            <div className={styles.qtyLabel}>units</div>
          </>
        ) : null}
      </div>
    </div>
  )
}

// ─── Initial state ──────────────────────────────────────────────────────────

const INITIAL_FORM = {
  eventName:          '',
  eventDetails:       '',
  startDate:          '',
  endDate:            '',
  loadInDate:         '',
  loadOutDate:        '',
  shippingType:       '',
  shippingAddress:    '',
  fullName:           '',
  email:              '',
  phone:              '',
  notes:              '',
}

const INITIAL_EQUIPMENT = {
  headset:     { checked: false, quantity: 1 },
  transmitter: { checked: true, quantity: 1 },
  branded:     { checked: false, quantity: 1 },
}

const EQUIPMENT_META = {
  transmitter: {
    name: 'TX-50RF Transmitter',
    description: 'Silent Seminar Transmitter with 45 frequencies for better headset coverage in busy expo environments.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/>
        <path d="M16.24 7.76a6 6 0 010 8.49M7.76 7.76a6 6 0 000 8.49"/>
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
      </svg>
    ),
  },
  headset: {
    name: '45ch Headset',
    description: 'Headset for Silent Seminar featuring 45 radio frequencies to ensure a clear experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0118 0v6"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
      </svg>
    ),
  },
  branded: {
    name: 'Custom Branded 45ch Headset',
    description: 'Custom-branded headset with your logo or image, featuring all 45 unique radio frequencies for a clear experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0118 0v6"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
        <path d="M9 7h6M12 4v3" strokeWidth="1.8"/>
      </svg>
    ),
  },
}

// ─── Validation ─────────────────────────────────────────────────────────────

function getTotalHeadsets(equipment) {
  return (equipment.headset?.checked ? equipment.headset.quantity : 0)
       + (equipment.branded?.checked ? equipment.branded.quantity : 0)
}

function getMinLoadInDate(totalHeadsets) {
  if (totalHeadsets < 1000) return ''
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 45)
  return d.toISOString().split('T')[0]
}

function formatDateLabel(isoStr) {
  if (!isoStr) return ''
  const [y, m, d] = isoStr.split('-')
  return `${parseInt(m, 10)}/${parseInt(d, 10)}/${y}`
}

function validateDates(form, totalHeadsets, minLoadIn) {
  const errs = {}
  const { startDate, endDate, loadInDate, loadOutDate } = form

  if (startDate && endDate && startDate > endDate)
    errs.endDate = 'End date must be on or after the start date.'

  if (loadInDate && startDate && loadInDate > startDate)
    errs.loadInDate = 'Load-in date must be on or before the event start date.'

  if (loadOutDate && endDate && loadOutDate < endDate)
    errs.loadOutDate = 'Load-out date must be on or after the event end date.'

  if (totalHeadsets >= 1000 && loadInDate && minLoadIn && loadInDate < minLoadIn)
    errs.loadInDate = `Orders of 1,000 headsets or more require a minimum 45-day lead time. Earliest allowed load-in date: ${formatDateLabel(minLoadIn)}.`

  return errs
}

function validate(form, equipment, liveErrors) {
  const errors = {}
  const email = form.email.trim()

  if (!form.eventName.trim())        errors.eventName       = 'Please enter the event name.'
  if (!form.startDate)               errors.startDate       = 'Required.'
  if (!form.endDate)                 errors.endDate         = 'Required.'
  if (!form.loadInDate)              errors.loadInDate      = 'Required.'
  if (!form.loadOutDate)             errors.loadOutDate     = 'Required.'
  if (!form.shippingType)            errors.shippingType    = 'Please select an address type.'
  if (!form.shippingAddress.trim())  errors.shippingAddress = 'Please enter a shipping address.'
  if (!form.fullName.trim())         errors.fullName        = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                     errors.email           = 'Please enter a valid email address.'
  else if (!/@encoreglobal\.com$/i.test(email))
                                     errors.email           = 'Please use your @encoreglobal.com email address.'
  if (form.phone.replace(/\D/g,'').length < 10)
                                     errors.phone           = 'Please enter a valid phone number (at least 10 digits).'

  if (!equipment.transmitter?.checked || equipment.transmitter.quantity < 1)
                                     errors.equipment       = 'At least one transmitter is required for every order.'

  const anyEquip = Object.values(equipment).some(e => e.checked)
  if (!anyEquip && !errors.equipment)
    errors.equipment = 'Please select at least one piece of equipment.'

  // Merge live date errors (only where no "Required" error already exists)
  for (const [key, msg] of Object.entries(liveErrors)) {
    if (!errors[key]) errors[key] = msg
  }

  return errors
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function SilentSeminarForm() {
  const [form, setForm]           = useState(INITIAL_FORM)
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT)
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [summary, setSummary]     = useState(null)

  const totalHeadsets = getTotalHeadsets(equipment)
  const minLoadIn     = getMinLoadInDate(totalHeadsets)

  const liveErrors = useMemo(
    () => validateDates(form, totalHeadsets, minLoadIn),
    [form, totalHeadsets, minLoadIn],
  )

  const dateErrorFor = useCallback((field) => {
    return errors[field] || liveErrors[field] || ''
  }, [errors, liveErrors])

  const setField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }, [])

  const toggleEquip = useCallback((key) => {
    if (key === 'transmitter') return

    setEquipment(prev => ({
      ...prev,
      [key]: { ...prev[key], checked: !prev[key].checked },
    }))
    setErrors(prev => { const next = { ...prev }; delete next.equipment; delete next.loadInDate; return next })
  }, [])

  const setQty = useCallback((key, qty) => {
    setEquipment(prev => ({ ...prev, [key]: { ...prev[key], quantity: qty } }))
    setErrors(prev => { const next = { ...prev }; delete next.loadInDate; return next })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form, equipment, liveErrors)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErrEl = document.querySelector('[data-error="true"]')
      firstErrEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)

    const selectedEquipment = Object.entries(equipment)
      .filter(([, v]) => v.checked)
      .map(([key, v]) => ({ item: EQUIPMENT_META[key].name, quantity: v.quantity }))

    const payload = {
      event_name:               form.eventName,
      event_details:            form.eventDetails,
      start_date:               form.startDate,
      end_date:                 form.endDate,
      load_in_date:             form.loadInDate,
      load_out_date:            form.loadOutDate,
      shipping_address_type:    form.shippingType,
      shipping_address:         form.shippingAddress,
      full_name:                form.fullName,
      email:                    form.email,
      phone:                    form.phone,
      notes:                    form.notes,
      equipment:                selectedEquipment,
      submitted_at:             new Date().toISOString(),
      source:                   'encore-silent-seminar-portal',
    }

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      const webhookUsername = import.meta.env.VITE_N8N_WEBHOOK_USERNAME
      const webhookPassword = import.meta.env.VITE_N8N_WEBHOOK_PASSWORD

      if (webhookUrl) {
        if (!webhookUsername || !webhookPassword) {
          throw new Error('Missing n8n basic auth credentials')
        }

        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: encodeBasicAuth(webhookUsername, webhookPassword),
          },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // Dev mode — simulate delay
        await new Promise(r => setTimeout(r, 1200))
      }

      setSummary({
        eventName:  payload.event_name,
        dates:      `${payload.start_date} to ${payload.end_date}`,
        shipping:   `${payload.shipping_address_type} — ${payload.shipping_address.split('\n')[0]}`,
        equipment:  selectedEquipment.map(e => `${e.quantity}x ${e.item}`).join(', '),
      })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (err) {
      console.error(err)
      alert('Something went wrong submitting your order. Please try again or contact ShowGear directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setEquipment(INITIAL_EQUIPMENT)
    setErrors({})
    setSummary(null)
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <a className={styles.logoLockup} href="#" aria-label="Encore">
          <ForwardIcon />
          <span className={styles.wordmark}>encore<sup>SM</sup></span>
        </a>
        <HeaderPixels />
      </header>

      {/* ── Main ── */}
      <main className={styles.main}>
        <div className={styles.card}>

          {/* Card header */}
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderBg} aria-hidden="true">
              <svg width="130" height="90" viewBox="0 0 130 90" fill="none">
                <rect x="65" y="10" width="40" height="40" transform="rotate(45 85 30)" fill="white"/>
                <rect x="88" y="32" width="28" height="28" transform="rotate(45 102 46)" fill="white"/>
                <rect x="46" y="38" width="22" height="22" transform="rotate(45 57 49)" fill="white"/>
                <rect x="96" y="7" width="16" height="16" transform="rotate(45 104 15)" fill="white"/>
              </svg>
            </div>
            <h1 className={styles.cardTitle}>Silent Seminar Order</h1>
            <p className={styles.cardSubtitle}>Complete the form below and we'll send your official quote right away. We're here to make your event seamless.</p>
          </div>

          {/* ── Success state ── */}
          {submitted && summary ? (
            <div className={styles.successState} role="alert">
              <div className={styles.successIcon}>
                <svg width="62" height="62" viewBox="0 0 62 62" fill="none" aria-hidden="true">
                  <rect x="15" y="15" width="32" height="32" rx="1" transform="rotate(45 31 31)" fill="#1B1464"/>
                  <path d="M22 31.5L28 37.5L40 25.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className={styles.successTitle}>Order received — nice work!</h2>
              <p className={styles.successText}>Your silent seminar order has been submitted. The ShowGear team will follow up with your official quote shortly.</p>
              <div className={styles.successDetails}>
                {Object.values(summary).map((line, i) => (
                  <span key={i} className={styles.successDetailLine}>{line}</span>
                ))}
              </div>
              <button className={styles.newOrderBtn} onClick={handleReset} type="button">
                Submit another order
              </button>
            </div>
          ) : (

          /* ── Form ── */
          <div className={styles.formBody}>
            <form onSubmit={handleSubmit} noValidate>

              {/* ── Section 1: Event Information ── */}
              <section className={styles.formSection}>
                <SectionHeading label="Event information" />

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="eventName">
                    Event name <span className={styles.req}>*</span>
                  </label>
                  <input
                    className={`${styles.input} ${errors.eventName ? styles.inputError : ''}`}
                    id="eventName" type="text"
                    placeholder="e.g. Acme Corp Annual Summit 2025"
                    value={form.eventName}
                    onChange={e => setField('eventName', e.target.value)}
                    data-error={!!errors.eventName}
                  />
                  <FieldError message={errors.eventName} show={!!errors.eventName} />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="eventDetails">Event details</label>
                  <textarea
                    className={styles.textarea}
                    id="eventDetails"
                    placeholder="Describe your event format, audience size, or any relevant context…"
                    value={form.eventDetails}
                    onChange={e => setField('eventDetails', e.target.value)}
                  />
                </div>

                <div className={`${styles.fieldGroup} ${styles.row2}`}>
                  {[
                    { id: 'startDate', label: 'Start date', field: 'startDate' },
                    { id: 'endDate',   label: 'End date',   field: 'endDate' },
                  ].map(({ id, label, field }) => {
                    const err = dateErrorFor(field)
                    return (
                      <div key={id}>
                        <label className={styles.label} htmlFor={id}>
                          {label} <span className={styles.req}>*</span>
                        </label>
                        <input
                          className={`${styles.input} ${err ? styles.inputError : ''}`}
                          id={id} type="date"
                          value={form[field]}
                          onChange={e => setField(field, e.target.value)}
                          data-error={!!err}
                          aria-invalid={!!err}
                        />
                        <FieldError message={err} show={!!err} />
                      </div>
                    )
                  })}
                </div>

                <p className={styles.fieldNote}>Start date and end date should reflect the event dates.</p>

                <div className={`${styles.fieldGroup} ${styles.row2}`}>
                  {[
                    { id: 'loadInDate',  label: 'Load-in date',  field: 'loadInDate' },
                    { id: 'loadOutDate', label: 'Load-out date', field: 'loadOutDate' },
                  ].map(({ id, label, field }) => {
                    const err = dateErrorFor(field)
                    return (
                      <div key={id}>
                        <label className={styles.label} htmlFor={id}>
                          {label} <span className={styles.req}>*</span>
                        </label>
                        <input
                          className={`${styles.input} ${err ? styles.inputError : ''}`}
                          id={id} type="date"
                          value={form[field]}
                          onChange={e => setField(field, e.target.value)}
                          min={field === 'loadInDate' && minLoadIn ? minLoadIn : undefined}
                          data-error={!!err}
                          aria-invalid={!!err}
                        />
                        <FieldError message={err} show={!!err} />
                      </div>
                    )
                  })}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="shippingType">
                    Shipping address type <span className={styles.req}>*</span>
                  </label>
                  <select
                    className={`${styles.select} ${errors.shippingType ? styles.inputError : ''}`}
                    id="shippingType"
                    value={form.shippingType}
                    onChange={e => setField('shippingType', e.target.value)}
                    data-error={!!errors.shippingType}
                  >
                    <option value="" disabled>Select address type</option>
                    <option value="Venue">Venue</option>
                    <option value="Preferred AV Vendor">Preferred AV Vendor</option>
                    <option value="Other">Other</option>
                  </select>
                  <FieldError message={errors.shippingType} show={!!errors.shippingType} />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="shippingAddress">
                    Shipping address <span className={styles.req}>*</span>
                  </label>
                  <textarea
                    className={`${styles.textarea} ${errors.shippingAddress ? styles.inputError : ''}`}
                    id="shippingAddress"
                    placeholder="Street address, city, state, ZIP…"
                    style={{ minHeight: '72px' }}
                    value={form.shippingAddress}
                    onChange={e => setField('shippingAddress', e.target.value)}
                    data-error={!!errors.shippingAddress}
                  />
                  <FieldError message={errors.shippingAddress} show={!!errors.shippingAddress} />
                </div>
              </section>

              <div className={styles.divider} />

              {/* ── Section 2: Signer Information ── */}
              <section className={styles.formSection}>
                <SectionHeading label="Signer information" />

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="fullName">
                    Full name <span className={styles.req}>*</span>
                  </label>
                  <input
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    id="fullName" type="text"
                    placeholder="Alex Rivera"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={e => setField('fullName', e.target.value)}
                    data-error={!!errors.fullName}
                  />
                  <FieldError message={errors.fullName} show={!!errors.fullName} />
                </div>

                <div className={`${styles.fieldGroup} ${styles.row2}`}>
                  <div>
                    <label className={styles.label} htmlFor="email">
                      Email address <span className={styles.req}>*</span>
                    </label>
                    <input
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      id="email" type="email"
                      placeholder="your.name@encoreglobal.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      data-error={!!errors.email}
                    />
                    <p className={styles.fieldHint}>Use your @encoreglobal.com email address.</p>
                    <FieldError message={errors.email} show={!!errors.email} />
                  </div>
                  <div>
                    <label className={styles.label} htmlFor="phone">
                      Phone number <span className={styles.req}>*</span>
                    </label>
                    <input
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      id="phone" type="tel"
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => setField('phone', e.target.value)}
                      data-error={!!errors.phone}
                    />
                    <p className={styles.fieldHint}>Format: (555) 123-4567 — at least 10 digits</p>
                    <FieldError message={errors.phone} show={!!errors.phone} />
                  </div>
                </div>
              </section>

              <div className={styles.divider} />

              {/* ── Section 3: Additional Information ── */}
              <section className={styles.formSection}>
                <SectionHeading label="Additional information" />

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="notes">
                    Additional notes or special requirements
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="notes"
                    placeholder="Anything else we should know about your event…"
                    value={form.notes}
                    onChange={e => setField('notes', e.target.value)}
                  />
                </div>
              </section>

              <div className={styles.divider} />

              {/* ── Section 5: Equipment Selection ── */}
              <section className={styles.formSection}>
                <SectionHeading label="Equipment selection" />

                <p className={styles.equipIntro}>
                  Select the equipment you need for your event.{' '}
                  <span className={styles.req}>*</span>
                </p>
                <p className={styles.fieldNote}>
                  One transmitter is included by default and required for every order. Increase the transmitter quantity if you need additional broadcasts.
                </p>

                <div className={styles.equipGrid}>
                  {Object.entries(EQUIPMENT_META).map(([key, meta]) => (
                    <EquipCard
                      key={key}
                      id={key}
                      name={meta.name}
                      description={meta.description}
                      icon={meta.icon}
                      checked={equipment[key].checked}
                      quantity={equipment[key].quantity}
                      locked={key === 'transmitter'}
                      onToggle={() => toggleEquip(key)}
                      onQtyChange={(qty) => setQty(key, qty)}
                    />
                  ))}
                </div>
                {totalHeadsets >= 1000 && (
                  <p className={styles.leadTimeNote}>
                    <strong>Orders of 1,000 headsets or more require a minimum 45-day lead time.</strong>{' '}
                    Earliest allowed load-in date: {formatDateLabel(minLoadIn)}.
                  </p>
                )}
                <FieldError message={errors.equipment} show={!!errors.equipment} />
              </section>

              {/* ── Submit ── */}
              <div className={styles.submitWrap}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? <span className={styles.spinner} aria-hidden="true" /> : 'Submit order'}
                </button>
              </div>

            </form>
          </div>
          )}

        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <a href="https://showgear.com" target="_blank" rel="noopener noreferrer">
          ShowGear Productions
        </a>
        {' '}·{' '}Silent Seminar order portal for Encore Team Members
      </footer>
    </div>
  )
}
