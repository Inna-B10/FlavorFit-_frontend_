export function enumToOptions<T extends Record<string, string>>(enumObj: T) {
  return Object.values(enumObj)
}

export function enumToSelectOptions<T extends Record<string, string>>(enumObj: T) {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: value.replace('_', ' ') || value,
    value: key
  }))
}
