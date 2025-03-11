export function findInputError(errors, name) {
  const nameParts = name.split('.');

  const getNestedError = (errorObj, parts) => {
    if (!parts.length) return errorObj;

    const [first, ...rest] = parts;
    if (errorObj[first]) {
      return getNestedError(errorObj[first], rest);
    }

    return null;
  };

  const error = getNestedError(errors, nameParts);

  return error ? { error } : {};
}