export function getStorage<T>(key: string, defaultValue?: T): T | null {
  const storedValue = localStorage.getItem(key);

  // handle the case of the value not being found or the string "undefined"
  if (storedValue === null || storedValue === "undefined") {
    return defaultValue ?? null;
  }

  try {
    // try to convert the text to an Object or Array
    return JSON.parse(storedValue) as T;
  } catch {
    // if it fails (e.g. the text is stored as "light" and not "light") it returns it as text
    return (storedValue as unknown as T) ?? defaultValue ?? null;
  }
}

export function setStorage<T>(key: string, value: T): void {
  try {
    // convert the value to a JSON string for storage
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error while setting storage:", error);
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error while removing from storage:", error);
  }
}

export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error while clearing storage:", error);
  }
}
