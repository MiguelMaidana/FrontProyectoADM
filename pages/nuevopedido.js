import React,{useContext,useState} from 'react';
import Layout from '../components/Layout';
import AsiganrCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from "../components/pedidos/AsignarProductos"

//Context de Pedidos
import PedidoContext from "../context/pedidos/PedidoContext"
import ResumenPedido from '../components/pedidos/ResumenPedido';


import Total from '../components/pedidos/Total';

//Mutation

import {gql,useMutation} from "@apollo/client"

//Routing

import {useRouter} from "next/router"
import Swal from "sweetalert2"

const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input:PedidoInput){
        nuevoPedido(input:$input){
        id
       
        }
    }
`
const OBTENER_PEDIDO_VENDEDOR = gql`
  query obtenerpedidosVendedor{
    obtenerPediddosVendedor{
      id
      total
      pedido{
        id
        cantidad
        nombre
        
      }
      cliente{
        id
        nombre
        apellido
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`

const NuevoPedido = () => {

    const router = useRouter()

    const [mensaje,setMensaje] = useState(null)

    //Utilizar context y extraer sus funciones y valores 
    
    const pedidoContext = useContext(PedidoContext)
    //console.log(pedidoContext)
    const{cliente,productos,total} = pedidoContext

    //Mutation para crear un nuevo Pedido 

    const [nuevoPedido] = useMutation(NUEVO_PEDIDO,{
        update(cache,{data:{nuevoPedido}}){
            const{obtenerPediddosVendedor} = cache.readQuery({
                query:OBTENER_PEDIDO_VENDEDOR
            });
            cache.writeQuery({
                query:OBTENER_PEDIDO_VENDEDOR,
                data:{
                    obtenerPediddosVendedor : [...obtenerPediddosVendedor, nuevoPedido]
                }
            })
        }
    })
   
    const validarPedido=()=>{
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed":"";
    }

    //console.log(productos)

    const crearNuevoPedido = async()=>{

        const {id} = cliente;


        //remover no lo deseado de productos
        const pedido = productos.map(({existencia,__typename,...producto})=>producto)
        //console.log(pedido)
        
        try{
            const {data}= await nuevoPedido({
                variables:{
                   input:{
                    cliente:id,
                    total,
                    pedido
                   }
                }
            })
            //console.log(data)
            router.push("/pedidos")

            //Mostrar alerte

            Swal.fire(
                "Correcto",
                "El pedido se registro Correctamente",
                "success"
            )
        }catch(error){
            setMensaje(error.message)
            setTimeout(() => {
                setMensaje(null)
            }, 3000);

        }

    }

    const mostrarMensaje =()=>{
        return (
            <div className="bg-red-200 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }


  
    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5 ">
                <div className="w-full max-w-lg">
                    <AsiganrCliente/>
                    <AsignarProductos/>
                    <ResumenPedido/>
                    <Total/>
                    <button
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900${validarPedido()}`}
                        onClick={()=>crearNuevoPedido()}
                    >Registrar Pedido</button>
                </div>
            </div>

           

          
        </Layout>
       
     );
}
 
export default NuevoPedido;