import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from 'sweetalert'

const Reservas = () => {
    /* oficinas */
    const [oficinas, setOficinas] = useState([])
    /* datos de reserva */
    const [idReserva, setIdReserva] = useState('')
    const [oficina, setOficina] = useState('')
    const [cliente, setCliente] = useState('')
    const [usuario, setUsuario] = useState('')
    const [comienzo, setComienzo] = useState('')
    const [fin, setFin] = useState('')
    /* reservas */
    const [reservas, setreservas] = useState([])

    const agregar = () => {
        if (cliente === '' || usuario === '' || comienzo === '' || fin === '') {
            return swal('Error', "Verifique que los campos esten cargados", 'error')
        }
        Axios.post('http://localhost:3000/alquileres', { oficina: oficina, cliente: cliente, usuario: usuario, comienzo: comienzo, fin: fin })
            .then(data => {
                if (data.data === "exito") {
                    swal('Exito', 'Se agrego la reserva con exito', 'success')
                        .then(value => {
                            setOficina('')
                            setCliente('')
                            setUsuario('')
                            setComienzo('')
                            setFin('')
                            /* window.location.reload() */
                        })
                } else {
                    swal('Error', "Hubo un error al agregar una reserva", 'error')
                }
            })
    }

    const detalleReserva = (id) => {
        Axios.get(`http://localhost:3000/alquileres/${id}`)
            .then(data => {
                setIdReserva(data.data.id)
                setOficina(data.data.oficina)
                setCliente(data.data.cliente)
                setUsuario(data.data.persona_reservo)
                setComienzo(data.data.fecha_comienzo)
                setFin(data.data.fecha_fin)
            })
    }

    const actualizar = (id) => {
        if (cliente === '' || usuario === '' || comienzo === '' || fin === '') {
            return swal('Error', "Verifique que los campos esten cargados", 'error')
        }
        Axios.put(`http://localhost:3000/alquileres/${id}`, { oficina: oficina, cliente: cliente, usuario: usuario, comienzo: comienzo, fin: fin })
            .then(data => {
                if (data.data === "exito") {
                    swal('Exito', 'Se actualizo la reserva con exito', 'success')
                        .then(value => {
                            setIdReserva('')
                            setOficina('')
                            setCliente('')
                            setUsuario('')
                            setComienzo('')
                            setFin('')
                            window.location.reload()
                        })
                } else {
                    swal('Error', "Hubo un error al actualizar una reserva", 'error')
                }
            })
    }

    const eliminar = (id) => {
        swal({
            title: "Atencion!",
            text: "Estas a punto de eliminar una reserva",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Axios.delete(`http://localhost:3000/alquileres/${id}`);
                swal("La reserva fue eliminada!", {
                    icon: "success",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                swal("Uf.. por poco borras una reserva!");
            }
        });
    }

    useEffect(() => {
        /* oficinas */
        Axios.get("http://localhost:3000/oficinas").then((data) => {
            setOficinas(data.data);
        });
        /* reservas */
        Axios.get('http://localhost:3000/alquileres').then(data => {
            setreservas(data.data)
        })
    }, []);
    return (
        <div className="container">
            <h5 className="my-4">Reservas:</h5>
            <table className="table table-bordered table-light">
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => {
                        return (<tr key={reserva.id}>
                            <td>{reserva.fecha_comienzo}</td>
                            <td>{reserva.cliente}</td>
                            <td>
                                {/* ////////////////////////////////////////////BOTON DE DETALLE DE UNA RESERVA////////////////////////////////////////// */}
                                <button
                                    onClick={(e) => { detalleReserva(reserva.id, e) }}
                                    className="btn btn-info btn-sm"
                                    style={{ marginRight: '20px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#reservaDetalle"
                                >
                                    <i className="bi bi-pencil" style={{ color: 'white' }}></i>
                                </button>
                                <div className="modal fade" id="reservaDetalle" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Detalle de reserva</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body text-start">
                                                <form>
                                                    <div key={reserva.id}>
                                                        <select className="form-control mb-3" name="oficinas" id="oficinas"
                                                            onChange={(e) => {
                                                                setOficina(e.target.value);
                                                            }}
                                                        >
                                                            {oficinas.map(off => {
                                                                if (off.id === oficina) {
                                                                    return <option selected disabled value={off.id}>{off.nombre}</option>

                                                                }
                                                            })}
                                                            {oficinas.map(off => {
                                                                return <option key={off.id} value={off.id}>{off.nombre}</option>
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="cliente"
                                                            id="cliente"
                                                            placeholder="cliente"
                                                            value={cliente}
                                                            onChange={(e) => { setCliente(e.target.value); }}
                                                        />
                                                        <label htmlFor="cliente">Cliente</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="usuario"
                                                            id="usuario"
                                                            placeholder="usuario"
                                                            value={usuario}
                                                            onChange={(e) => { setUsuario(e.target.value); }}
                                                        />
                                                        <label htmlFor="usuario">Quien toma la reserva</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="comienzo"
                                                            id="comienzo"
                                                            placeholder="comienzo"
                                                            value={comienzo}
                                                            onChange={(e) => { setComienzo(e.target.value); }}
                                                        />
                                                        <label htmlFor="comienzo">Fecha de comienzo</label>
                                                    </div>

                                                    <div className="form-floating">
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="fin"
                                                            id="fin"
                                                            placeholder="fin"
                                                            value={fin}
                                                            onChange={(e) => { setFin(e.target.value); }}
                                                        />
                                                        <label htmlFor="fin">Fecha de fin</label>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" className="btn btn-primary" onClick={(e) => { actualizar(idReserva, e) }}>Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => eliminar(reserva.id, e)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            {/* ///////////////////////////BOTON DE AGREGAR UNA RESERVA///////////////////////// */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reserva">
                Agregar Reserva
            </button>
            <div className="modal fade" id="reserva" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reserva</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <form>
                                <div>
                                    <select className="form-control mb-3" name="oficinas" id="oficinas"
                                        onChange={(e) => {
                                            setOficina(e.target.value);
                                        }}
                                    >
                                        <option selected disabled>Oficinas</option>
                                        {oficinas.map(off => {
                                            return <option key={off.id} value={off.id}>{off.nombre}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" type="text" name="cliente" id="cliente" placeholder="cliente"
                                        onChange={(e) => { setCliente(e.target.value); }}
                                    />
                                    <label htmlFor="cliente">Cliente</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" type="text" name="usuario" id="usuario" placeholder="usuario"
                                        onChange={(e) => { setUsuario(e.target.value); }}
                                    />
                                    <label htmlFor="usuario">Quien toma la reserva</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" type="date" name="comienzo" id="comienzo" placeholder="comienzo"
                                        onChange={(e) => { setComienzo(e.target.value); }}
                                    />
                                    <label htmlFor="comienzo">Fecha de comienzo</label>
                                </div>

                                <div className="form-floating">
                                    <input className="form-control" type="date" name="fin" id="fin" placeholder="fin"
                                        onChange={(e) => { setFin(e.target.value); }}
                                    />
                                    <label htmlFor="fin">Fecha de fin</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={agregar}>Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservas
