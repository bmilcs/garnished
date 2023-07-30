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

Fly.io, a Platform as a Service, was used to host the server portion of this app and it did not play nicely with `ts-node` and `tsconfig-paths`. The simplicity and minimal overhead of running TypeScript directly on the backend was the goal. I personally love using path aliases with TypeScript, which allow me to import modules via a clean "@/" base path, while avoiding "../../" in my import statements.

After some research, it became apparent that the slight quality of life improvements that path aliases gave me was not worth the time investment of setting up webpack and plugins to compile code on builds. Adding more dependencies to my project and complexity was not worth it so I opted to simplify the development and build processes. Instead, I...

- Refactored import paths to use the default style: "../../"
- Used `tsc` to compile my code to vanilla JS to simplify deployment
- Setup my npm dev script to:
  - Run `nodemon` to watch my source directory for `.ts` file changes
  - Then build those changes to `/dist`
  - Run vanilla `node`

These changes reduced the difference between development and production modes. It also reduced the chance for things to go wrong, be it security vulnerabilities or bugs.
