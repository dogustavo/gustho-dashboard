export default function Listagem() {
  return (
    <div>
      <h2>Listagem</h2>

      <button onClick={() => localStorage.removeItem('token')}>
        Logout
      </button>
    </div>
  )
}
