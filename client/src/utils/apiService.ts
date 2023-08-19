export const getApiEndpoint = () => import.meta.env.VITE_API_ENDPOINT;

// by default, "npm run dev" loads ".env.development" and production loads ".env.production"
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type TProps = {
  path: string;
  method?: HttpMethod;
  body?: Record<string, unknown>;
  credentials?: boolean;
};

// type TApiResponse = Record<string, unknown>;

export const apiService = async <TApiResponse>({
  method = "GET",
  path,
  body,
  credentials = true,
}: TProps) => {
  const url = `${BASE_URL}/${path}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (credentials) {
    options.credentials = "include";
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);
    const data = (await res.json()) as TApiResponse;
    return { data, status: res.status };
  } catch (error) {
    throw new Error(String(error));
  }
};
