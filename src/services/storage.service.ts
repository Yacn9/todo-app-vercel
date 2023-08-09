const local = {
    get: (key: string): string | null => localStorage.getItem(key),
    set: (key: string, value: string) => localStorage.setItem(key, value),
    remove: (key: string) => localStorage.removeItem(key)
};

export { local as default };