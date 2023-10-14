# TODO

- [ ] Write up README summary
- [ ] Improve test coverage on client
  - [ ] Cross user event access
  - [ ] Event Error validation
- [ ] Improve server error handling on client

## Frontend

- [x] Tests
  - [x] Event tests
  - [x] User tests
  - [x] Protected routes
- [x] Accessibility
  - [x] headers:
    - [x] single h1 (NOT LOGO)
    - [x] don't skip levels: h1 > h3
    - [x] add classes for styling
- [ ] View Transitions: research polyfill support
- [ ] Improve navigation
  - [x] Bottom arrow navigation
  - [x] Mobile: better animation / styling
  - [ ] Desktop: improve hover state styling / colors

## Backend

- [ ] Create roles: user vs owner/admin
- [ ] Allow admin to access all events & their details
- [ ] Admin routes:
  - [ ] Get All Events
  - [ ] Get All Users
- [ ] Create email templates
  - [ ] Confirm event & reiterate the quote process
  - [ ] Reset password
- [x] Extend Event Model/Controller
  - [x] Add a note/comment box for generic info
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

## Misc

- [x] Prepare for production
  - [x] Dummy data on frontend: preview (yes) vs production (no)
  - [x] MongoDB: 'development' vs 'production' databases
  - [x] Add analytics
- [x] Push site to production

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
