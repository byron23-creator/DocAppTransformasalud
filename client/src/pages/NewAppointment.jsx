import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#fffcfd',
    },
    content: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 24px',
    },
    heading: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#844c62',
        marginBottom: '8px',
    },
    subheading: {
        fontSize: '14px',
        color: '#888',
        marginBottom: '32px',
    },
    group: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '13px',
        color: '#844c62',
        marginBottom: '6px',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '50px',
        border: '1.5px solid #d9bfc8',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: '#fffcfd',
        color: '#1a1a1a',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '50px',
        border: '1.5px solid #d9bfc8',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: '#fffcfd',
        color: '#1a1a1a',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1.5px solid #d9bfc8',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: '#fffcfd',
        color: '#1a1a1a',
        resize: 'vertical',
        minHeight: '80px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '13px',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#844c62',
        color: '#fff',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px',
    },
    buttonSecondary: {
        width: '100%',
        padding: '13px',
        borderRadius: '50px',
        border: '1.5px solid #844c62',
        backgroundColor: 'transparent',
        color: '#844c62',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px',
    },
    error: {
        fontSize: '13px',
        color: '#c0392b',
        textAlign: 'center',
        marginTop: '16px',
    },
    success: {
        fontSize: '13px',
        color: '#27ae60',
        textAlign: 'center',
        marginTop: '16px',
    },
}

export default function NewAppointment() {
    const [patientName, setPatientName]             = useState('')
    const [title, setTitle]                   = useState('')
    const [appointmentDate, setAppointmentDate] = useState('')
    const [notes, setNotes]                   = useState('')
    const [loading, setLoading]               = useState(false)
    const [error, setError]                   = useState('')
    const [success, setSuccess]               = useState('')
    const navigate = useNavigate()



    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const token = localStorage.getItem('token')

        try {
            const res = await fetch('http://localhost:4000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    patient_name: patientName,
                    title,
                    appointment_date: appointmentDate,
                    notes,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Error al crear la cita')
            }

            setSuccess('Cita creada exitosamente')
            setTimeout(() => navigate('/dashboard'), 1500)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div style={styles.page}>
            <Navbar onLogout={handleLogout} />
            <div style={styles.content}>
                <h1 style={styles.heading}>Nueva cita</h1>
                <p style={styles.subheading}>Completa los datos para agendar</p>

                <form onSubmit={handleSubmit}>
                    
                    <div style={styles.group}>
                        <label style={styles.label}>Paciente</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={patientName}
                            onChange={e => setPatientName(e.target.value)}
                            placeholder="Nombre completo del paciente"
                            required
                        />
                    </div>
                    
                                        <div style={styles.group}>
                        <label style={styles.label}>Título</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Consulta general, control, etc."
                            required
                        />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Fecha y hora</label>
                        <input
                            style={styles.input}
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={e => setAppointmentDate(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Notas (opcional)</label>
                        <textarea
                            style={styles.textarea}
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Observaciones previas, motivo de consulta..."
                        />
                    </div>

                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Agendar cita'}
                    </button>

                    <button
                        style={styles.buttonSecondary}
                        type="button"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancelar
                    </button>
                </form>

                {error   && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
            </div>
        </div>
    )
}
