const isValidJSON = (str: any): boolean => {
  try {
    JSON.parse(str)

    return true
  } catch (_) {
    return false
  }
}

export default isValidJSON
