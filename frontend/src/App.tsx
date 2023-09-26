import "./index.css"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./Components/Header/Header"
import Login from "./Components/Login/Login"
import { useEffect } from "react"
import { store, useAppDispatch, useAppSelector } from "./store/store"
import { loadUser } from "./store/actionHelpers/userActionHelper"
import Home from "./Components/Home/Home"

function App() {
  const dispatch = useAppDispatch
  useEffect(() => {
    store.dispatch(loadUser())
  }, [dispatch])

  const { isAuthenticated } = useAppSelector((state) => state.user)

  return (
    <>
      <Router>
        {isAuthenticated && <Header />}

        <Routes>
          <Route path="/" element={isAuthenticated ? < Home /> : <Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
