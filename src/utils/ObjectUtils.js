// pRoy24 TokenPlex

export function isNonEmptyObject(obj) {
  if (typeof(obj) === "undefined" || obj === null || Object.keys(obj).length === 0) {
    return false;
  } return true;
}

export function isNonEmptyArray(arr) {
  if (typeof arr === "undefined" || arr === null || arr.length === 0) {
    return false;
  } return true;
}

export function isNonEmptyString(str) {
  if (typeof str ==="undefined" || str === null || str.length === 0) {
    return false;
  }
  return true;
}