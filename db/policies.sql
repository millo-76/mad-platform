-- =========================================
-- ENABLE ROW LEVEL SECURITY
-- =========================================

alter table profiles enable row level security;
alter table galleries enable row level security;
alter table images enable row level security;
alter table image_favorites enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table download_grants enable row level security;

-- =========================================
-- PROFILES
-- =========================================

create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id);

-- =========================================
-- GALLERIES
-- =========================================

-- Public portfolio galleries are viewable by anyone
create policy "Public galleries are viewable"
on galleries
for select
using (
  visibility = 'public'
);

-- Admins can do everything
create policy "Admins manage galleries"
on galleries
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);

-- =========================================
-- IMAGES
-- =========================================

-- Public images inside public galleries
create policy "Public gallery images are viewable"
on images
for select
using (
  exists (
    select 1
    from galleries
    where galleries.id = images.gallery_id
    and galleries.visibility = 'public'
  )
);

-- Admin image management
create policy "Admins manage images"
on images
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);

-- =========================================
-- FAVORITES
-- =========================================

-- Anyone can create favorites
create policy "Anyone can create favorites"
on image_favorites
for insert
with check (true);

-- Admins can view favorites
create policy "Admins view favorites"
on image_favorites
for select
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);

-- =========================================
-- PRODUCTS
-- =========================================

-- Products visible publicly
create policy "Products are viewable"
on products
for select
using (active = true);

-- Admin product management
create policy "Admins manage products"
on products
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);

-- =========================================
-- ORDERS
-- =========================================

-- Admins can view/manage all orders
create policy "Admins manage orders"
on orders
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);

-- =========================================
-- ORDER ITEMS
-- =========================================

create policy "Admins manage order items"
on order_items
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);

-- =========================================
-- DOWNLOAD GRANTS
-- =========================================

create policy "Admins manage download grants"
on download_grants
for all
using (
  exists (
    select 1
    from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'photographer')
  )
);