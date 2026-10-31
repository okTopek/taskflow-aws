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

  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (editingId) {
      await updateTask(editingId, form)
    } else {
      await createTask(form)
    }
    resetForm()
    setTasks(await getTasks())
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

  const handleDelete = async (id) => {
    await deleteTask(id)
    setTasks(await getTasks())
  }

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
        <button type="submit">{editingId ? 'Zapisz zmiany' : 'Dodaj zadanie'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>Anuluj</button>
        )}
      </form>

      {tasks.length === 0 ? (
        <p>Brak zadań.</p>
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
                  <button onClick={() => handleEdit(task)}>Edytuj</button>
                  <button onClick={() => handleDelete(task.id)}>Usuń</button>
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
