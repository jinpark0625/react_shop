export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function removeCollectionsPrefix(key: string, str: string) {
  return str.replace(key, '');
}

export function deduplicateByOptions<T extends Record<string, any>>(
  objectArray: T[],
  key: keyof T,
): string[] {
  return Array.from(new Set(objectArray.flatMap((object) => object[key])));
}
