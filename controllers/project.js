const db = require('../models/index')

class projectController {

  async getById(req, res) {
    try {
      const project = await db.Project.findByPk(req.params.id)
      if (!project) {
        throw new Error('Проекта с таким ID не существует')
      }
      res.status(200).json(project)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: `Error: ${e.message}` })
    }
  }


  async getAll(req, res) {
    try {
      const projects = await db.Project.findAll()
      res.status(200).json(projects)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: `Error: ${e.message}` })
    }
  }


  async create(req, res) {
    try {
      const { name, description } = req.body
      const project = await db.Project.create({
        name: name,
        description: description
      })
      res.status(200).json(project)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: `Error: ${e.message}` })
    }
  }


  async update(req, res) {
    try {
      const project = await db.Project.findByPk(req.params.id)
      if (project) {
        await project.update(req.body)
        res.status(200).json(project)
      } else {
        throw new Error('Проекта с таким ID не существует')
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: `Error: ${e.message}` })
    }
  }


  async delete(req, res) {
    try {
      const project = await db.Project.findByPk(req.params.id)

      if (!project) {
        throw new Error('Проекта с таким ID не существует')
      }

      await project.destroy()
      res.status(200).json({ message: "Deleted" })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: `Error: ${e.message}` })
    }
  }

}

module.exports = new projectController()