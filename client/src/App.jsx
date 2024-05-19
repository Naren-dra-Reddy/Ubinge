import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Ubinge from './pages/Ubinge'
import Signup from './pages/Signup'
import Movies from './pages/Movies'
import Player from './pages/Player'
import TvShows from './pages/TvShows'
import Pay from './pages/Pay'
import NotSubscribed from './pages/NotSubscribed'
import MyList from './pages/MyList'
import Card from './components/Card'
import MovieInfo from './pages/MovieInfo'

export default function App() {
  const [subscriber,setSubscriber]=useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/' element={<Ubinge subscriber={subscriber} setSubscriber={setSubscriber}/>}/>
        <Route exact path='/player' element={<Player/>}/>
        <Route exact path='/movies' element={<Movies subscriber={subscriber} setSubscriber={setSubscriber}/>}/>
        <Route exact path='/tv' element={<TvShows/>}/>
        <Route exact path='/pay' element={<Pay subscriber={subscriber} setSubscriber={setSubscriber}/>}/>
        <Route exact path='/notsub' element={<NotSubscribed/>}/>
        <Route exact path='/mylist' element={<MyList/>}/>
        <Route exact element={<Card subscriber={subscriber} setSubscriber={setSubscriber}/>}/>
        <Route exact path='/movieinfo' element={<MovieInfo/>}/>


      </Routes>
    </BrowserRouter>
  )
}
