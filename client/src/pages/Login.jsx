import { useState } from "react"
import axios from "axios"

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fffcfd",
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        padding: '48px 40px',
        borderRadius: '16px',
        border: '1px solid #e8d5de',
        backgroundColor: '#fff',
        boxshadow: '0 2px 16px rgba(132,76,98,0.07)',
    },
    title: {
        fontSize: '22px',
        fontWeight: '600',
        color: '#844c62',
        marginBottom: '8px',
        textAlign: 'center',
    },  
    subtitle: {
        fontSize: '14px',
        color: '#888',
        textAlign: 'center',
        marginBottom: '32px',
    },
    group: {
        marginBottom: '16px',
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
        border: '1.5 px solid #d9bfc8',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: '#fffcfd',
        color: '#1a1a1a',
        transition: 'border-color 0.2s',
    },
    button:{
        with: '100%',
        padding: '13px',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#844c62',
        color: '#fff',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px',
        transition: 'background-color 0.2s',
    },
    error: {
        fontSize: '13px',
        color: '#c0392b',
        textAlign: 'center',
        marginTop: '16px',
    },
}  

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', { 
                email,
                password, 
    })
    localStorage.setItem('token', res.data.token)
    alert('Login exitoso - aquí irá el Dashboard')
    } catch (err) {
    setError(err.response?.data?.message || 'Error al conectar con el servidor')
    }finally {
        setLoading(false)
    }
}
    return (
    <div style={styles.page}>
    <div style={styles.card}>
        <h1 style={styles.title}>Transformasalud</h1>
        <p style={styles.subtitle}>Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit}>
        <div style={styles.group}>
            <label style={styles.label}>Correo electrónico</label>
            <input
                style={styles.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="doctor@clinica.com"
                required
            />
        </div>

        <div style={styles.group}>
            <label style={styles.label}>Contraseña</label>
            <input
                style={styles.input}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
            />
        </div>

        <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
    </div>
    </div>
)
}
