const styles = {
  nav: {
    height: '60px',
    backgroundColor: '#fff',
    borderBottom: '1.5px solid #e8d5de',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
  },
  brand: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#844c62',
  },
  button: {
    padding: '8px 20px',
    borderRadius: '50px',
    border: '1.5px solid #844c62',
    backgroundColor: 'transparent',
    color: '#844c62',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default function Navbar({ onLogout }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Transformasalud</span>
      <button style={styles.button} onClick={onLogout}>
        Cerrar sesión
      </button>
    </nav>
  )
}
