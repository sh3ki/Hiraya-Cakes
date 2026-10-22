You are a senior frontend engineer, premium brand designer, UI/UX specialist, and conversion-focused website developer.

Build a complete, production-quality, responsive, SINGLE-PAGE landing website for a local Philippine cake business named HIRAYA CAKES & CO.

BRAND
Name: Hiraya Cakes & Co.
Tagline: Sweet Moments, Beautifully Made.
Business: A boutique Filipino cake shop selling handcrafted celebration cakes, minimalist cakes, custom cakes, cupcakes, and dessert boxes.
Audience: Filipino customers ordering for birthdays, anniversaries, weddings, gifts, and special occasions.
Currency: Philippine Peso (₱).
Tone: Warm, elegant, friendly, celebratory, premium yet approachable.
Language: Primarily English with natural Filipino touches where appropriate.

OBJECTIVE
Create a high-end bakery experience that looks like a genuine, established boutique cake business. It must not look like a generic SaaS dashboard or AI-generated component template. The site should encourage customers to browse cakes and submit inquiries or place orders through Messenger or WhatsApp.

TECHNOLOGY
Use the existing project's framework if present. If starting from scratch, use React + Vite + TypeScript + Tailwind CSS + Lucide icons. Keep the implementation clean, maintainable, accessible, and performant. Build ONE page at route /. No backend, database, authentication, admin area, checkout, or extra pages.
Functional outbound messaging, navigation, inquiry forms, and interactions are required.

VISUAL SYSTEM
Use a boutique editorial style:
Background: warm ivory #FFF9F4
Cards: soft cream #FFF1EB
Primary: dusty rose #B87580
Secondary: blush pink #F1D4D3
Accent: muted gold #C5A46D
Headings: cocoa brown #432C2F
Body text: #665658
White: #FFFFFF
Use a refined serif heading font (Playfair Display or Cormorant Garamond) and modern sans-serif body font (DM Sans or Manrope).
Design for both desktop and mobile. Use whitespace, subtle curves, thoughtful borders, soft shadows, polished micro-interactions, and restrained motion.
Use asymmetrical editorial composition, tasteful decorative details, section separators, and large food photography.
Avoid heavy gradients, excessive glassmorphism, excessive animations, generic rectangular card layouts, and filler content.

LOGO & BRANDING
Create an elegant inline SVG logo mark using a distinctive H monogram combined with a subtle cake or icing detail. Pair it with the HIRAYA wordmark and smaller CAKES & CO. text. Provide responsive logo arrangements. Use SVG or CSS rather than emojis. Add a favicon based on the monogram. Keep the logo tasteful and legible at small sizes.

SINGLE-PAGE STRUCTURE
All navigation items must link to anchored sections on the SAME page.

1. ANNOUNCEMENT BAR
Display: 'Baked with love, made for your sweetest moments ♡'
Optional small link: 'Inquire Now'.

2. HEADER / NAVIGATION
Sticky, elegant navigation that changes subtly after scrolling.
Logo on the left.
Navigation: Home, Our Cakes, About, How to Order, Reviews, Contact.
Prominent 'Order a Cake' CTA.
Mobile hamburger menu with a properly working open/close drawer.
Active section highlighting and smooth scrolling.

3. HERO SECTION
Create a premium, immersive first impression.
Eyebrow: 'HANDCRAFTED CAKES FOR EVERY CELEBRATION'
Main heading: 'A Little Slice of Happiness.'
Supporting text: 'Thoughtfully baked, beautifully decorated, and made to make every celebration sweeter.'
Buttons: 'Explore Our Cakes' and 'Order Your Dream Cake'.
Editorial image collage featuring gorgeous real-looking premium cakes with distinctive framing, a small decorative badge, and subtle flourishes.
Use appropriate bakery photography, not generic stock imagery.
Hero should be visually striking at 1440px and carefully reflow at 375px.

4. TRUST / HIGHLIGHT STRIP
Three or four understated value highlights:
Freshly Baked
Made with Love
Custom Designs
Perfect for Gifting
Do not invent quantitative achievements or verified ratings.

5. FEATURED CAKES
Heading: 'Our Sweetest Creations'
Subheading: 'From simple little joys to grand celebrations.'
Create six curated products, each with a distinct appropriate food image:
- Classic Strawberry Dream — ₱1,250
- Ube Velvet Delight — ₱1,350
- Chocolate Truffle Bliss — ₱1,450
- Minimalist Celebration Cake — Starts at ₱950
- Floral Garden Cake — Starts at ₱1,650
- Mango Cream Cloud — ₱1,250
Treat prices as editable SAMPLE PRICES until confirmed by the business. Clearly avoid representing mock details as verified business facts.
Cards should feature image, product name, concise description, indicative price, optional discreet category tag, and 'Inquire About This Cake' action.
Action should prefill the selected cake in the inquiry form or open a configured messaging link with the cake information.
Add lightweight category filters: All, Signature, Custom, Celebration. All filters must actually work.

6. ABOUT / BRAND STORY
Heading: 'Made with Heart, Shared with Love.'
Craft an inviting brand story about celebrating life's milestones through thoughtful baking and beautiful cake designs.
Use premium lifestyle photography of a baker decorating a cake or a warm artisan bakery.
Use editable, honest copy that does not invent a founder, physical storefront, awards, certifications, or history.

7. CUSTOM CAKE PROMOTION
Large feature panel with an editorial custom celebration cake image.
Headline: 'Your Dream Cake, Made Just for You.'
Explain that customers can request themes, colors, messages, and personalized designs.
CTA: 'Request a Custom Cake'.
The CTA should jump to the order section and preselect 'Custom Cake'.

