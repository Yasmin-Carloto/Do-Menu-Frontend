import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import MainLayout from './templates/MainLayout/MainLayout'
import FormsLayout from './templates/FormsLayout/FormsLayout'
import Login from './pages/Login/Login'
import ProfileForm from "./pages/ProfileForm/ProfileForm"
import FormMenuItem from './pages/FormMenuItem/FormMenuItem'
import { TokenProvider } from './contexts/TokenContext'
import { RestaurantProvider } from './contexts/RestaurantContext'

function App() {
  return (
    <TokenProvider>
      <RestaurantProvider>
        <Router>
          <Routes>
            <Route element={<FormsLayout />}>
              <Route path={`/login`} element={<Login />}/>
              <Route path={`/signup`} element={<ProfileForm isEditingPage={false} />}/>
            </Route>

            <Route element={<MainLayout />}>
              <Route path={`/`} element={<Home />} />
              <Route path={`/edit-profile`} element={<ProfileForm isEditingPage={true} />}/>
              <Route path={`/add-item`} element={<FormMenuItem menuItem={undefined}/>} />
              <Route path={`/edit-item/:id`} element={<FormMenuItem menuItem={undefined} />} />
            </Route>
          </Routes>
        </Router>
      </RestaurantProvider>
    </TokenProvider>
  )
}

export default App
