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
    card: {
    backgroundColor: '#fff',
    border: '1px solid #e8d5de',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    color: '#aaa',
    fontSize: '14px',
    },
}

export default function Dashboard() {
    const navigate = useNavigate()

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
        <div style={styles.card}>
            No hay citas registradas para hoy
        </div>
        </div>
    </div>
    )
}
