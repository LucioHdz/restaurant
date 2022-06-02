import Formulario from "./components/Formulario";
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import React, { useEffect } from "react";
import Row from "./components/Row";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhUT88BEyRiT8ieAzvuv4FGgKdOBQl8-w",
  authDomain: "restaurant-725dc.firebaseapp.com",
  projectId: "restaurant-725dc",
  storageBucket: "restaurant-725dc.appspot.com",
  messagingSenderId: "925794335116",
  appId: "1:925794335116:web:02f9747cd5850838167ea9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);









function App() {

  const [mesa, setMesa] = React.useState()
  const [nombre, setNombre] = React.useState();
  const [id, setid] = React.useState();
  const [hora, setHora] = React.useState();
  const [mesas, setMesas] = React.useState();
  const [editar, setEditar] = React.useState(false);

  const leer = async () => {
    setMesas([])
    const querySnapshot = await getDocs(collection(db, "reserva"));
    var datos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      datos = [...datos, doc.data()]
      // console.log(doc.id, " => ", doc.data());
      setMesas(datos)
    })
  }

  const agregarDatosAFirestore = () => {
    // Add a new document in collection "cities"
    const id = uuid();
    setDoc(doc(db, "reserva", id), {
      id: id,
      nombre: nombre,
      mesa: mesa,
      hora: hora
    }).then((d) => {
      leer()
    })
  }

  const eliminarDato = (id) => {
    deleteDoc(doc(db, "reserva", id)).then((e) => {
      leer()
    })

  }

  const actualizarDato = () => {
    updateDoc(doc(db, "reserva", id), {
      id: id,
      mesa: mesa,
      hora: hora,
      nombre: nombre
    }).then((e) => {
      leer()
    })
  }
  const actualizar = (datos) => {
    setNombre(datos.nombre)
    setMesa(datos.mesa)
    setHora(datos.hora)
    setid(datos.id)
    setEditar(true)
  }

  useEffect(() => {
    //Runs only on the first render
    leer()
  }, []);


  return (
    <div className="App pt-2">





      <section className=' d-flex flex-wrap'>

        <div className="col-3">
          <Formulario agregar={agregarDatosAFirestore}
            nombre={nombre} setNombre={setNombre}
            mesa={mesa} setMesa={setMesa}
            hora={hora} setHora={setHora}
            editar={editar} setEditar={setEditar}
            actualizar={actualizarDato}
          />
          
        </div>


        <div className='d-flex flex-column ml-4 col-7 Lista'>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">mesa</th>
                <th scope="col">Hora</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {!mesas ? null : mesas.map((datos) => {
                return (<Row key={datos.id} eliminar={eliminarDato} actualizar={actualizar} data={datos} />)
              })}





            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
