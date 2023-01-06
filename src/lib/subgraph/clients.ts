import { createClient } from "./utils";
import { SUBGRAPH_URLS } from "config/subgraph";
import { METERTEST } from "config/chains";

export const chainlinkClient = createClient(SUBGRAPH_URLS.common.chainLink);

export const metertestGraphClient = createClient(SUBGRAPH_URLS[METERTEST].stats);
export const metertestReferralsGraphClient = createClient(SUBGRAPH_URLS[METERTEST].referrals);


export function getGmxGraphClient(chainId: number) {
  if (chainId === METERTEST) {
    return metertestGraphClient;
  }

  throw new Error(`Unsupported chain ${chainId}`);
}
