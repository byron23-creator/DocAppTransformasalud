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
            p.full_name AS patient_name
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

// POST /api/appointments
router.post('/', authMiddleware, async (req, res) => {
    const { patient_name, title, appointment_date, notes } = req.body

    if (!patient_name || !title || !appointment_date) {
        return res.status(400).json({ message: 'patient_name, title y appointment_date son requeridos' })
    }

    try {
        // Buscar paciente por nombre, crearlo si no existe
        let patient = await pool.query(
            `SELECT id FROM patients WHERE full_name ILIKE $1 LIMIT 1`,
            [patient_name.trim()]
        )

        if (patient.rows.length === 0) {
            patient = await pool.query(
                `INSERT INTO patients (full_name) VALUES ($1) RETURNING id`,
                [patient_name.trim()]
            )
        }

        const patient_id = patient.rows[0].id

        const result = await pool.query(
            `INSERT INTO appointments (patient_id, title, appointment_date, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [patient_id, title, appointment_date, notes || null]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})


// GET /api/patients
router.get('/patients', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, full_name FROM patients ORDER BY full_name ASC`
        )
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})


module.exports = router