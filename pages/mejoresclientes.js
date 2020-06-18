import React,{useEffect} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import Layout from '../components/Layout';
import {gql,useQuery} from "@apollo/client"

const MEJORES_CLIENTES = gql`

    query mejoresClientes{
        mejoresClientes{
        cliente{
            nombre
            empresa
        }
        total
        }
    }

`


const  MejoresCLientes= () => {

    const {data,loading,error,startPolling,stopPolling}= useQuery(MEJORES_CLIENTES)
   // console.log(data)

   useEffect(()=>{
    startPolling(1000)
        return()=>{
            stopPolling()
        }
   },[startPolling,stopPolling])
    
    if(loading) return "Cargando...."
    const {mejoresClientes} = data
    //console.log(mejoresClientes)

    const clientegrafico =[]
    //console.log(clientegrafico)

    // mejoresVendedores.map((vendedor,index)=>{
    //     vendedorGrafica[index] = {
    //         ...vendedor.vendedor[0],
    //         total : vendedor.total

    //     }
    // })

    mejoresClientes.map((cliente,index)=>{
        clientegrafico[index] = {
            ...cliente.cliente[0],
            total : cliente.total
        } 
    })

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>

            <BarChart
        width={600}
        height={500}
        data={clientegrafico}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182CE" />
      </BarChart>

        </Layout>
     );
}
 
export default MejoresCLientes;