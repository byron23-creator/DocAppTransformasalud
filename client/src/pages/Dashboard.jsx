import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#fffcfd',
    },
    content: {
        maxWidth: '900px',
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
    empty: {
        backgroundColor: '#fff',
        border: '1px solid #e8d5de',
        borderRadius: '12px',
        padding: '40px 24px',
        textAlign: 'center',
        color: '#aaa',
        fontSize: '14px',
    },
    card: {
        backgroundColor: '#fff',
        border: '1px solid #e8d5de',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    cardTitle: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#1a1a1a',
    },
    cardPatient: {
        fontSize: '13px',
        color: '#844c62',
        fontWeight: '500',
    },
    cardTime: {
        fontSize: '13px',
        color: '#888',
    },
    cardNotes: {
        fontSize: '13px',
        color: '#555',
        marginTop: '4px',
    },
    error: {
        fontSize: '13px',
        color: '#c0392b',
        textAlign: 'center',
        marginTop: '16px',
    },
        btnNew: {
        display: 'inline-block',
        padding: '10px 24px',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#844c62',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '24px',
    },

}

function formatTime(isoString) {
    const date = new Date(isoString)
    return date.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' })
}

export default function Dashboard() {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading]           = useState(true)
    const [error, setError]               = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch('http://localhost:4000/api/appointments/today', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error('No autorizado')
                return res.json()
            })
            .then(data => setAppointments(data))
            .catch(() => setError('No se pudieron cargar las citas'))
            .finally(() => setLoading(false))
    }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div style={styles.page}>
            <Navbar onLogout={handleLogout} />
            <div style={styles.content}>
                <h1 style={styles.heading}>Citas de hoy</h1>
                <p style={styles.subheading}>Resumen del día</p>

                {loading && <p style={styles.subheading}>Cargando...</p>}
                <button style={styles.btnNew} onClick={() => navigate('/nueva-cita')}>
                + Nueva cita
                </button>
                
                {error && <p style={styles.error}>{error}</p>}

                {!loading && !error && appointments.length === 0 && (
                    <div style={styles.empty}>No hay citas registradas para hoy</div>
                )}

                {!loading && !error && appointments.map(apt => (
                    <div key={apt.id} style={styles.card}>
                        <span style={styles.cardTitle}>{apt.title}</span>
                        <span style={styles.cardPatient}>{apt.patient_name}</span>
                        <span style={styles.cardTime}>{formatTime(apt.appointment_date)}</span>
                        {apt.notes && <span style={styles.cardNotes}>{apt.notes}</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}
