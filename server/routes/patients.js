const express        = require('express')
const pool           = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// GET /api/patients — lista todos los pacientes con fecha de última cita
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.id,
                p.full_name,
                MAX(a.appointment_date) AS last_appointment
            FROM patients p
            LEFT JOIN appointments a ON a.patient_id = p.id
            GROUP BY p.id, p.full_name
            ORDER BY p.full_name ASC
        `)

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})

// GET /api/patients/search?q=nombre — busca pacientes por nombre
router.get('/search', authMiddleware, async (req, res) => {
    const { q } = req.query

    if (!q || q.trim() === '') {
        return res.json([])
    }

    try {
        const result = await pool.query(`
            SELECT
                p.id,
                p.full_name,
                MAX(a.appointment_date) AS last_appointment
            FROM patients p
            LEFT JOIN appointments a ON a.patient_id = p.id
            WHERE p.full_name ILIKE $1
            GROUP BY p.id, p.full_name
            ORDER BY p.full_name ASC
        `, [`%${q.trim()}%`])

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})

module.exports = router
