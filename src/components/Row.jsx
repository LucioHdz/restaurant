import React from 'react'

const Row = ({data,eliminar,actualizar}) => {
    return (
        <tr >
            <td>{data.nombre}</td>
            <td>{data.mesa}</td>
            <td>{data.hora}</td>
            <td><button type="button" className="btn btn-warning" onClick={()=>actualizar(data)}>Editar</button></td>
            <td><button type="button" className="btn btn-danger" onClick={()=>eliminar(data.id)}>Eliminar</button></td>
        </tr>
    )
}

export default Row