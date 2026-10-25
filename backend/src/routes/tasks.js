import { Router } from 'express'
import * as taskRepository from '../repositories/taskRepository.js'
import { parseTask } from '../validation/taskValidation.js'

const router = Router()

router.param('id', (req, res, next, value) => {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Nieprawidłowe id zadania' })
  }
  req.taskId = id
  next()
})

router.get('/', (req, res) => {
  res.json(taskRepository.findAll())
})

router.get('/:id', (req, res) => {
  const task = taskRepository.findById(req.taskId)
  if (!task) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' })
  }
  res.json(task)
})

router.post('/', (req, res) => {
  const { errors, data } = parseTask(req.body)
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Błąd walidacji', details: errors })
  }
  res.status(201).json(taskRepository.create(data))
})

const updateHandler = (partial) => (req, res) => {
  const { errors, data } = parseTask(req.body, { partial })
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Błąd walidacji', details: errors })
  }
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Brak pól do aktualizacji' })
  }
  const task = taskRepository.update(req.taskId, data)
  if (!task) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' })
  }
  res.json(task)
}

router.put('/:id', updateHandler(false))
router.patch('/:id', updateHandler(true))

router.delete('/:id', (req, res) => {
  const removed = taskRepository.remove(req.taskId)
  if (!removed) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' })
  }
  res.status(204).end()
})

export default router
