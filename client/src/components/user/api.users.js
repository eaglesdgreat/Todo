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

export {
  signin,
}
