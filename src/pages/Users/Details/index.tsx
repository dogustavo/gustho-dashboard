export default function Detalhe() {
  return (
    <div>
      <h2>Detalhe</h2>

      <button onClick={() => localStorage.removeItem('token')}>
        Logout
      </button>
    </div>
  )
}
