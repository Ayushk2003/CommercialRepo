# VibeVault Streetwear

Interactive ecommerce storefront built with Next.js, React, Supabase, and Razorpay.

## Features

- React product search, filters, cart drawer, and chat-style shopping guide
- Supabase-ready product and order APIs
- Razorpay order creation and payment verification routes
- Responsive streetwear storefront using existing image assets

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your keys.

3. Optional Supabase tables:

   ```sql
   create table products (
     id text primary key,
     name text not null,
     type text not null,
     fit text,
     price integer not null,
     color text,
     bg text,
     shape text,
     tag text,
     active boolean default true,
     created_at timestamptz default now()
   );

   create table orders (
     id uuid primary key default gen_random_uuid(),
     razorpay_order_id text,
     razorpay_payment_id text,
     razorpay_signature text,
     receipt text,
     amount integer not null,
     currency text default 'INR',
     status text default 'created',
     customer jsonb,
     items jsonb,
     created_at timestamptz default now()
   );
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

Deploy on a Next.js runtime such as Vercel or a Node server. GitHub Pages will not run the checkout API routes.
