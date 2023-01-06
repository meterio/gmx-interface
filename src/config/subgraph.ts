import {  METERTEST } from "./chains";

export const SUBGRAPH_URLS = {
  [METERTEST]: {
    stats: "http://graphtest.meter.io:8000/subgraphs/name/gmx/gmx-stats",
    referrals: "http://graphtest.meter.io:8000/subgraphs/name/gmx/gmx-referrals"
  },

  common: {
    chainLink: "https://api.thegraph.com/subgraphs/name/deividask/chainlink",
  },
};
