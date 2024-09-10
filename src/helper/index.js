import parlayBetLookup from "./parlayBetHelper";
import singleBetLookup from "./singleBetHelper";

export const betLookup = {...singleBetLookup, ...parlayBetLookup}