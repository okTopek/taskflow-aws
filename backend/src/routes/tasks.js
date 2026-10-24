import { Router } from 'express'
import * as taskRepository from '../repositories/taskRepository.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(taskRepository.findAll())
})

router.get('/:id', (req, res) => {
  const task = taskRepository.findById(Number(req.params.id))
  if (!task) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' })
  }
  res.json(task)
})

router.post('/', (req, res) => {
  const task = taskRepository.create(req.body)
  res.status(201).json(task)
})

const update = (req, res) => {
  const task = taskRepository.update(Number(req.params.id), req.body)
  if (!task) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' })
  }
  res.json(task)
}

router.put('/:id', update)
router.patch('/:id', update)

router.delete('/:id', (req, res) => {
  const removed = taskRepository.remove(Number(req.params.id))
  if (!removed) {
    return res.status(404).json({ error: 'Nie znaleziono zadania' })
  }
  res.status(204).end()
})

export default router
