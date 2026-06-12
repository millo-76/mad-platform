-- Enable UUID support
create extension if not exists "pgcrypto";

-- =========================
-- PROFILES / ROLES
-- =========================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'client', -- admin, photographer, client
  created_at timestamptz not null default now()
);

-- =========================
-- GALLERIES
-- =========================

create table galleries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  gallery_type text not null default 'client', -- portfolio, client
  visibility text not null default 'private', -- public, private, unlisted
  password_hash text,
  cover_image_id uuid,
  client_name text,
  client_email text,
  expires_at timestamptz,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================
-- IMAGES
-- =========================

create table images (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references galleries(id) on delete cascade,

  title text,
  caption text,
  alt_text text,

  -- R2 object keys
  original_key text not null,
  preview_key text,
  thumbnail_key text,
  watermark_key text,

  width int,
  height int,
  file_size bigint,
  mime_type text,

  is_featured boolean not null default false,
  is_downloadable boolean not null default false,
  sort_order int not null default 0,

  created_at timestamptz not null default now()
);

alter table galleries
add constraint galleries_cover_image_fk
foreign key (cover_image_id) references images(id)
on delete set null;

-- =========================
-- FAVORITES / PROOFING
-- =========================

create table image_favorites (
  id uuid primary key default gen_random_uuid(),
  image_id uuid not null references images(id) on delete cascade,
  gallery_id uuid not null references galleries(id) on delete cascade,

  client_email text,
  session_id text,

  created_at timestamptz not null default now(),

  unique (image_id, client_email),
  unique (image_id, session_id)
);

-- =========================
-- PRODUCTS
-- =========================

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  product_type text not null, -- digital, print, package
  price_cents int not null,
  currency text not null default 'usd',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Example:
-- 8x10 Print
-- Full Gallery Digital Download
-- Single Image Digital Download

-- =========================
-- ORDERS
-- =========================

create table orders (
  id uuid primary key default gen_random_uuid(),

  gallery_id uuid references galleries(id) on delete set null,
  client_email text not null,
  client_name text,

  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,

  status text not null default 'pending', -- pending, paid, fulfilled, canceled, refunded
  subtotal_cents int not null default 0,
  total_cents int not null default 0,
  currency text not null default 'usd',

  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null references orders(id) on delete cascade,
  image_id uuid references images(id) on delete set null,
  product_id uuid references products(id) on delete set null,

  quantity int not null default 1,
  unit_price_cents int not null,
  total_price_cents int not null,

  created_at timestamptz not null default now()
);

-- =========================
-- DOWNLOAD ACCESS
-- =========================

create table download_grants (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null references orders(id) on delete cascade,
  image_id uuid references images(id) on delete cascade,

  client_email text not null,
  download_key text not null,
  expires_at timestamptz,
  max_downloads int default 5,
  download_count int not null default 0,

  created_at timestamptz not null default now()
);

-- =========================
-- INDEXES
-- =========================

create index galleries_slug_idx on galleries(slug);
create index galleries_type_visibility_idx on galleries(gallery_type, visibility);
create index images_gallery_id_idx on images(gallery_id);
create index images_featured_idx on images(is_featured);
create index favorites_gallery_id_idx on image_favorites(gallery_id);
create index orders_gallery_id_idx on orders(gallery_id);
create index orders_client_email_idx on orders(client_email);