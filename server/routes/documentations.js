const express        = require('express')
const pool           = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// POST /api/documentations
router.post('/', authMiddleware, async (req, res) => {
    const { patient_id, reason, current_illness, background, current_treatment } = req.body

    if (!patient_id) {
        return res.status(400).json({ message: 'patient_id es requerido' })
    }

    try {
        const result = await pool.query(
            `INSERT INTO documentations (patient_id, reason, current_illness, background, current_treatment)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [patient_id, reason || null, current_illness || null, background || null, current_treatment || null]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})

// GET /api/documentations/:patient_id — historial completo de un paciente
router.get('/:patient_id', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT d.*, p.full_name AS patient_name
             FROM documentations d
             JOIN patients p ON d.patient_id = p.id
             WHERE d.patient_id = $1
             ORDER BY d.consultation_date DESC`,
            [req.params.patient_id]
        )

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})

module.exports = router
