export function isCollectionExist(collections, name) {
  return collections.some(collection => collection.name === name)
}

export function regexCollection(name) {
  const regex =  /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]*$/g
  return regex.test(name)
}