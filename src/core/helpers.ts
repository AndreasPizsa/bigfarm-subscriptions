export const last = <T>(arr: T[]) => arr[arr.length - 1];
export const unique = <T>(el: T, index: number, arr: T[]) => arr.indexOf(el) === index;
