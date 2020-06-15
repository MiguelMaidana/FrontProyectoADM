import React,{useContext} from 'react';
import Layout from '../components/Layout';
import AsiganrCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from "../components/pedidos/AsignarProductos"

//Context de Pedidos
import PedidoContext from "../context/pedidos/PedidoContext"

const NuevoPedido = () => {

    //Utilizar context y extraer sus funciones y valores 
    
    const pedidoContext = useContext(PedidoContext)
   


  
    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>

           <AsiganrCliente/>
           <AsignarProductos/>

          
        </Layout>
       
     );
}
 
export default NuevoPedido;