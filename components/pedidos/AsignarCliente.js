import React,{useState,useEffect} from 'react';
import Select from "react-select"

const clientes = [
    { id: 1, nombre: 'Miguel' },
    { id: 2, nombre: 'Angel' },
    { id: 3, nombre: 'Miguel Angel' }
  ]

const AsiganrCliente = () => {
    const [cliente,setCliente] = useState([])
  
    useEffect(()=>{
        console.log(cliente)
    },[cliente])


    const seleccionarCliente =(cliente)=>{
        setCliente(cliente)
    }
    return ( 
        <Select
        options={clientes}
        isMulti={true}
        onChange={(opcion)=>seleccionarCliente(opcion)}
        getOptionValue={(opciones)=>opciones.id}
        getOptionLabel={(opciones)=>opciones.nombre}
        placeholder="Seleccione el Cliente "
        noOptionsMessage={()=>"No hay resultados"}
    />
     );
}
 
export default AsiganrCliente;