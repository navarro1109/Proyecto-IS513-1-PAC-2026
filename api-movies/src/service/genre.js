import { pool } from '../config/db.js'

export default class Genre {

    static getAll = async () => {
        const [rows] = await pool.query('SELECT * FROM genres ORDER BY name')
        return rows
    }

    static findById = async (id) => {
        const [rows] = await pool.query('SELECT * FROM genres WHERE id = :id', { id })
        return rows[0]
    }

    static create = async ({ name }) => {
        const [result] = await pool.query(
            'INSERT INTO genres (name) VALUES (:name)',
            { name }
        )
        const [rows] = await pool.query('SELECT * FROM genres WHERE id = :id', { id: result.insertId })
        return rows[0]
    }

    static update = async (id, { name }) => {
        await pool.query('UPDATE genres SET name = :name WHERE id = :id', { name, id })
        const [rows] = await pool.query('SELECT * FROM genres WHERE id = :id', { id })
        return rows[0]
    }

    static delete = async (id) => {
        await pool.query('DELETE FROM genres WHERE id = :id', { id })
    }

}
