import React,{useState,useEffect,useContext} from 'react';
import Select from "react-select"
import {gql,useQuery} from "@apollo/client"
import PedidoContext from "../../context/pedidos/PedidoContext"


const OBTENER_PRODUCTOS= gql`
  query obtenerProductos{
    obtenerProductos{
      id
      nombre
      existencia
      precio
    }
  }
`


const AsignarProducto = () => {

    //state local del componente
    const [producto,setProducto] = useState([])

    //Context de Pedidos 
    const pedidoContext = useContext(PedidoContext)
    //console.log("Estoy en Productos",pedidoContext)
    const{agregarProducto} = pedidoContext

    //Query para obtener Productos

    const {data,loading,error} = useQuery(OBTENER_PRODUCTOS)
    // console.log(data)
    // console.log(loading)
    // console.log(error)

    useEffect(()=>{
        agregarProducto(producto)
    },[producto])

    const seleccionarProducto =(producto)=>{
        setProducto(producto)
    }
    if(loading) return "Cargando...."

    const {obtenerProductos} = data 
    return ( 
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold" >2.- Selecciona o busca los productos</p>
        <Select
        className="mt-3"
        options={obtenerProductos}
        onChange={(opcion)=>seleccionarProducto(opcion)}
        isMulti={true}
        getOptionValue={(opciones)=>opciones.id}
        getOptionLabel={(opciones)=>`${opciones.nombre} - ${opciones.existencia} Disponibles`}
        placeholder="Busque o Seleccione el Producto "
        noOptionsMessage={()=>"No hay resultados"}
        />
    </>
     );
}
 
export default AsignarProducto;