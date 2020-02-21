import React from 'react'

export const useCssHandles = handles => {
  return handles.reduce((acc, key) => {
    acc[key] = key
    return acc
  }, {})
}
