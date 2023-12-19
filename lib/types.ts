import { supportedIndustries } from "./constants";

export type Period = 7 | 30 | 120;
export type ResultAmount = 3 | 20;
export type Industry = (typeof supportedIndustries)[number];
