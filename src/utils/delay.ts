/** 
 * "sleep" for 2019
 * 
 * @param ms # of ms to wait
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));