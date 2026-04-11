import { pool } from '../config/db.js'

export default class Director {

    static getAll = async () => {
        const [rows] = await pool.query('SELECT * FROM directors ORDER BY full_name')
        return rows
    }

    static findById = async (id) => {
        const [rows] = await pool.query('SELECT * FROM directors WHERE id = :id', { id })
        return rows[0]
    }

    static update = async (id, { full_name }) => {
        await pool.query('UPDATE directors SET full_name = :full_name WHERE id = :id', { full_name, id })
        const [rows] = await pool.query('SELECT * FROM directors WHERE id = :id', { id })
        return rows[0]
    }

    static create = async ({ full_name }) => {
        const [result] = await pool.query(
            'INSERT INTO directors (full_name) VALUES (:full_name)',
            { full_name }
        )
        const [rows] = await pool.query('SELECT * FROM directors WHERE id = :id', { id: result.insertId })
        return rows[0]
    }

}
