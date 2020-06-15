import React from 'react';
import Layout from '../components/Layout';
import AsiganrCliente from '../components/pedidos/AsignarCliente';

const NuevoPedido = () => {

  
    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>

           <AsiganrCliente/>

          
        </Layout>
       
     );
}
 
export default NuevoPedido;