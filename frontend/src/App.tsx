import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./Components/Header/Header"
import Login from "./Components/Login/Login"
import { useEffect } from "react"
import { useAppDispatch } from "./store/store"
import { loadUser } from "./store/actionHelpers/userActionHelper"

function App() {
  const dispatch = useAppDispatch
  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
