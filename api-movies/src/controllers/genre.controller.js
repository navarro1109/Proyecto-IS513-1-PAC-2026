import Genre from '../service/genre.js'

export const getAll = async (req, res) => {
    try {
        const genres = await Genre.getAll()
        res.json({ status: 'success', data: genres })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const getById = async (req, res) => {
    const { id } = req.params
    try {
        const genre = await Genre.findById(id)
        if (!genre) {
            return res.status(404).json({ status: 'error', message: 'Genero no encontrado' })
        }
        res.json({ status: 'success', data: genre })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const create = async (req, res) => {
    const { name } = req.body

    if (!name || name.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'El nombre del genero es requerido' })
    }

    try {
        const genre = await Genre.create({ name: name.trim() })
        res.status(201).json({ status: 'success', message: 'Genero creado', data: genre })
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 'error', message: 'El genero ya existe' })
        }
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const update = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name || name.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'El nombre del genero es requerido' })
    }

    try {
        const genre = await Genre.findById(id)
        if (!genre) {
            return res.status(404).json({ status: 'error', message: 'Genero no encontrado' })
        }

        const updated = await Genre.update(id, { name: name.trim() })
        res.json({ status: 'success', message: 'Genero actualizado', data: updated })
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 'error', message: 'El genero ya existe' })
        }
        res.status(500).json({ status: 'error', message: e.message })
    }
}

export const deleteGenre = async (req, res) => {
    const { id } = req.params

    try {
        const genre = await Genre.findById(id)
        if (!genre) {
            return res.status(404).json({ status: 'error', message: 'Genero no encontrado' })
        }

        await Genre.delete(id)
        res.json({ status: 'success', message: 'Genero eliminado' })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
}
