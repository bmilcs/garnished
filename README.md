# Garnished LLP

This repo contains a full stack web app for Garnished LLP, a mobile bar business.

- [Live URL](https://garnishedllp.com)

## Technology

Server:

- Express
- MongoDB
- TypeScript

Client:

- Vite
- React
- TypeScript
- SASS modules
- ESLint

## Problems Overcome

### Deployment Struggles

Fly.io, a Platform as a Service, was used to host the server portion of this app and it did not play nicely with `ts-node` and `tsconfig-paths`. The simplicity and minimal overhead of running TypeScript directly on the backend was the goal. I personally love using path aliases with TypeScript, which allow me to import modules via a clean "@/" base path, while avoiding "../../" in my import statements.

After some research, it became apparent that the slight quality of life improvements that path aliases gave me was not worth the time investment of setting up webpack and plugins to compile code on builds. Adding more dependencies to my project and complexity was not worth it so I opted to simplify the development and build processes. Instead, I...

- Refactored import paths to use the default style: "../../"
- Used `tsc` to compile my code to vanilla JS to simplify deployment
- Setup my npm dev script to:
  - Run `nodemon` to watch my source directory for `.ts` file changes
  - Then build those changes to `/dist`
  - Run vanilla `node`

These changes reduced the difference between development and production modes. It also reduced the chance for things to go wrong, be it security vulnerabilities or bugs.

### Test Deployment & CORS

During development, I needed a way to share my progress with my clients. GitHub pages only allows one page per repo and this presented a problem because I did not want to overwrite the temporary "Coming Soon" splash page.

To get around this, I created a secondary GitHub repo for the test page and added it as a secondary remote origin to the primary repo.

My personal domain was already setup to host all of my GitHub repos, making them accessible via a URL path: `https://bmilcs.com/<some_repo>`. I deployed this test site, as I normally would, to `/garnished-test`. Unfortunately, my JSON Web Token based authentication relies on httpOnly cookies, and as a result, they could not be set from a different domain. This resulted in a CORS error.

My final solution was to deploy the test page to a subdomain on the parent `garnishedllp.com` domain. I then converted my string based CORS origin to to an array, in order to cover both the public domain and the `test` subdomain.
