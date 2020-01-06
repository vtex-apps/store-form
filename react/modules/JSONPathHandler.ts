import { JSONSchemaType } from '../components/InputTypes'

const concatFormPath = (path: string, newNode: string): string => {
  return path + '/' + newNode
}

const getSplitPath = (path: string): Array<string> => {
  const split = path.split('/')
  if (split[0] === '#') {
    split.shift()
  }
  if (split[split.length - 1] === '') {
    split.pop()
  }
  return split
}

const getObjectFromPath = (
  obj: JSONSchemaType,
  path: string
): JSONSchemaType | undefined => {
  const splitPath = getSplitPath(path)
  let currentOriginal: JSONSchemaType | undefined = obj

  for (let node = 0; node < splitPath.length; node++) {
    if (
      currentOriginal &&
      currentOriginal.type &&
      currentOriginal.type === 'object'
    ) {
      currentOriginal = currentOriginal.properties[splitPath[node]]
    } else {
      currentOriginal = undefined
    }
  }
  return currentOriginal
}

const buildObjectFromFormData = (
  data: JSONSchemaType,
  originalSchema: JSONSchemaType
): JSONSchemaType => {
  const orderedSchemaKeys = Object.keys(data).sort()
  const objectFromData: JSONSchemaType = {}

  for (const key of orderedSchemaKeys) {
    const splitPath = getSplitPath(key)

    let current = objectFromData
    let currentOriginal = originalSchema

    if (splitPath) {
      for (let node = 0; node < splitPath.length; node++) {
        if (currentOriginal === undefined) {
          break
        }

        if (currentOriginal.type && currentOriginal.type === 'object') {
          currentOriginal = currentOriginal.properties
        } else if (
          !currentOriginal.type &&
          currentOriginal[splitPath[node]] &&
          currentOriginal[splitPath[node]].type === 'object'
        ) {
          currentOriginal = currentOriginal[splitPath[node]]
        }

        if (node === splitPath.length - 1) {
          if (
            currentOriginal[splitPath[node]] &&
            currentOriginal[splitPath[node]].type &&
            currentOriginal[splitPath[node]].type === 'integer'
          ) {
            current[splitPath[node]] = parseInt(data[key])
          } else if (
            currentOriginal[splitPath[node]] &&
            currentOriginal[splitPath[node]].type &&
            currentOriginal[splitPath[node]].type === 'number'
          ) {
            current[splitPath[node]] = parseFloat(data[key])
          } else {
            current[splitPath[node]] = data[key]
          }
        }

        if (current[splitPath[node]] === undefined) {
          current[splitPath[node]] = {}
        }

        current = current[splitPath[node]]
      }
    }
  }

  return objectFromData
}

const isRequiredField = (obj: JSONSchemaType, path: string): boolean => {
  let required = false
  const splitPath = getSplitPath(path)
  const childName = splitPath.pop()
  if (childName) {
    const parentPath = '#/' + splitPath.join('/')
    const parentObject = getObjectFromPath(obj, parentPath)
    if (
      parentObject &&
      parentObject.required &&
      (parentObject.required as Array<string>).indexOf(childName) > -1
    ) {
      required = true
    }
  }
  return required
}

export {
  buildObjectFromFormData,
  concatFormPath,
  getObjectFromPath,
  isRequiredField,
}
