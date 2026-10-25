const STATUSES = ['todo', 'in_progress', 'done']
const PRIORITIES = ['low', 'medium', 'high']

const rules = {
  title: {
    isValid: (value) => typeof value === 'string' && value.trim() !== '',
    message: 'Pole title musi być niepustym tekstem',
  },
  status: {
    isValid: (value) => STATUSES.includes(value),
    message: `Pole status musi mieć jedną z wartości: ${STATUSES.join(', ')}`,
  },
  priority: {
    isValid: (value) => PRIORITIES.includes(value),
    message: `Pole priority musi mieć jedną z wartości: ${PRIORITIES.join(', ')}`,
  },
  dueDate: {
    isValid: (value) =>
      typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)),
    message: 'Pole dueDate musi być datą w formacie RRRR-MM-DD',
  },
}

export function parseTask(body, { partial = false } = {}) {
  const input = body ?? {}
  const errors = []
  const data = {}

  for (const [field, { isValid, message }] of Object.entries(rules)) {
    const value = input[field]
    if (value === undefined) {
      if (!partial) errors.push(`Pole ${field} jest wymagane`)
      continue
    }
    if (!isValid(value)) {
      errors.push(message)
      continue
    }
    data[field] = field === 'title' ? value.trim() : value
  }

  return { errors, data }
}
