export function enumToSelectOptions<T extends Record<string, string>>(enumObj: T) {
  return Object.values(enumObj).map(value => ({
    label: value
      .toLowerCase()
      .replaceAll('_', ' ')
      .replace(/^\w/, char => char.toUpperCase()),
    value
  }))
}

export function enumValueToLabel<T extends Record<string, string>>(enumObj: T, value?: T[keyof T]) {
  if (!value) return undefined

  return value
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/^\w/, char => char.toUpperCase())
}
