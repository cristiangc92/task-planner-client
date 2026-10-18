import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus } from "lucide-react";
import API from "../services/api"

export default function Home() {
    const [boards, setBoards] = useState([])
    const [newTitle, setNewTitle] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchBoards()
    }, [])

    const fetchBoards = async () => {
        try {
            const res = await API.get("/boards")
            setBoards(res.data)
        } catch (err) {
            console.error("Error al cargar los tableros", err)
        }
    }

    const handleCreateBoard = async (e) => {
        e.preventDefault()
        if (!newTitle.trim()) return
        try {
            const res = await API.post("/boards", { title: newTitle })
            setBoards([res.data, ...boards])
            setNewTitle("")
        } catch (err) {
            console.error("Error al crear tablero", err)
        }
    }

    const handleDeleteBoard = async (e, boardId, boardTitle) => {
        //Evita que al hacer click en la papelera se abra la vista del tablero
        e.stopPropagation()

        const confirmed = confirm(`¿Estas seguro de que deseas eliminar el tablero "${boardTitle}" y todas sus listas y tarjetas?`)
        if (!confirmed) return

        try {
            await API.delete(`/boards/${boardId}`)
            setBoards(boards.filter((b) => b.id !== boardId))
        } catch (err) {
            console.error("Error al eliminar el tablero", err)
        }
    }

    return (
        <div className="container">
            <h2>Mis Tableros</h2>
            <form onSubmit={handleCreateBoard} style={{ maxWidth: "350px", margin: "1rem 0", display: "flex", gap: "0.5rem" }}>
                <input
                    type="text"
                    placeholder="Nombre del nuevo tablero..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ marginBottom: 0 }}
                />
                <button type="submit" style={{ display: "flex", alignItems: "center", gap: "0.2rem", whiteSpace: "nowrap" }}>
                    <Plus size={16} /> Crear
                </button>
            </form>

            <div className="board-grid">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className="board-card"
                        onClick={() => navigate(`/board/${board.id}`)}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
                    >
                        <h3>{board.title}</h3>
                        <button
                            onClick={(e) => handleDeleteBoard(e, board.id, board.title)}
                            style={{ background: "transparent", color: "var(--danger)", padding: "0.2rem", cursor: "pointer" }}
                            title="Eliminar tablero"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}