import { useEffect, useState } from 'react'
import { createTask, deleteTask, getTasks, updateTask } from './api.js'
import './DataList.css'

const STATUS_LABELS = {
  todo: 'Do zrobienia',
  in_progress: 'W toku',
  done: 'Zrobione',
}

const PRIORITY_LABELS = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
}

const EMPTY_FORM = { title: '', status: 'todo', priority: 'medium', dueDate: '' }

function DataList() {
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const runAction = async (action, successMessage) => {
    setError(null)
    setSuccess(null)
    setSubmitting(true)
    try {
      await action()
      setTasks(await getTasks())
      setSuccess(successMessage)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const ok = await runAction(
      () => (editingId ? updateTask(editingId, form) : createTask(form)),
      editingId ? 'Zadanie zostało zaktualizowane' : 'Zadanie zostało dodane',
    )
    if (ok) resetForm()
  }

  const handleEdit = (task) => {
    setEditingId(task.id)
    setForm({
      title: task.title,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    })
  }

  const handleDelete = (id) => runAction(() => deleteTask(id), 'Zadanie zostało usunięte')

  return (
    <section className="data-list">
      <h1>Lista zadań</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Tytuł" value={form.title} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Zapisywanie…' : editingId ? 'Zapisz zmiany' : 'Dodaj zadanie'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} disabled={submitting}>Anuluj</button>
        )}
      </form>

      {error && <p className="message message-error" role="alert">{error}</p>}
      {success && <p className="message message-success" role="status">{success}</p>}

      {loading ? (
        <p className="message">Ładowanie zadań…</p>
      ) : tasks.length === 0 ? (
        !error && <p>Brak zadań.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Status</th>
              <th>Priorytet</th>
              <th>Termin</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <span className={`badge badge-${task.status}`}>
                    {STATUS_LABELS[task.status]}
                  </span>
                </td>
                <td>{PRIORITY_LABELS[task.priority]}</td>
                <td>{task.dueDate}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(task)} disabled={submitting}>Edytuj</button>
                  <button onClick={() => handleDelete(task.id)} disabled={submitting}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default DataList
