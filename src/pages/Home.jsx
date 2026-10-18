import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    return (
        <div className="container">
            <h2>Mis Tableros</h2>
            <form onSubmit={handleCreateBoard} style={{ maxWidth: '300px', margin: '1rem 0' }}>
                <input
                    type="text"
                    placeholder="Nombre del nuevo tablero..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <button type="submit">Crear Tablero</button>
            </form>

            <div className="board-grid">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className="board-card"
                        onClick={() => navigate(`/board/${board.id}`)}
                    >
                        <h3>{board.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}