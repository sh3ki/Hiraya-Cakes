# Hiraya Cakes & Co.

A responsive, single-page boutique cake landing site built with React, Vite, TypeScript, Tailwind CSS, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to check types and produce a production bundle in `dist/`.

## Configure the business

Edit [`src/data.ts`](src/data.ts) before publishing:

- Set `business.messengerUrl` to the shop's real Facebook page or Messenger URL (HTTPS `facebook.com`, `m.me`, or `messenger.com`). Messenger cannot reliably prefill a generic message. The site copies the inquiry first, then opens Messenger and instructs the customer to paste and send.
- Set `business.whatsappNumber` to the real international-format Philippine mobile number beginning `639` (12 digits total, without `+` or spaces). WhatsApp opens with the inquiry prefilled.
- Set `business.facebookUrl` and `business.instagramUrl` to real shop profiles to show those footer links.
- Replace the visibly unconfirmed location and hours, and confirm the listed products, descriptions, and sample prices.
- Edit the FAQs and navigation labels in the same file if business policies change. Delivery availability, lead times, payment and confirmation should only be stated after verification.

Unconfigured messaging actions remain disabled with an explanation. Visitors can prepare and copy an inquiry, but **no order is submitted automatically**. They must send it and receive a shop response before it is confirmed. There is no backend or order storage.

Product images and other image paths live in [`src/images.ts`](src/images.ts). Images are illustrative and are not representations of actual Hiraya inventory or customer photos. Replace with approved business photography when available. The site uses local images, lazy-loads below-the-fold photos, and shows a branded fallback for failed images.

### Photography credits

Most local photos are from [Unsplash](https://unsplash.com/license), used under the Unsplash License. The purple floral ube-cake inspiration photo (`ube-2.jpg`) is ["Ube Cake, Jun 2024" by Ralff Nestor Nacor](https://commons.wikimedia.org/wiki/File:Ube_Cake,_Jun_2024.jpg) from Wikimedia Commons, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). A credit also appears in the footer. Any modifications or reuse of that image must follow its license terms.
