/* eslint-disable no-undef */
require('mutationobserver-shim')

window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }
