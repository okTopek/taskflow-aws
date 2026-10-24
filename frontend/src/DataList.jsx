import './DataList.css'

const tasks = [
  { id: 1, title: 'Założenie konta AWS', status: 'done', priority: 'high', dueDate: '2026-10-23' },
  { id: 2, title: 'Projekt VPC i podsieci', status: 'done', priority: 'high', dueDate: '2026-10-24' },
  { id: 3, title: 'Szkielet frontendu (React + Vite)', status: 'in_progress', priority: 'medium', dueDate: '2026-10-24' },
  { id: 4, title: 'Dockerfile z Nginx dla frontendu', status: 'todo', priority: 'medium', dueDate: '2026-10-24' },
  { id: 5, title: 'Backend REST API (Express)', status: 'todo', priority: 'high', dueDate: '2026-11-07' },
]

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

function DataList() {
  return (
    <section className="data-list">
      <h1>Lista zadań</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default DataList
