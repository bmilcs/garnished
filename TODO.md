# TODO

- [ ] Fix express-validator's `escape()`
  - [ ] Prevent ' to &amp from displaying on the client.
- [x] Prepare for production
  - [x] Dummy data on frontend: preview (yes) vs production (no)
  - [x] MongoDB: 'development' vs 'production' databases
  - [x] Add analytics
- [x] Push site to production

## Frontend

- [ ] Accessibility
  - [x] headers:
    - [x] single h1 (NOT LOGO)
    - [x] don't skip levels: h1 > h3
    - [x] add classes for styling
- [ ] Tests
  - [ ] Event tests
  - [ ] User tests
- [ ] View Transitions: research polyfill support
- [ ] Improve navigation
  - [x] Bottom arrow navigation
  - [x] Mobile: better animation / styling
  - [ ] Desktop: improve hover state styling / colors

### History

- [x] Extend Create Event, Event Page, etc. to include a comment/note box
  - [x] Add a note/comment box for generic info
- [x] Refactor error handling to display toast/modal on server errors/generic catches
- [x] Delete user error display when events exist
- [x] Add 404 handling
- [x] Contact Page: Success modal
- [x] Create toast / modal component for display success/errors
- [x] Login vs logout state: change header nav behavior
- [x] Services Page
  - [x] Explain process
  - [ ] Add all services & details
- [x] Setup meta tags for social media: Facebook, Twitter, Instagram
- [x] Gallery
  - [x] Image carousel / gallery
- [x] Home
  - [x] Animate / style
- [x] Create layout
  - [x] Add social media links & icons
  - [x] Footer
  - [x] Header/nav
- [x] Define custom css vars
  - [x] Color Scheme
  - [x] Shadows
  - [x] Border-radius

## Backend

- [ ] Extend Event Model/Controller
  - [ ] Add a note/comment box for generic info
- [ ] Create roles: user vs owner/admin
- [ ] Allow admin to access all events & their details
- [ ] Admin routes:
  - [ ] Get All Events
  - [ ] Get All Users
- [ ] Create email templates
  - [ ] Confirm event & reiterate the quote process
  - [ ] Reset password
- [x] Error handling: Wrap database calls in try/catch blocks
- [x] Prevent brute force pw attacks: limit invalid auth attempts
- [x] Add Update event controller
- [x] Write Tests
  - [x] User Controller Tests
  - [x] Event Controller Tests
  - [x] Contact Controller Tests
- [x] Add Update user controller
- [x] Add Delete user controller
- [x] Add Delete event controller
- [x] Add nodemailer

## First Meeting

- [x] Get hosting details: hosting service, username & password
- [x] Get permission to post source code to public while protecting sensitive data
- [x] Get temporary DNS target: existing site or a splash page with coming soon
  - [x] temporary splash page
- [x] Determine business needs & pitch ideas
  - [x] Rank needs in level of importance
- [x] Set a time frame
- [x] Get Google Docs: full list of services with their costs
- [x] Get assets: images, etc.
