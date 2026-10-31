import { API_URL } from './config.js'

async function request(path, options) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Nie można połączyć się z serwerem')
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const details = body?.details ? `: ${body.details.join(', ')}` : ''
    throw new Error(`${body?.error ?? `Błąd ${response.status}`}${details}`)
  }
  return response.status === 204 ? null : response.json()
}

export const getTasks = () => request('/tasks')

export const createTask = (task) =>
  request('/tasks', { method: 'POST', body: JSON.stringify(task) })

export const updateTask = (id, task) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) })

export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' })
