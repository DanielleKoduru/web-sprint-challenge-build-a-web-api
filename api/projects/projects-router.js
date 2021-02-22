// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const { validateProjectId, validateProjectBody } = require("../middleware/middleware")


const router = express.Router()
// #1 `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
router.get("/api/projects", async (req, res, next) => {
    try {
        const projects = await projects.get()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

// #2 `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
router.get("/api/projects/:id", validateProjectId(), async (req, res, next) => {
    try {
        const projects = await projects.find()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

// #3 `[POST] /api/projects` returns the newly created project as the body of the _response_.
router.post("/api/projects", validateProjectBody(), async (req, res, next) => {
    try {
        const projects = await projects.add(req.body)
        res.status(201).json(projects)
    } catch (err) {
        next(err)
    }
})

// #4 `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
router.put("/api/projects/:id", validateProjectBody(), async (req, res, next) => {
    try {
        const projects = await projects.update(req.body)
        res.status(201).json(projects)
    } catch (err) {
        next(err)
    }
})

// #5 `[DELETE] /api/projects/:id` returns no _response_ body.
router.delete("/api/projects/:id", async (req, res, next) => {
    try {
        await projects.remove(req.params.id) //should it be project? or projects? instead of projectsModel
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

// #6 `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.
router.get("/api/projects:id/actions", async (req, res, next) => {
    try {
        const projects = await projects.find()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

module.exports = router