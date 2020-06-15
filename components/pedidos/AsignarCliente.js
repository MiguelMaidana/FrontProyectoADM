import React,{useState,useEffect,useContext} from 'react';
import Select from "react-select"
import {gql,useQuery} from "@apollo/client"
import PedidoContext from "../../context/pedidos/PedidoContext"

const OBTENER_CLIENTES_USUARIO = gql  `
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
      
    }
  }

`

const AsiganrCliente = () => {
    const [cliente,setCliente] = useState([])

    //context de Pedidos

    const pedidoContext = useContext(PedidoContext)
    //console.log(pedidoContext)
    const{agregarCliente} = pedidoContext
    
    //Consultar la BD 

    const {data,loading,error} = useQuery(OBTENER_CLIENTES_USUARIO)
    // console.log(data)
    // console.log(loading)
    // console.log(error)


    useEffect(()=>{
        agregarCliente(cliente)
    },[cliente])


    const seleccionarCliente =(cliente)=>{
        setCliente(cliente)
    }

    //Resultados de la consulta

    if(loading) return "Cargando...."
    const{obtenerClientesVendedor} = data
    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold" >1.- Asigna un cliente al pedido</p>
            <Select
            className="mt-3"
            options={obtenerClientesVendedor}
            onChange={(opcion)=>seleccionarCliente(opcion)}
            getOptionValue={(opciones)=>opciones.id}
            getOptionLabel={(opciones)=>opciones.nombre}
            placeholder="Seleccione el Cliente "
            noOptionsMessage={()=>"No hay resultados"}
            />
        </>
     );
}
 
export default AsiganrCliente;