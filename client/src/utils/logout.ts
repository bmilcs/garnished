import { getApiEndpoint } from "@/utils/apiConfig";

export const logout = async () => {
  const apiBasePath = getApiEndpoint();
  const url = `${apiBasePath}/api/user/logout`;

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } catch (e) {
    console.error("errors:", e);
  }
};
