import { METERTEST } from "./chains";

export const GMX_STATS_API_URL = "http://18.140.233.200:3113/api";

const BACKEND_URLS = {
  default: GMX_STATS_API_URL,

  [METERTEST]: GMX_STATS_API_URL,
};

export function getServerBaseUrl(chainId: number) {
  if (!chainId) {
    throw new Error("chainId is not provided");
  }

  if (document.location.hostname.includes("deploy-preview")) {
    const fromLocalStorage = localStorage.getItem("SERVER_BASE_URL");
    if (fromLocalStorage) {
      return fromLocalStorage;
    }
  }

  return BACKEND_URLS[chainId] || BACKEND_URLS.default;
}

export function getServerUrl(chainId: number, path: string) {
  return `${getServerBaseUrl(chainId)}${path}`;
}