8. HOW TO ORDER
Show four clear, simple steps:
1. Choose Your Cake
2. Share Your Details
3. Confirm Your Order
4. Celebrate & Enjoy
Explain that inquiries are requests, and orders are confirmed only after the shop responds and agrees to the details.
Do not claim automatic order confirmation or live slot availability.

9. REVIEWS / SOCIAL PROOF
Create a tasteful testimonials area.
Do NOT fabricate real customer reviews or imply sample reviews are verified.
Use clearly labeled editable sample testimonial placeholders or build the section to be conditionally hidden until real reviews have been supplied.
Create an Instagram-inspired image gallery with visually distinct cake images. Do not imply photos originate from actual customers or a real social feed unless configured.
Social links should be configurable and never point to unrelated placeholder accounts.

10. ORDER / INQUIRY SECTION
Heading: 'Let's Make Something Sweet Together.'
Create a functional frontend-only inquiry form with:
- Full name (required)
- Mobile number (required; validate Philippine phone number formats)
- Email address (optional; validate if provided)
- Cake selection (required)
- Cake size / servings (optional)
- Occasion (optional)
- Preferred date (required)
- Delivery or pickup preference
- Delivery area / address (when delivery chosen)
- Custom design notes
- Consent checkbox acknowledging the request will be shared through a messaging service
Use clear validation messages and accessible inputs.
Preferred dates must not be in the past.

IMPORTANT: NO BACKEND YET.
Do not fake a successful submission or store orders in a nonexistent database.
Implement a real usable frontend-only order handoff:
On successful validation, create a clean, URL-encoded summary of the inquiry.
Offer an explicit 'Send via Messenger' option using the configured Facebook page link. Explain that generic Messenger deep links may not prefill messages reliably; therefore copy the formatted inquiry to the clipboard before opening the shop's Messenger link, with visible instructions to paste and send it.
Offer 'Send via WhatsApp' using wa.me with a prefilled encoded message when a valid configured WhatsApp number exists.
Offer 'Copy Inquiry Details' as a fallback.
Provide a clear message saying an inquiry is not yet confirmed and the customer must send it and receive a response from the shop.
Do not invent the business's Messenger handle, WhatsApp number, email, or phone. Store all contact settings in one editable config file. If a contact service is not configured, disable its action with a clear configuration message instead of navigating to fake URLs.
Handle popup blockers, clipboard failure, and unavailable contact methods gracefully.
Never claim the request was submitted unless an actual delivery mechanism confirms that.
Prefill form selections correctly when users click a cake or custom cake CTA.

11. FAQ
Accordion questions:
How early should I place an order?
Can I customize the design?
Do you offer delivery or pickup?
How do I confirm my order?
Can I request a special flavor?
Use honest general answers. Delivery zones, lead times, and payment policies must be marked 'Please confirm with the shop' until configured.
Make keyboard-accessible accordions.

12. CONTACT / FOOTER
Brand identity, tagline, quick anchor links, configured social links, editable operating hours, and editable location.
Do not invent a specific address. Location should be an editable Philippine city/area placeholder, visibly labeled until provided.
Include a small 'Made with love in the Philippines' message.
Include copyright with the current year.

IMAGE REQUIREMENTS
Use distinct, high-quality, appetizing cake photography. Each product must visually match its name (ube is purple, mango is yellow, etc.).
No repeated image for different cakes.
Use appropriately licensed local assets where available, or suitable remote images that are stable and allowed to be used. Do not hotlink random search-result images.
Provide descriptive alt text.
Provide fallbacks for missing images and optimized image loading.
Use lazy loading below the fold. Prioritize hero loading.
Organize assets sensibly and use an image manifest.

INTERACTION & POLISH
Functional mobile menu.
Smooth anchored scrolling with offset for sticky navigation.
Functional cake filters.
Functional order form validation.
Working prefilled inquiry flow.
Functional FAQ accordion.
Subtle scroll reveal respecting prefers-reduced-motion.
Visible hover, focus, loading, error, and disabled states.
Responsive image sizing without layout shifts.
No broken buttons, dead links, or misleading calls to action.

ACCESSIBILITY
Semantic HTML, logical heading structure, labels, keyboard navigation, aria-expanded for menu/accordion, clear contrast, visible focus indicators, and accessible error feedback.

SEO & PERFORMANCE
Set meaningful title and meta description for Hiraya Cakes & Co.
Add Open Graph metadata and a local-business/bakery structured data object using only confirmed details.
Fast first render, no unnecessary UI libraries, responsive images, and minimal dependencies.
No fabricated contact or address information in structured data.

IMPLEMENTATION RULES
First inspect the existing codebase and honor its framework and conventions.
Then implement the complete frontend rather than just providing a concept or skeleton.
Keep all editable business data (products, prices, contact links, FAQs, social URLs, location, business hours, and labels) centralized in configuration/data files.
Ensure the application builds and runs without TypeScript errors.
Do not add a backend, mock API, database, admin panel, authentication, payment gateway, or additional routes.
Do not leave TODO buttons that appear functional.
Clearly document configuration of Messenger, WhatsApp, and business details in README.
Confirm what was implemented and provide the exact command to run locally.

FINAL EXPECTATION
A gorgeous, credible, premium Filipino cake studio landing page with an elegant visual identity, realistic cake imagery, polished mobile experience, and genuinely usable frontend-only inquiry handoff.
