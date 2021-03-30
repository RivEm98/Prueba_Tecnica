import React, { useState, useEffect } from "react";
import Axios from "axios";

const Oficinas = () => {
    const [oficinas, setOficinas] = useState([]);
    /* datos de la oficina */
    const [nombre, setNombre] = useState("");
    const [codigoInterno, setCodInterno] = useState("");
    const [personaACargo, setPersonaACargo] = useState("");
    const [cantidadPersonas, setCantidadPersonas] = useState("");
    const [baño, setBaño] = useState("");
    const [wifi, setWifi] = useState("");
    const [telefono, setTelefono] = useState("");

    let detalle = (id) => {
        Axios.get(`http://localhost:3000/oficinas/${id}`).then((data) => {
            setNombre(data.data.nombre);
            setCodInterno(data.data.codigo_interno);
            setPersonaACargo(data.data.persona_acargo);
            setCantidadPersonas(data.data.cantidad_personas);
            setBaño(data.data.toilet);
            setWifi(data.data.wifi);
            setTelefono(data.data.telefono);
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3000/oficinas").then((data) => {
            setOficinas(data.data);
        });
    }, []);
    return (
        <div className="container">
            <table className="table table-bordered table-light">
                <thead>
                    <tr>
                        <th scope="col">Oficina</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Wifi</th>
                        <th scope="col">Baño Privado?</th>
                    </tr>
                </thead>
                <tbody>
                    {oficinas.map((off) => {
                        return (
                            <tr key={off.id}>
                                <td>
                                    <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        style={{ border: "none", backgroundColor: "transparent" }}
                                        onClick={(e) => {
                                            detalle(off.id, e);
                                        }}
                                    >
                                        {off.nombre}
                                    </button>
                                </td>
                                <td>{off.cantidad_personas}</td>
                                <td>{off.telefono}</td>
                                <td>{off.wifi}</td>
                                <td>{off.toilet}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Detalle de Oficina
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered text-start">
                                <tbody>
                                    <tr>
                                        <th scope="row">Nombre de oficina</th>
                                        <td>{nombre}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Codigo Interno</th>
                                        <td>{codigoInterno}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Persona a Cargo</th>
                                        <td>{personaACargo}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Cantidad de personas</th>
                                        <td>{cantidadPersonas}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Teléfono?</th>
                                        <td>{telefono}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Wifi</th>
                                        <td>{wifi}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Baño Privado?</th>
                                        <td>{baño}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
              </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Oficinas;
