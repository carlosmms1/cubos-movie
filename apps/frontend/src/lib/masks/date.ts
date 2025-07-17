export function maskDate(value: string): string {
  let sanitizedValue = String(value).replace(/\D/g, "");
  if (!sanitizedValue) return "";
  if (sanitizedValue.length > 8) sanitizedValue = sanitizedValue.slice(0, 8);
  if (sanitizedValue.length > 4)
    sanitizedValue = sanitizedValue.replace(
      /(\d{2})(\d{2})(\d{0,4})/,
      "$1/$2/$3"
    );
  else if (sanitizedValue.length > 2)
    sanitizedValue = sanitizedValue.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  return sanitizedValue;
}

export function unmaskDate(value: string): string {
  return value.replace(/\D/g, "");
}
