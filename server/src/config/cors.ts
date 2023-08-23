import { CLIENT_PORT, NODE_ENV, PRODUCTION_URL } from "@/config/env";

const corsOrigin =
  NODE_ENV === "production"
    ? [`https://${PRODUCTION_URL}`, `https://test.${PRODUCTION_URL}`]
    : `http://localhost:${CLIENT_PORT}`;

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
  credentials: true, // allow cookies to be sent from the client to the server
};

export default corsOptions;
