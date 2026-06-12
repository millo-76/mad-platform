-- =========================================
-- STARTER PRODUCTS
-- =========================================

insert into products (
  name,
  description,
  product_type,
  price_cents,
  currency,
  active
)
values
  (
    'Single Digital Download',
    'One high-resolution digital image download.',
    'digital',
    1500,
    'usd',
    true
  ),
  (
    'Full Gallery Digital Download',
    'High-resolution digital download of the full gallery.',
    'digital',
    12500,
    'usd',
    true
  ),
  (
    '4x6 Print',
    'Standard 4x6 photo print.',
    'print',
    500,
    'usd',
    true
  ),
  (
    '5x7 Print',
    'Standard 5x7 photo print.',
    'print',
    800,
    'usd',
    true
  ),
  (
    '8x10 Print',
    'Standard 8x10 photo print.',
    'print',
    1200,
    'usd',
    true
  ),
  (
    '11x14 Print',
    'Large 11x14 photo print.',
    'print',
    2500,
    'usd',
    true
  ),
  (
    'Print Package',
    'Bundle of selected prints from a client gallery.',
    'package',
    5000,
    'usd',
    true
  );