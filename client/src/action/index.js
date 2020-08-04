let _id = 1
function uniqueId() {
  return _id++
}

// An action creator defined
function createTask(title, description) {
  return {
    type: 'CREATE_TASK',
    payload: {
      id: uniqueId(),
      title,
      description,
      status: 'Unstarted',
    },
  }
}

function updateTask(id, params = {}) {
  return {
    type: 'UPDATE_TASK',
    payload: {
      id,
      params
    },
  }
}

export {
  uniqueId,
  createTask,
  updateTask,
}
