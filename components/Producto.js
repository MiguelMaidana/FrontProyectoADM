import React from 'react';
import Swal from "sweetalert2"
import {gql,useMutation} from "@apollo/client"

const ELIMINAR_PRODUCTO=gql`
    mutation eliminarProducto($id:ID!){
        eliminarProducto(id:$id)
    }
`
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


const Procuto = ({producto}) => {
    const {nombre,existencia,precio,id}= producto

    //Mutation para eliminar Producto

    const[eliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
        update(cache){
            const{obtenerProductos} = cache.readQuery({
                query:OBTENER_PRODUCTOS
            })
            cache.writeQuery({
                query:OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos:obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            })
        }
    })

    const confirmarEliminarProducto =(id)=>{
        Swal.fire({
            title: '¿Deseas eliminar a este producto?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText : "No, Cancelar"
          }).then(async(result) => {
            if (result.value) {
                //console.log("Eliminando",id)
                try{
                    const {data} = await eliminarProducto({
                        variables:{
                            id
                        }
                    })
                    //console.log(data)
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarProducto,
                        'success'
                      )
                }catch(error){
                    console.log(error)
                }
            }
          })

    }
    return ( 
        <tr key={producto.id}>
        <td className="border px-4 py-2">{nombre}</td>
        <td className="border px-4 py-2">{existencia}</td>
        <td className="border px-4 py-2">$ {precio}</td>
        <td className="border px-4 py-2">
            <button
              type="button"
              className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
              onClick={()=>confirmarEliminarProducto(producto.id)}
            >
                Eliminar
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </td>
        <td className="border px-4 py-2">
            <button
              type="button"
              className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
              //onClick={()=>editarProducto(producto.id)}
            >
                Editar
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
        </td>
        
  </tr>
     );
}
 
export default Procuto;