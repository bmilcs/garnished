import { API_BASE_URL } from "@/utils/config";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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
  const url = `${API_BASE_URL}/${path}`;

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
