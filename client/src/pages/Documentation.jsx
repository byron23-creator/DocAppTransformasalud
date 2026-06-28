import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const styles = {
    page: { minHeight: '100vh', backgroundColor: '#fffcfd' },
    content: { maxWidth: '900px', margin: '0 auto', padding: '40px 24px' },
    heading: { fontSize: '22px', fontWeight: '700', color: '#844c62', marginBottom: '8px' },
    subheading: { fontSize: '14px', color: '#888', marginBottom: '24px' },
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
        marginBottom: '24px',
    },
    card: {
        backgroundColor: '#fff',
        border: '1px solid #e8d5de',
        borderRadius: '12px',
        padding: '18px 24px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardName: { fontSize: '15px', fontWeight: '600', color: '#1a1a1a' },
    cardDate: { fontSize: '13px', color: '#888', marginTop: '4px' },
    btn: {
        padding: '8px 20px',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#844c62',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
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
}

function formatDate(isoString) {
    if (!isoString) return 'Sin citas'
    return new Date(isoString).toLocaleDateString('es-GT', {
        day: '2-digit', month: 'long', year: 'numeric'
    })
}

export default function Documentation() {
    const [patients, setPatients] = useState([])
    const [search, setSearch]     = useState('')
    const [loading, setLoading]   = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:4000/api/patients', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => setPatients(data))
            .finally(() => setLoading(false))
    }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    const filtered = patients.filter(p =>
        p.full_name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={styles.page}>
            <Navbar onLogout={handleLogout} />
            <div style={styles.content}>
                <h1 style={styles.heading}>Documentación médica</h1>
                <p style={styles.subheading}>Busca un paciente para ver o agregar notas clínicas</p>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Buscar paciente por nombre..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {loading && <p style={styles.subheading}>Cargando...</p>}

                {!loading && filtered.length === 0 && (
                    <div style={styles.empty}>No se encontraron pacientes</div>
                )}

                {filtered.map(p => (
                    <div key={p.id} style={styles.card}>
                        <div>
                            <div style={styles.cardName}>{p.full_name}</div>
                            <div style={styles.cardDate}>Última cita: {formatDate(p.last_appointment)}</div>
                        </div>
                        <button
                            style={styles.btn}
                            onClick={() => navigate(`/documentacion/${p.id}`)}
                        >
                            Ver historial
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
