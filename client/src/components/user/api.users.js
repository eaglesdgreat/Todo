// Fetching Backend data to send and recieve from database

function signin(data) {
  return fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

function createUser(user) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  signin,
  createUser,
}
