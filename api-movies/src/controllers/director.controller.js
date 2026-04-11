import Director from '../service/director.js'

export const getAll = async (req, res) => {
    try {
        const directors = await Director.getAll()
        res.json({ status: 'success', data: directors })
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
