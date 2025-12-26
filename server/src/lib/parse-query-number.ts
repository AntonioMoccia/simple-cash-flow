function parseQueryNumber(value: any, defaultValue = 1): number {
  if (!value) return defaultValue;
  if (Array.isArray(value)) value = value[0];
  const n = parseInt(value, 10);
  return isNaN(n) ? defaultValue : n;
}

export default parseQueryNumber;