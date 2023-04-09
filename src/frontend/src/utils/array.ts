export const distinct = (arr: any[]): any[] => [...new Set(arr.map(item => item))];

export const isUnique = (arr: any[]): boolean => distinct(arr).length === arr.length;
