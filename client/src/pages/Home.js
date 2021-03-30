import React from 'react'
import Oficinas from '../components/tablaOficinas/Oficinas.jsx'
import Reservas from '../components/tablaReservas/Reservas.jsx'

const Home = () => {
    return (
        <div className="container text-center">
            <div className=" my-4">
                <h3>Challenge WebApp</h3>
            </div>
            <Oficinas />
            <Reservas />
        </div>
    )
}

export default Home
