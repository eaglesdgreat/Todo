
// Lists Endpoints fetching

function createList(params, credentials, list) {
  return fetch(`/api/lists/${params.userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
    body: JSON.stringify(list),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

function allListsByUser(params, credentials) {
  return fetch(`/api/lists/${params.userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${credentials.t}`,
    },
  })
    .then((res) => { return res.json() })
    .catch((err) => console.log(err))
}

function getlist(params) {
  return fetch(`/api/list/${params.listId}`, {
    method: 'GET',
  })
    .then((res) => { return res.json() })
    .catch((err) => console.log(err))
}

function updateList(params, credentials, list) {
  return fetch(`/api/list/${params.listId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
    body: JSON.stringify(list),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

function deleteList(params, credentials) {
  return fetch(`/api/list/${params.listId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

// Tasks endpoint fetching
function createTask(params, credentials, userId, task) {
  return fetch(`/api/list/new/task/${params.listId}`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({
        userId,
        task,
      })
  })
  .then(res => { return res.json() })
  .catch(err => { console.log(err) })
}

function getTask(params, credentials, taskId) {
  return fetch(`/api/list/task/${params.listId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
    body: JSON.stringify({
      listId: params.listId,
      taskId
    })
  })
    .then((res) => { return res.json() })
    .catch((err) => console.log(err))
}

function updateTask(params, credentials, taskId, task) {
  return fetch(`/api/list/update/task/${params.listId}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
    },
    body: JSON.stringify({
      listId: params.listId,
      taskId,
      task,
    })
  })
}

function deleteTask(params, credentials, taskId) {
  return fetch(`/api/list/delete/task/${params.listId}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`,
    },
    body: JSON.stringify({
      listId: params.listId,
      taskId,
    })
  })
}

export {
  createTask,
  createList,
  deleteList,
  deleteTask,
  updateList,
  updateTask,
  allListsByUser,
  getlist,
  getTask,
}