import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import BoardView from "./pages/BoardView"

function App() {  
  return (
    <BrowserRouter>
      <header className="navbar">
        <h1>Task Planner Express</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board/:id" element={<BoardView/>}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
