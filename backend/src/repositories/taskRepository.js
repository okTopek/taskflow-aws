let tasks = [
  { id: 1, title: 'Założenie konta AWS', status: 'done', priority: 'high', dueDate: '2026-10-23' },
  { id: 2, title: 'Projekt VPC i podsieci', status: 'done', priority: 'high', dueDate: '2026-10-24' },
  { id: 3, title: 'Backend REST API (Express)', status: 'in_progress', priority: 'high', dueDate: '2026-10-25' },
]
let nextId = tasks.length + 1

export function findAll() {
  return tasks
}

export function findById(id) {
  return tasks.find((task) => task.id === id)
}

export function create(data) {
  const task = { id: nextId++, ...data }
  tasks.push(task)
  return task
}

export function update(id, data) {
  const task = findById(id)
  if (!task) return undefined
  Object.assign(task, data)
  return task
}

export function remove(id) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index === -1) return false
  tasks.splice(index, 1)
  return true
}
