const express = require('express')
const pool = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// GET /api/appointments/today 

router.get('/today', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
            a.id,
            a.title,
            a.appointment_date,
            a.notes,
            p.name AS patient_name
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            WHERE Date(a.appointment_date) = CURRENT_DATE
            ORDER BY a.appointment_date ASC
        `)

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Eror del servidor' })
    }
})

module.exports = router