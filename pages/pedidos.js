import React from 'react';
import Layout from '../components/Layout';
import Link from "next/link"
import {gql,useQuery} from "@apollo/client"
import Pedido from '../components/Pedido';

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

const Pedidos = () => {

  //Query para obtener pedidos segun vendedor

  const {data,loading,error} = useQuery(OBTENER_PEDIDO_VENDEDOR)
  // console.log(data)
  // console.log(loading)
  // console.log(error)

  if(loading) return "Cargando..."

  const {obtenerPediddosVendedor} = data
  //console.log(obtenerPediddosVendedor)

    return ( 
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
          <Link href="/nuevopedido">
              <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Pedido</a>
          </Link>
          {obtenerPediddosVendedor.length === 0 ? (
            <p className="mt-5 text-center text-2xl">No hay pedidos aun</p>
          ):(
            obtenerPediddosVendedor.map(pedido=>(
              <Pedido 
                key={pedido.id}
                pedido={pedido}
              />
            ))
          )}
        </Layout>
     );
}
 
export default Pedidos;