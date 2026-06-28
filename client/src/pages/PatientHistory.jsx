import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const styles = {
    page: { minHeight: '100vh', backgroundColor: '#fffcfd' },
    content: { maxWidth: '900px', margin: '0 auto', padding: '40px 24px' },
    back: {
        fontSize: '13px', color: '#844c62', cursor: 'pointer',
        marginBottom: '16px', display: 'inline-block', fontWeight: '500',
    },
    heading: { fontSize: '22px', fontWeight: '700', color: '#844c62', marginBottom: '4px' },
    subheading: { fontSize: '14px', color: '#888', marginBottom: '32px' },
    btnNew: {
        padding: '10px 24px', borderRadius: '50px', border: 'none',
        backgroundColor: '#844c62', color: '#fff', fontSize: '14px',
        fontWeight: '600', cursor: 'pointer', marginBottom: '28px',
    },
    card: {
        backgroundColor: '#fff', border: '1px solid #e8d5de',
        borderRadius: '12px', padding: '20px 24px', marginBottom: '14px',
    },
    cardDate: { fontSize: '13px', color: '#844c62', fontWeight: '600', marginBottom: '12px' },
    field: { marginBottom: '10px' },
    fieldLabel: { fontSize: '12px', color: '#aaa', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' },
    fieldValue: { fontSize: '14px', color: '#1a1a1a', marginTop: '2px' },
    empty: {
        backgroundColor: '#fff', border: '1px solid #e8d5de',
        borderRadius: '12px', padding: '40px 24px',
        textAlign: 'center', color: '#aaa', fontSize: '14px',
    },
    form: {
        backgroundColor: '#fff', border: '1px solid #e8d5de',
        borderRadius: '12px', padding: '24px', marginBottom: '24px',
    },
    formTitle: { fontSize: '16px', fontWeight: '600', color: '#844c62', marginBottom: '20px' },
    group: { marginBottom: '16px' },
    label: { display: 'block', fontSize: '13px', color: '#844c62', marginBottom: '6px', fontWeight: '500' },
    textarea: {
        width: '100%', padding: '12px 16px', borderRadius: '12px',
        border: '1.5px solid #d9bfc8', fontSize: '14px', outline: 'none',
        backgroundColor: '#fffcfd', color: '#1a1a1a',
        resize: 'vertical', minHeight: '70px', boxSizing: 'border-box',
    },
    btnSubmit: {
        padding: '11px 28px', borderRadius: '50px', border: 'none',
        backgroundColor: '#844c62', color: '#fff', fontSize: '14px',
        fontWeight: '600', cursor: 'pointer', marginRight: '10px',
    },
    btnCancel: {
        padding: '11px 28px', borderRadius: '50px',
        border: '1.5px solid #844c62', backgroundColor: 'transparent',
        color: '#844c62', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    },
    success: { fontSize: '13px', color: '#27ae60', marginTop: '12px' },
    error:   { fontSize: '13px', color: '#c0392b', marginTop: '12px' },
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('es-GT', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}

export default function PatientHistory() {
    const { patient_id }                    = useParams()
    const [docs, setDocs]                   = useState([])
    const [patientName, setPatientName]     = useState('')
    const [loading, setLoading]             = useState(true)
    const [showForm, setShowForm]           = useState(false)
    const [reason, setReason]               = useState('')
    const [currentIllness, setCurrentIllness] = useState('')
    const [background, setBackground]       = useState('')
    const [currentTreatment, setCurrentTreatment] = useState('')
    const [submitting, setSubmitting]       = useState(false)
    const [success, setSuccess]             = useState('')
    const [error, setError]                 = useState('')
    const navigate = useNavigate()

    function fetchDocs() {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:4000/api/documentations/${patient_id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setDocs(data)
                if (data.length > 0) setPatientName(data[0].patient_name)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchDocs()

        if (!patientName) {
            const token = localStorage.getItem('token')
            fetch('http://localhost:4000/api/patients', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    const p = data.find(p => String(p.id) === String(patient_id))
                    if (p) setPatientName(p.full_name)
                })
        }
    }, [patient_id])

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        setSuccess('')

        const token = localStorage.getItem('token')

        try {
            const res = await fetch('http://localhost:4000/api/documentations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    patient_id,
                    reason,
                    current_illness: currentIllness,
                    background,
                    current_treatment: currentTreatment,
                }),
            })

            if (!res.ok) throw new Error('Error al guardar')

            setSuccess('Nota guardada exitosamente')
            setReason('')
            setCurrentIllness('')
            setBackground('')
            setCurrentTreatment('')
            setShowForm(false)
            fetchDocs()
        } catch {
            setError('No se pudo guardar la nota')
        } finally {
            setSubmitting(false)
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
                <span style={styles.back} onClick={() => navigate('/documentacion')}>
                    ← Volver a pacientes
                </span>
                <h1 style={styles.heading}>{patientName || 'Paciente'}</h1>
                <p style={styles.subheading}>Historial clínico</p>

                {success && <p style={styles.success}>{success}</p>}

                {!showForm && (
                    <button style={styles.btnNew} onClick={() => setShowForm(true)}>
                        + Nueva nota
                    </button>
                )}

                {showForm && (
                    <div style={styles.form}>
                        <div style={styles.formTitle}>Nueva nota clínica</div>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.group}>
                                <label style={styles.label}>Motivo de consulta</label>
                                <textarea style={styles.textarea} value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    placeholder="¿Por qué consulta hoy?" />
                            </div>
                            <div style={styles.group}>
                                <label style={styles.label}>Enfermedad actual</label>
                                <textarea style={styles.textarea} value={currentIllness}
                                    onChange={e => setCurrentIllness(e.target.value)}
                                    placeholder="Descripción de la condición actual..." />
                            </div>
                            <div style={styles.group}>
                                <label style={styles.label}>Antecedentes</label>
                                <textarea style={styles.textarea} value={background}
                                    onChange={e => setBackground(e.target.value)}
                                    placeholder="Antecedentes médicos relevantes..." />
                            </div>
                            <div style={styles.group}>
                                <label style={styles.label}>Tratamiento</label>
                                <textarea style={styles.textarea} value={currentTreatment}
                                    onChange={e => setCurrentTreatment(e.target.value)}
                                    placeholder="Plan de tratamiento, medicamentos..." />
                            </div>
                            <div>
                                <button style={styles.btnSubmit} type="submit" disabled={submitting}>
                                    {submitting ? 'Guardando...' : 'Guardar nota'}
                                </button>
                                <button style={styles.btnCancel} type="button"
                                    onClick={() => setShowForm(false)}>
                                    Cancelar
                                </button>
                            </div>
                            {error && <p style={styles.error}>{error}</p>}
                        </form>
                    </div>
                )}

                {loading && <p style={styles.subheading}>Cargando historial...</p>}

                {!loading && docs.length === 0 && (
                    <div style={styles.empty}>No hay notas clínicas registradas para este paciente</div>
                )}
                                {docs.map(doc => (
                    <div key={doc.id} style={styles.card}>
                        <div style={styles.cardDate}>{formatDate(doc.consultation_date)}</div>
                        {doc.reason && (
                            <div style={styles.field}>
                                <div style={styles.fieldLabel}>Motivo</div>
                                <div style={styles.fieldValue}>{doc.reason}</div>
                            </div>
                        )}
                        {doc.current_illness && (
                            <div style={styles.field}>
                                <div style={styles.fieldLabel}>Enfermedad actual</div>
                                <div style={styles.fieldValue}>{doc.current_illness}</div>
                            </div>
                        )}
                        {doc.background && (
                            <div style={styles.field}>
                                <div style={styles.fieldLabel}>Antecedentes</div>
                                <div style={styles.fieldValue}>{doc.background}</div>
                            </div>
                        )}
                        {doc.current_treatment && (
                            <div style={styles.field}>
                                <div style={styles.fieldLabel}>Tratamiento</div>
                                <div style={styles.fieldValue}>{doc.current_treatment}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

