const isFieldError = (errors: any, field: string, index?: number): boolean => {
  if (typeof index === 'number' && typeof errors === 'object' && errors[index]) {
    return Object.keys(errors[index]).includes(field)
  } else if (typeof index === 'undefined') {
    return Object.keys(errors).includes(field)
  } else {
    return false
  }
}

export default isFieldError
