import "./index.css"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./Components/Header/Header"
import Login from "./Components/Login/Login"
import { useEffect } from "react"
import { store, useAppDispatch, useAppSelector } from "./store/store"
import { loadUser } from "./store/actionHelpers/userActionHelper"
import Home from "./Components/Home/Home"
import { Snackbar, Alert } from "@mui/material"
import { clearAlertMessage } from "./store/slice/user/userSlice"
import Account from "./Components/Account/Account"
import NewPost from "./Components/NewPost/NewPost"
import Register from "./Components/Register/Register"
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile"
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword"
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import ResetPassword from "./Components/ResetPassword/ResetPassword"
import UserProfile from "./Components/UserProfile/UserProfile"
import Search from "./Components/Search/Search"
import NotFound from "./Components/NotFound/NotFound"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    store.dispatch(loadUser())
  }, [dispatch])

  const { isAuthenticated, alertMessage } = useAppSelector((state) => state.user)

  return (
    <>
      <Router>
        {isAuthenticated && <Header />}

        <Routes>
          <Route path="/" element={isAuthenticated ? < Home /> : <Login />} />

          <Route path="/account" element={isAuthenticated ? < Account /> : <Login />} />

          <Route path="/newpost" element={isAuthenticated ? < NewPost /> : <Login />} />

          <Route path="/register" element={isAuthenticated ? < Account /> : <Register />} />

          <Route path="/update/profile" element={isAuthenticated ? < UpdateProfile /> : <Login />} />

          <Route
            path="/update/password"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />

          <Route
            path="/forgot/password"
            element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
          />

          <Route
            path="/password/reset/:token"
            element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
          />

          <Route
            path="/user/:id"
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />

          <Route path="search" element={<Search />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>

      <Snackbar open={Boolean(alertMessage.message)} autoHideDuration={5000} onClose={() => dispatch(clearAlertMessage())}>
        <Alert
          onClose={() => dispatch(clearAlertMessage())}
          severity={alertMessage.severity}
          sx={{
            position: "fixed",
            top: "90vh",
            left: "90px",
          }}

        >
          {alertMessage.message}
        </Alert >
      </Snackbar>
    </>
  )
}

export default App
