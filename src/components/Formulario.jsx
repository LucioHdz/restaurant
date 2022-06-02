import React from 'react'
import ImagenMesas from '../img/distribucion.png'




const Formulario = ({ agregar, nombre, setNombre, mesa, setMesa, hora, setHora, editar, setEditar, actualizar }) => {
  // Area de hooks





  const cargarDatos = (e) => {
    e.preventDefault();
    if (editar) {
      actualizar()
      setEditar(false)
    } else {
      agregar()
    }
    setNombre('')
    setMesa('')
    setHora('')
  }



  return (
    <form className='d-flex flex-column Formulario p-2  align-center text-light bg-dark' onSubmit={cargarDatos}>



      <label className='mt-2' >Nombre : </label>
      <input value={nombre} className='text-body' required type='text' placeholder='Nombre de la persona para la reservacion' onChange={(e) => setNombre(e.target.value)} />


      <label className='mt-2'>Numero de mesa: </label>
      <input value={mesa} className='text-body' required type='number' placeholder='No. de mesa' onChange={(e) => setMesa(e.target.value)} />


      <label className='mt-2'>Hora de reserva: </label>
      <input value={hora} className='text-body' required type='time' placeholder='Hora de reserva' onChange={(e) => setHora(e.target.value)} />


      {editar ?
        <button type="submit" className="btn btn-outline-warning mt-2">Editar</button>
        :
        <button type="submit" className="btn btn-outline-light mt-2">Agregar</button>}






      <div class="text-center">
        <img src={ImagenMesas} class="rounded col-12 mt-5" alt="distribucion" />
      </div>

    </form>
  )
}

export default Formulario