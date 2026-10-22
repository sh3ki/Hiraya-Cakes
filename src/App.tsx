import { useEffect, useRef, useState, type FormEvent, type ImgHTMLAttributes } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, CakeSlice, Check, ChevronDown, Clipboard, Gift, Heart, Instagram, Menu, MessageCircle, PenLine, Sparkles, X } from 'lucide-react'
import { business, faqs, navigation, products, type Category } from './data'
import { images } from './images'

type Inquiry = {
  name: string
  mobile: string
  email: string
  cake: string
  size: string
  occasion: string
  date: string
  fulfillment: 'Pickup' | 'Delivery'
  address: string
  notes: string
  consent: boolean
}

const initialInquiry: Inquiry = {
  name: '', mobile: '', email: '', cake: '', size: '', occasion: '',
  date: '', fulfillment: 'Pickup', address: '', notes: '', consent: false,
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Hiraya Cakes and Co., home">
      <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M12 13v24M36 13v24M12 25h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 13c5-7 10-7 16-1 6-6 11-6 16 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7 40h34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="brand-type"><strong>HIRAYA</strong><small>CAKES &amp; CO.</small></span>
    </a>
  )
}

function Photo({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={src} alt={alt} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/image-fallback.svg' }} {...props} />
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-intro reveal"><span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [filter, setFilter] = useState<'All' | Category>('All')
  const [inquiry, setInquiry] = useState<Inquiry>(initialInquiry)
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({})
  const [prepared, setPrepared] = useState(false)
  const [handoffMessage, setHandoffMessage] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDetailsElement>(null)
  const messengerConfigured = /^https:\/\/(www\.)?(facebook\.com|m\.me|messenger\.com)\//i.test(business.messengerUrl)
  const whatsappDigits = business.whatsappNumber.replace(/\D/g, '')
  const whatsappConfigured = /^639\d{9}$/.test(whatsappDigits)
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const sections = document.querySelectorAll<HTMLElement>('main section[id], footer[id]')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.15, 0.35] })
    sections.forEach((section) => observer.observe(section))
    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); revealObserver.disconnect() }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  function update<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    setInquiry((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setPrepared(false)
    setHandoffMessage('')
  }

  function selectCake(cake: string) {
    setInquiry((current) => ({ ...current, cake }))
    setErrors((current) => ({ ...current, cake: undefined }))
    setPrepared(false)
    setHandoffMessage('')
    setMenuOpen(false)
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  function validate() {
    const next: Partial<Record<keyof Inquiry, string>> = {}
    if (!inquiry.name.trim()) next.name = 'Please enter your full name.'
    if (!/^(?:\+63|63|0)9\d{9}$/.test(inquiry.mobile.replace(/[\s()-]/g, ''))) next.mobile = 'Enter a valid Philippine mobile number (e.g. 0917 123 4567).'
    if (inquiry.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email.trim())) next.email = 'Enter a valid email address.'
    if (!inquiry.cake) next.cake = 'Please choose a cake.'
    if (!inquiry.date) next.date = 'Please choose a preferred date.'
    else if (inquiry.date < today) next.date = 'Choose today or a future date.'
    if (inquiry.fulfillment === 'Delivery' && !inquiry.address.trim()) next.address = 'Please enter your delivery area or address.'
    if (!inquiry.consent) next.consent = 'Please acknowledge how your inquiry will be shared.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) {
      setPrepared(false)
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setPrepared(true)
    setHandoffMessage('Your details are ready. Choose a way to send them below; this is not an order confirmation.')
    requestAnimationFrame(() => document.getElementById('handoff')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }

  const summary = [
    'Hello Hiraya Cakes & Co.! I would like to inquire about a cake.',
    '',
    `Name: ${inquiry.name.trim()}`,
    `Mobile: ${inquiry.mobile.trim()}`,
    ...(inquiry.email.trim() ? [`Email: ${inquiry.email.trim()}`] : []),
    `Cake: ${inquiry.cake}`,
    ...(inquiry.size.trim() ? [`Size / servings: ${inquiry.size.trim()}`] : []),
    ...(inquiry.occasion.trim() ? [`Occasion: ${inquiry.occasion.trim()}`] : []),
    `Preferred date: ${inquiry.date}`,
    `Preference: ${inquiry.fulfillment}`,
    ...(inquiry.fulfillment === 'Delivery' ? [`Delivery area / address: ${inquiry.address.trim()}`] : []),
    ...(inquiry.notes.trim() ? [`Design notes: ${inquiry.notes.trim()}`] : []),
    '',
    'Please let me know about availability, final pricing, and how to confirm. Thank you!',
  ].join('\n')

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setHandoffMessage('Inquiry details copied. Paste them into your chat and press Send. Your order is not confirmed until the shop replies.')
      return true
    } catch {
      if (summaryRef.current) summaryRef.current.open = true
      setHandoffMessage('Clipboard access was blocked. Please select and copy the inquiry details shown below, then paste them into your chat.')
      return false
    }
  }

  async function sendMessenger() {
    const popup = window.open('about:blank', '_blank')
    if (popup) popup.opener = null
    const copied = await copySummary()
    if (popup) popup.location.href = business.messengerUrl
    if (!popup) setHandoffMessage(`Your browser blocked the Messenger window. ${copied ? 'The details are copied; use the Messenger link below, then paste and send.' : 'Copy the details below, then use the Messenger link and paste them.'}`)
  }

  function sendWhatsapp() {
    const popup = window.open(`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(summary)}`, '_blank')
    if (popup) popup.opener = null
    setHandoffMessage(popup ? 'WhatsApp opened with your inquiry. Please press Send; your order is not confirmed until the shop replies.' : 'Your browser blocked WhatsApp. Please allow popups or copy the details below and message the shop manually.')
  }

  return (
    <>
      <div className="announcement"><span>Baked with love, made for your sweetest moments <span aria-hidden="true">♡</span></span><a href="#order">Inquire now <ArrowUpRight size={13} /></a></div>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a key={item.href} className={activeSection === item.href.slice(1) ? 'active' : ''} href={item.href}>{item.label}</a>)}
          </nav>
          <a href="#order" className="button button-primary nav-cta">Order a Cake <ArrowUpRight size={16} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="mobile-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} /> : <Menu size={25} />}</button>
        </div>
        <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation" inert={!menuOpen}>
          {navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={18} /></a>)}
          <a className="mobile-order" href="#order" onClick={() => setMenuOpen(false)}>Order a Cake <ArrowRight size={18} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" />HANDCRAFTED CAKES FOR EVERY CELEBRATION</div>
              <h1>A Little Slice<br />of <em>Happiness.</em></h1>
              <p>Thoughtfully baked, beautifully decorated, and made to make every celebration sweeter.</p>
              <div className="hero-actions"><a className="button button-primary" href="#cakes">Explore Our Cakes <ArrowUpRight size={18} /></a><a className="text-link" href="#order">Order Your Dream Cake <ArrowRight size={18} /></a></div>
              <div className="hero-note"><span className="note-heart"><Heart size={17} fill="currentColor" /></span><span>Made for the moments<br />you'll always remember.</span></div>
            </div>
            <div className="hero-art" aria-label="Celebration cake photography">
              <div className="hero-blob" />
              <div className="hero-main-photo"><Photo src={images.hero} alt="Elegant white tiered cake dressed with strawberries and berries" fetchPriority="high" /></div>
              <div className="hero-small-photo"><Photo src={images.heroDetail} alt="Soft pink frosted cupcakes with delicate decoration" loading="eager" /></div>
              <div className="hero-seal"><span>BAKED WITH</span><Heart size={19} fill="currentColor" /><span>LOVE &amp; JOY</span></div>
              <div className="hero-sparkle" aria-hidden="true">✳</div>
              <span className="hero-photo-caption">a little sweetness in every detail —</span>
            </div>
          </div>
          <a href="#highlights" className="scroll-cue" aria-label="Scroll to discover"><span>SCROLL TO DISCOVER</span><ArrowDown size={16} /></a>
        </section>

        <section className="highlights" id="highlights" aria-label="What makes our cakes special">
          <div className="container highlights-grid">
            {[
              { icon: <CakeSlice />, title: 'Freshly Baked', detail: 'Made with care for your moment' },
              { icon: <Heart />, title: 'Made with Love', detail: 'Thoughtful in every little detail' },
              { icon: <PenLine />, title: 'Custom Designs', detail: 'As unique as your celebration' },
              { icon: <Gift />, title: 'Perfect for Gifting', detail: 'A sweet way to say you care' },
            ].map((item) => <div className="highlight reveal" key={item.title}><span className="highlight-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></div>)}
          </div>
        </section>

        <section className="cakes-section section-pad" id="cakes">
          <div className="container">
            <div className="cakes-heading"><SectionIntro eyebrow="THE SWEET COLLECTION" title="Our Sweetest Creations" description="From simple little joys to grand celebrations." /><div className="section-side-note">A cake for every kind<br />of <em>beautiful moment.</em></div></div>
            <div className="filter-row" role="group" aria-label="Filter cakes by category">
              {(['All', 'Signature', 'Custom', 'Celebration'] as const).map((category) => <button type="button" key={category} className={`filter ${filter === category ? 'selected' : ''}`} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category === 'All' ? 'All Cakes' : category}</button>)}
            </div>
            <div className="product-grid">
              {products.filter((product) => filter === 'All' || product.category === filter).map((product) => <article className="product-card" key={product.name}>
                <div className="product-photo"><Photo src={product.image} alt={product.alt} loading="lazy" /><span className="product-category">{product.category}</span></div>
                <div className="product-info"><div className="product-index">0{products.indexOf(product) + 1} <span> / THE COLLECTION</span></div><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><span className="price"><small>SAMPLE PRICE</small>{product.price}</span><button type="button" className="circle-action" onClick={() => selectCake(product.name)} aria-label={`Inquire about ${product.name}`} title={`Inquire about ${product.name}`}><ArrowUpRight size={20} /></button></div><button type="button" className="product-inquire" onClick={() => selectCake(product.name)}>Inquire About This Cake <ArrowRight size={14} /></button></div>
              </article>)}
            </div>
            <p className="price-disclaimer"><Sparkles size={15} /> {business.priceNote} Photographs are illustrative design inspiration, not actual shop products.</p>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="container about-grid">
            <div className="about-visual reveal"><div className="about-image"><Photo src={images.about} alt="Artisan chef carefully working on a dessert in a kitchen" loading="lazy" /></div><div className="about-card"><span className="script-word">hiraya</span><span>n. hopes, dreams &amp; imagination</span></div><div className="about-outline" /></div>
            <div className="about-copy reveal"><span className="eyebrow"><span className="eyebrow-line" />OUR STORY</span><h2>Made with Heart,<br /><em>Shared with Love.</em></h2><p>Hiraya is a word for hopes, dreams, and the beautiful things we imagine. It feels just right for a cake made to celebrate yours.</p><p>From intimate birthdays to once-in-a-lifetime milestones, our vision is simple: thoughtful bakes, lovely details, and a little extra joy in every slice.</p><div className="about-signoff"><span className="little-flower">✳</span><span>For all of life's<br /><em>sweetest moments.</em></span></div><a href="#order" className="text-link">Tell Us What You're Dreaming Of <ArrowRight size={18} /></a></div>
          </div>
        </section>

        <section className="custom-section" aria-labelledby="custom-title">
          <div className="container custom-panel"><div className="custom-copy reveal"><span className="eyebrow light-eyebrow"><span className="eyebrow-line" />MADE UNIQUELY YOURS</span><h2 id="custom-title">Your Dream Cake,<br /><em>Made Just for You.</em></h2><p>A color, a theme, a heartfelt message. Share the little details that make your celebration yours, and let's imagine something beautiful together.</p><button className="button button-light" type="button" onClick={() => selectCake('Custom Cake')}>Request a Custom Cake <ArrowUpRight size={18} /></button><span className="custom-footnote">Your idea is the sweetest starting point.</span></div><div className="custom-image"><Photo src={images.custom} alt="Pink decorated celebration cake on a cake stand" loading="lazy" /></div><span className="custom-decoration" aria-hidden="true">✳</span></div>
        </section>

        <section className="steps-section section-pad" id="how-to-order"><div className="container"><SectionIntro eyebrow="SIMPLE AS ONE, TWO, SWEET" title="How to Order" description="A few little steps between you and your celebration cake." /><div className="steps-grid">
          {[
            { icon: <CakeSlice />, title: 'Choose Your Cake', text: 'Browse the collection or dream up a custom design.' },
            { icon: <MessageCircle />, title: 'Share Your Details', text: 'Tell us your preferred date, occasion, and cake wishes.' },
            { icon: <Check />, title: 'Confirm Your Order', text: 'Connect with the shop to agree on details and final pricing.' },
            { icon: <Sparkles />, title: 'Celebrate & Enjoy', text: 'Make a beautiful memory, one sweet slice at a time.' },
          ].map((step, index) => <div className="step reveal" key={step.title}><span className="step-number">0{index + 1}</span><div className="step-icon">{step.icon}</div><h3>{step.title}</h3><p>{step.text}</p></div>)}
        </div><p className="steps-note">An inquiry is only a request. Your order is confirmed once the shop responds and agrees to the details.</p></div></section>

        <section className="gallery-section section-pad" id="reviews"><div className="container gallery-heading"><SectionIntro eyebrow="LITTLE MOMENTS, BIG FEELINGS" title="The Sweetest Inspiration" description="A little peek at the kind of moments we love to celebrate." /><p>Good cake has a way of bringing people together. Picture your own celebration, beautifully made.</p></div><div className="gallery-track">{images.gallery.map((image, index) => <div className="gallery-photo" key={image}><Photo src={image} alt={['Berry-decorated celebration cake inspiration', 'Cake with purple floral details', 'Rich chocolate layer cake', 'Playful pink celebration cake'][index]} loading="lazy" /></div>)}</div><div className="container gallery-caption"><span>Illustrative cake photography · not customer photos or reviews</span><span className="gallery-star">✳</span><span>Real customer reviews will appear here when available.</span></div></section>

        <section className="order-section section-pad" id="order"><div className="container order-grid"><div className="order-intro reveal"><span className="eyebrow"><span className="eyebrow-line" />LET'S CELEBRATE</span><h2>Let's Make<br />Something <em>Sweet</em><br />Together.</h2><p>Tell us what you're imagining. We'll put your details together so you can send an inquiry to the shop.</p><div className="order-promise"><Heart size={22} /><span>Every wonderful cake starts<br />with a little conversation.</span></div><div className="order-doodle" aria-hidden="true">♡</div></div>
          <form className="inquiry-form" ref={formRef} onSubmit={prepareInquiry} noValidate>
            <div className="form-head"><span>YOUR CAKE INQUIRY</span><span>01 — 03</span></div><h3>Tell us about your sweet plans</h3><p className="form-subtitle">Fields marked <span className="required">*</span> are required.</p>
            <div className="form-grid">
              <Field label="Full name" required error={errors.name} id="name"><input id="name" autoComplete="name" value={inquiry.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your full name" /></Field>
              <Field label="Mobile number" required error={errors.mobile} id="mobile"><input id="mobile" type="tel" autoComplete="tel" inputMode="tel" value={inquiry.mobile} onChange={(e) => update('mobile', e.target.value)} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? 'mobile-error' : undefined} placeholder="09XX XXX XXXX" /></Field>
              <Field label="Email address" error={errors.email} id="email"><input id="email" type="email" autoComplete="email" value={inquiry.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" /></Field>
              <Field label="Cake selection" required error={errors.cake} id="cake"><select id="cake" value={inquiry.cake} onChange={(e) => update('cake', e.target.value)} aria-invalid={!!errors.cake} aria-describedby={errors.cake ? 'cake-error' : undefined}><option value="">Choose a cake</option>{products.map((product) => <option key={product.name} value={product.name}>{product.name}</option>)}<option value="Custom Cake">Custom Cake</option></select></Field>
              <Field label="Cake size / servings" id="size"><input id="size" value={inquiry.size} onChange={(e) => update('size', e.target.value)} placeholder="e.g. 6 inches / 8 servings" /></Field>
              <Field label="Occasion" id="occasion"><input id="occasion" value={inquiry.occasion} onChange={(e) => update('occasion', e.target.value)} placeholder="e.g. Birthday, anniversary" /></Field>
              <Field label="Preferred date" required error={errors.date} id="date"><input id="date" type="date" min={today} value={inquiry.date} onChange={(e) => update('date', e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined} /></Field>
              <Field label="How would you like to receive it?" id="fulfillment"><select id="fulfillment" value={inquiry.fulfillment} onChange={(e) => update('fulfillment', e.target.value as Inquiry['fulfillment'])}><option value="Pickup">Pickup</option><option value="Delivery">Delivery</option></select></Field>
              {inquiry.fulfillment === 'Delivery' && <Field label="Delivery area / address" required error={errors.address} id="address" wide><input id="address" autoComplete="street-address" value={inquiry.address} onChange={(e) => update('address', e.target.value)} aria-invalid={!!errors.address} aria-describedby={errors.address ? 'address-error' : undefined} placeholder="Your city / area and delivery address" /></Field>}
              <Field label="Custom design notes" id="notes" wide><textarea id="notes" rows={4} value={inquiry.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Tell us your colors, theme, message, flavors, or anything else..." /></Field>
            </div>
            <label className="consent"><input type="checkbox" checked={inquiry.consent} onChange={(e) => update('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>I understand my inquiry details will be shared through the messaging service I choose. <strong>*</strong></span></label>{errors.consent && <span className="field-error" id="consent-error">{errors.consent}</span>}
            <button className="button button-primary submit-button" type="submit">Prepare My Inquiry <ArrowRight size={18} /></button>
            <p className="form-fineprint">This prepares your message only. Nothing is submitted or confirmed automatically.</p>
            {prepared && <div className="handoff" id="handoff" role="status" aria-live="polite"><div className="handoff-top"><Check size={19} /><div><strong>Your inquiry is ready to send.</strong><p>Choose an available option below. You must send the message and wait for the shop's reply to confirm anything.</p></div></div><div className="handoff-actions"><button type="button" className="handoff-button" disabled={!messengerConfigured} onClick={sendMessenger}><MessageCircle size={17} /> Send via Messenger</button><button type="button" className="handoff-button" disabled={!whatsappConfigured} onClick={sendWhatsapp}><MessageCircle size={17} /> Send via WhatsApp</button><button type="button" className="handoff-button" onClick={copySummary}><Clipboard size={17} /> Copy Inquiry Details</button></div>{(!messengerConfigured || !whatsappConfigured) && <p className="config-note">{!messengerConfigured && 'Messenger is not configured. '}{!whatsappConfigured && 'WhatsApp is not configured. '}You can still copy your details; the shop must add contact links before direct messaging is available.</p>}<p className="handoff-feedback" aria-live="polite">{handoffMessage}</p><details className="summary-details" ref={summaryRef}><summary>View inquiry details <ChevronDown size={16} /></summary><pre>{summary}</pre></details>{messengerConfigured && <a className="manual-link" href={business.messengerUrl} target="_blank" rel="noopener noreferrer">Open Messenger manually <ArrowUpRight size={14} /></a>}</div>}
          </form></div></section>

        <section className="faq-section section-pad" aria-labelledby="faq-title"><div className="container faq-grid"><div className="faq-intro reveal"><span className="eyebrow"><span className="eyebrow-line" />GOOD TO KNOW</span><h2 id="faq-title">A Few Sweet<br /><em>Questions.</em></h2><p>Wondering about the little details? Here's a place to start.</p><a href="#order" className="text-link">Still have a question? Inquire here <ArrowRight size={18} /></a></div><div className="faq-list">{faqs.map((faq, index) => <div className="faq-item" key={faq.question}><h3><button type="button" id={`faq-button-${index}`} aria-expanded={openFaq === index} aria-controls={`faq-panel-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.question}</span><span className={`faq-plus ${openFaq === index ? 'expanded' : ''}`}>{openFaq === index ? '−' : '+'}</span></button></h3><div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={openFaq !== index}><p>{faq.answer}</p></div></div>)}</div></div></section>
      </main>
      <footer className="footer" id="contact"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand light /><p>Sweet Moments, Beautifully Made.</p><span>For the celebrations big and small,<br />and everything lovely in between.</span></div><div className="footer-col"><h3>EXPLORE</h3>{navigation.slice(0, 5).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-col"><h3>SAY HELLO</h3><a href="#order">Start an inquiry <ArrowUpRight size={14} /></a>{business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={15} /> Instagram</a>}{business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}<span className="footer-placeholder">{business.location}</span><span className="footer-placeholder">{business.hours}</span></div><div className="footer-cta"><span>LET'S MAKE IT SPECIAL</span><p>Something sweet<br />on your mind?</p><a href="#order" className="footer-round" aria-label="Start an inquiry"><ArrowUpRight size={27} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Hiraya Cakes &amp; Co. All rights reserved.</span><span>Made with love in the Philippines ♡ · <a href="https://commons.wikimedia.org/wiki/File:Ube_Cake,_Jun_2024.jpg" target="_blank" rel="noopener noreferrer">Ube photo: Ralff Nestor Nacor</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span></div></div></footer>
    </>
  )
}

function Field({ label, id, error, required, wide, children }: { label: string; id: string; error?: string; required?: boolean; wide?: boolean; children: React.ReactNode }) {
  return <div className={`field ${wide ? 'wide' : ''}`}><label htmlFor={id}>{label} {required && <span className="required">*</span>}</label>{children}{error && <span className="field-error" id={`${id}-error`}>{error}</span>}</div>
}

export default App
