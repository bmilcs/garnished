# Whiteboard Planning

## Meeting #2 Notes

- Avoid clipart: use images instead
  - Replace beer clipart w/ wine photo
- Change colors
  - Taupe beige gray
  - Not white, white
  - Light shade
  - Primary: sage, smoky green
- Font: tangerine, google fonts
  - Replace banner text with cursive / script
- Lighten up banners
- Less animations, selective
- Services offered
- Remove running/refrigeration
- Enlarge navigation text
- Wedding focused
- Carousel for photos
- Evite drink estimator: https://www.google.com/search?channel=fs&client=ubuntu-sn&q=evite+drink+estimate

## Quote Process

Initial Release

1. Get Started Icon
2. Signup or Login
3. Once logged in, redirect to user dashboard
4. User dashboard: display user details, list of events & add new event button
5. New Event Form
   1. Explain quote process to user
   2. Add animations / better styling
6. On submitting Event Form, e-mail details to owners
   1. Redirect user to Event view component
   2. Display a toast/modal - success
7. Owners contact potential clients and send quote, etc.

Users should be also be able to:

- update their event details
- update their profile details

## Business Details

Services

- Bar rental fee: $150 per bar
- Bartenders: $100/hr
- Bar backs: $50/hr

Key Selling Points

- Liquor Permit
- General & Liquor Liability Insurance
- All tip certified
- Serve Safe: restaurant world, safe way to serve food, garnish
  - garnished lemons limes
  - how long they're good/fresh, etc
- Flexibility
- Cater to your individual needs
- Custom Menus

Target Clients

- New England: Eastern MA/New York
- Venues: barns, museums, corporate etc.
- Deal directly w/ venue
- Send copies of insurance - requirement
- Seasonal menus

Information Needed from Client:

- client name
- contact number
- event date
- number of hours
- location
- type of event
- number of guests
- has bar or requires garnished supplies bar
- supply own alcohol or require it (optional)
- bar location on premises
- running water, refrigeration

What they're looking:

- ice
- beer
- wine
- signature cocktails
- liquor preferences (brands)
- want to provide disposable drink ware
- all packages come with customize bar menu sign
- users should sign up, form, quote

### Payment Details:

- Venmo, square, cash, check
- 20% down payment before event
- 80% due the day of event
- non refundable
- travel costs: $75 fee over 45 miles

### Design

Attire colors:

- black gold white
- Logo: Update > more formal look

## First Pitch: Preliminary Big Picture Ideas

1. Users should be able to:
   1. view all offerings by the company
   2. add packages to a cart, add customizations and request a quote
      1. set target date of the event
      2. set number of people
   3. sign up after sending a quote an account
      1. explain benefits of signing up
      2. be able to view & modify their orders with a cut off date?
      3. be able to add notes / correspond with owners
   4. submit payments?
      1. paypal
2. Owners should be able to:
   1. Manage inventory & offerings:
      1. Set base prices for individual products (ie: vodka cost of a particular special drink)
      2. Multiply those products by number of people in the party
      3. Add markup %'s for services rendered
      4. Add/Update/Delete existing packages & offerings: images, prices, details
   2. Correspond with customers & keep track of discussions

## Misc. Notes

Technology:

- Database
- User Authentication
- Separate Frontend / Backend via API
- Email notifications

## Order of Operations

1. Setup DNS records
2. Determine tech stack
3. Build out data models
