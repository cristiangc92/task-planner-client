import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'

export default function BoardView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState(null)

  useEffect(() => {
    fetchBoardDetails()
  }, [id])

  const fetchBoardDetails = async () => {
    try {
      const res = await API.get(`/boards/${id}`)
      setBoard(res.data)
    } catch (err) {
      console.error('Error al cargar detalle del tablero', err)
    }
  }

  if (!board) return <div className="container"><p>Cargando tablero...</p></div>

  return (
    <div className="container">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        ← Volver a Tableros
      </button>
      <h2>{board.title}</h2>

      <div className="kanban-board" style={{ marginTop: '1.5rem' }}>
        {board.Lists && board.Lists.length > 0 ? (
          board.Lists.map((list) => (
            <div key={list.id} className="kanban-list">
              <h4>{list.title}</h4>
              {list.Cards && list.Cards.map((card) => (
                <div key={card.id} className="task-card">
                  <p><strong>{card.title}</strong></p>
                  {card.description && <small>{card.description}</small>}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No hay listas en este tablero aún.</p>
        )}
      </div>
    </div>
  )
}