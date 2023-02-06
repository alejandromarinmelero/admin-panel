import React from 'react'
import NavBar from '../NavBar/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import SingUp from '../SingUp/SingUp'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Login from '../Login/Login'
import Context from '../../Context/Context'
import PublicRoute from '../PublicRoute/PublicRoute'
import EditProfile from '../EditProfile/EditProfile'
import NotFound from '../NotFound/NotFound'
import Note from '../Note/Note'
import Notes from '../Notes/Notes'

const MainApp = () => {

    return (
        <Context>
            <BrowserRouter>
                <div className='container'>
                    <NavBar />
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path='/' element={<PublicRoute />}>
                            <Route index element={<Login />}></Route>
                            <Route path='/sing-up' element={<SingUp />}></Route>
                        </Route>
                        {/* //Rutas privadas */}
                        <Route path='/admin' element={<ProtectedRoute />}>
                            <Route path='/admin/home' element={<Home />}></Route>
                            <Route path='/admin/notes' element={<Notes />}></Route>
                            <Route path='/admin/note/:id' element={<Note />}></Route>
                            <Route path='/admin/edit-profile' element={<EditProfile />}></Route>
                        </Route>

                        <Route path='*' element={<NotFound />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </Context>
    )
}

export default MainApp
