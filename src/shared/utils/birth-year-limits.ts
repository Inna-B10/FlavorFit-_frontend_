const minYear = new Date().getFullYear() - 100
const maxYear = new Date().getFullYear() - 3

export const birthYearLimits = {
  min: minYear,
  max: maxYear
}

export const birthYearRange = `${minYear}-${maxYear}`
