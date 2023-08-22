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

My original plan was to use `ts-node` and `tsconfig-paths` for the server. The goal was to keep things simple by running TypeScript directly on the backend and using clean "@/" base paths for module imports.

However, Fly.io, the Platform as a Service I used to host the server, had issues with these packages.

Here's what I did to work around the problem:

- Removed `ts-node` and `tsconfig-paths`
- Swapped to relative import paths: `../../path/`
- Used `tsc` to compile my code into vanilla JS, making deployment simpler
- Updated my npm `dev` script to:
  - Use `nodemon` to monitor the source directory for changes in .ts files
  - Compile those changes into the `/dist` directory
  - Run the compiled code using node

These changes made the development and production modes more consistent. They also reduced complexity, the number of dependencies, and the likelihood of encountering issues like security vulnerabilities or bugs.

**Update**: Interestingly, I discovered the `tsc-alias` package, which transpiles path aliases during build time. With it, I could maintain clean import statements while enjoying the benefits mentioned above. The final npm scripts for the server code are:

```json
"scripts": {
  "dev": "concurrently \"tsc -w\" \"tsc-alias -p tsconfig.json --watch\" \"nodemon dist/index.js\"",
  "build": "tsc && tsc-alias -p tsconfig.json",
  "start": "node dist/index.js"
},
```

### Test Deployment & CORS

During development, I needed a way to share my progress with my clients. GitHub pages only allows one page per repo and this presented a problem because I did not want to overwrite the temporary "Coming Soon" splash page.

To get around this, I created a secondary GitHub repo for the test page and added it as a secondary remote origin to the primary repo.

My personal domain was already setup to host all of my GitHub repos, making them accessible via a URL path: `https://bmilcs.com/<some_repo>`. I deployed this test site, as I normally would, to `/garnished-test`. Unfortunately, my JSON Web Token based authentication relies on httpOnly cookies, and as a result, they could not be set from a different domain. This resulted in a CORS error.

My final solution was to deploy the test page to a subdomain on the parent `garnishedllp.com` domain. I then converted my string based CORS origin to to an array, in order to cover both the public domain and the `test` subdomain.
