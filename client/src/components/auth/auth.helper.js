//  Save credentials on successful sign-in using sessionStorage.setItem
function authenticate(jwt, next) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt))
  }
  next()
}

// Retrive credentials if signed-in already, using sessionStorage.getItem
function isAuthenticate() {
  if (typeof window === 'undefined') {
    return false
  }
  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'))
  }
  return false
}

// Delet credentials on sign-out using sessionStorage.removeItem
function signout(next) {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt')
  }
  next()
}

export {
  authenticate,
  isAuthenticate,
  signout,
}