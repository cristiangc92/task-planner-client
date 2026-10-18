import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Plus } from 'lucide-react';
import API from '../services/api'

export default function BoardView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState(null)
  const [newListTitle, setNewListTitle] = useState("")
  const [newCardTitle, setNewCardTitle] = useState({})

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

  // Eliminar el Tablero completo con confirmación previa
  const handleDeleteBoard = async () => {
    const confirmed = confirm(`¿Estás seguro de que deseas eliminar este tablero ("${board.title}") y todo su contenido?`);
    if (!confirmed) return;

    try {
      await API.delete(`/boards/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error al eliminar el tablero", err);
    }
  };

  // Crear una nueva Lista
  const handleCreateList = async (e) => {
    e.preventDefault()
    if (!newListTitle.trim()) return
    try {
      await API.post("/lists", {
        title: newListTitle,
        boardId: id,
        position: board.Lists ? board.Lists.length : 0
      });
      setNewListTitle("")
      fetchBoardDetails()
    } catch (err) {
      console.error("Error al crear la lista", err);
    }
  };

  // Eliminar una Lista
  const handleDeleteList = async (listId) => {
    if (!confirm("¿Seguro que deseas eliminar esta lista y todas sus tarjetas?")) return
    try {
      await API.delete(`/lists/${listId}`)
      fetchBoardDetails()
    } catch (err) {
      console.error("Error al eliminar la lista", err);
    }
  };

  // Crear una nueva Tarjeta en una lista especifica
  const handleCreateCard = async (e, listId) => {
    e.preventDefault()
    const title = newCardTitle[listId]
    if (!title || !title.trim()) return

    try {
      await API.post("/cards", {
        title,
        listId,
      })
      setNewCardTitle({ ...newCardTitle, [listId]: "" });
      fetchBoardDetails()
    } catch (err) {
      console.error("Error al crear la tarjeta", err);
    }
  };

  // Eliminar una Tarjeta
  const handleDeleteCard = async (cardId) => {
    try {
      await API.delete(`/cards/${cardId}`)
      fetchBoardDetails()
    } catch (err) {
      console.error("Error al eliminar la tarjeta", err)
    }
  }

  if (!board) return <div className="container"><p>Cargando tablero...</p></div>

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <button onClick={() => navigate("/")}>← Volver a Tableros</button>
        <h2>{board.title}</h2>
        <button
          onClick={handleDeleteBoard}
          style={{ backgroundColor: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Trash2 size={16} /> Eliminar Tablero
        </button>
      </div>

      {/* Formulario para agregar una nueva lista */}
      <form onSubmit={handleCreateList} style={{ display: "flex", gap: "0.5rem", maxWidth: "350px", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Nombre de nueva lista (ej: Por Hacer)"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          style={{ marginBottom: 0 }}
        />
        <button type="submit" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.2rem" }}>
          <Plus size={16} /> Lista
        </button>
      </form>

      {/* Renderizado de Listas y Tarjetas */}
      <div className="kanban-board">
        {board.Lists && board.Lists.length > 0 ? (
          board.Lists.map((list) => (
            <div key={list.id} className="kanban-list">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <h4 style={{ fontWeight: "600" }}>{list.title}</h4>
                <button
                  onClick={() => handleDeleteList(list.id)}
                  style={{ background: "transparent", color: "var(--danger)", padding: "0.2rem", cursor: "pointer" }}
                  title="Eliminar lista"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Tarjetas dentro de la lista */}
              {list.Cards && list.Cards.map((card) => (
                <div key={card.id} className="task-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0 }}><strong>{card.title}</strong></p>
                    {card.description && <small style={{ color: "#5e6c84" }}>{card.description}</small>}
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    style={{ background: "transparent", color: "#6b778c", padding: 0 }}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Formulario rápido para agregar tarjeta a esta lista */}
              <form onSubmit={(e) => handleCreateCard(e, list.id)} style={{ marginTop: "1rem" }}>
                <input
                  type="text"
                  placeholder="+ Agregar tarjeta..."
                  value={newCardTitle[list.id] || ""}
                  onChange={(e) => setNewCardTitle({ ...newCardTitle, [list.id]: e.target.value })}
                  style={{ fontSize: "0.85rem" }}
                />
              </form>
            </div>
          ))
        ) : (
          <p style={{ color: "#5e6c84" }}>No hay listas en este tablero aún. Crea una arriba para empezar.</p>
        )}
      </div>
    </div>
  )
}