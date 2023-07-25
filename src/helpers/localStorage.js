export function readLocalStorage(key) {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function writeLocalStorage(key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}