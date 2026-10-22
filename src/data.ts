import { images } from './images'

export const business = {
  name: 'Hiraya Cakes & Co.',
  tagline: 'Sweet Moments, Beautifully Made.',
  messengerUrl: '',
  whatsappNumber: '',
  instagramUrl: '',
  facebookUrl: '',
  location: 'Philippine city / area to be confirmed',
  hours: 'Hours to be confirmed',
  priceNote: 'Sample prices for illustration; please confirm current pricing with the shop.',
}

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Our Cakes', href: '#cakes' },
  { label: 'About', href: '#about' },
  { label: 'How to Order', href: '#how-to-order' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export type Category = 'Signature' | 'Custom' | 'Celebration'

export const products: {
  name: string
  description: string
  price: string
  category: Category
  image: string
  alt: string
}[] = [
  { name: 'Classic Strawberry Dream', description: 'Soft, berry-kissed layers for a sweet celebration.', price: '₱1,250', category: 'Signature', image: images.strawberry, alt: 'White celebration cake decorated with strawberries and berries' },
  { name: 'Ube Velvet Delight', description: 'A purple-inspired celebration with a Filipino favorite in mind.', price: '₱1,350', category: 'Signature', image: images.ube, alt: 'Purple cake decorated with purple, blue and white icing flowers; illustrative design inspiration' },
  { name: 'Chocolate Truffle Bliss', description: 'Rich chocolate, beautiful swirls, pure indulgence.', price: '₱1,450', category: 'Signature', image: images.chocolate, alt: 'Chocolate celebration cake with piped frosting and chocolate drip' },
  { name: 'Minimalist Celebration Cake', description: 'A little joy, made lovely for your special day.', price: 'Starts at ₱950', category: 'Celebration', image: images.minimalist, alt: 'Small pink celebration cake on a white cake stand' },
  { name: 'Floral Garden Cake', description: 'A graceful design with a romantic, floral feel.', price: 'Starts at ₱1,650', category: 'Custom', image: images.floral, alt: 'White cake on a pastel pedestal topped with purple flowers and berries; illustrative design inspiration' },
  { name: 'Mango Cream Cloud', description: 'Bright, sunny flavors for moments worth sharing.', price: '₱1,250', category: 'Celebration', image: images.mango, alt: 'Golden glazed cake with fruit garnish; illustrative mango cake inspiration' },
]

export const faqs = [
  { question: 'How early should I place an order?', answer: 'The earlier, the better, especially for custom designs and busy celebration dates. Please confirm the current lead time and availability with the shop before making plans.' },
  { question: 'Can I customize the design?', answer: 'Absolutely! Share your theme, colors, message, and inspiration when you inquire. The shop can discuss what is possible for your requested date and budget.' },
  { question: 'Do you offer delivery or pickup?', answer: 'You can request either in the inquiry form. Please confirm delivery areas, fees, and pickup arrangements with the shop.' },
  { question: 'How do I confirm my order?', answer: 'Send your inquiry through an available messaging option. Your order is confirmed only after the shop responds and agrees on the details, price, and payment arrangements.' },
  { question: 'Can I request a special flavor?', answer: 'You can mention your preferred flavor in your notes. Please confirm flavor availability and any additional charges with the shop.' },
]
