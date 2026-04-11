import Director from '../service/director.js'

export const getAll = async (req, res) => {
    try {
        const directors = await Director.getAll()
        res.json({ status: 'success', data: directors })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const getById = async (req, res) => {
    const { id } = req.params
    try {
        const director = await Director.findById(id)
        if (!director) {
            return res.status(404).json({ status: 'error', message: 'Director no encontrado' })
        }
        res.json({ status: 'success', data: director })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const deleteDirector = async (req, res) => {
    const { id } = req.params
    try {
        const director = await Director.findById(id)
        if (!director) {
            return res.status(404).json({ status: 'error', message: 'Director no encontrado' })
        }

        await Director.delete(id)
        res.json({ status: 'success', message: 'Director eliminado' })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const update = async (req, res) => {
    const { id } = req.params
    const { full_name } = req.body

    if (!full_name || full_name.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'El nombre del director es requerido' })
    }

    try {
        const director = await Director.findById(id)
        if (!director) {
            return res.status(404).json({ status: 'error', message: 'Director no encontrado' })
        }

        const updated = await Director.update(id, { full_name: full_name.trim() })
        res.json({ status: 'success', message: 'Director actualizado', data: updated })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const create = async (req, res) => {
    const { full_name } = req.body

    if (!full_name || full_name.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'El nombre del director es requerido' })
    }

    try {
        const director = await Director.create({ full_name: full_name.trim() })
        res.status(201).json({ status: 'success', message: 'Director creado', data: director })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}
