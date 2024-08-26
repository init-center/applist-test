export function request<T = any>(url: string): Promise<T> {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json() as Promise<T>;
  });
}