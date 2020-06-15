import React from 'react';
import {useRouter} from "next/router"
import Layout from '../../components/Layout';
import {gql, useQuery,useMutation} from "@apollo/client"
import {Formik} from "formik"
import * as Yup from "yup"
import Swal from "sweetalert2"


const OBTENER_PRODUCTO = gql`
query obtenerProducto($id:ID!){
    obtenerProducto(id:$id){
        nombre
        existencia
        precio
    }
}
`
const ACTUALIZAR_PRODUCTO = gql `

mutation actualizarProducto($id:ID!,$input:ProductoInput){
    actualizarProducto(id:$id,input:$input){
        nombre
        existencia
        precio
    }
}
`

const EditarProducto = () => {
    
    const router = useRouter()
    const {query:{id}} = router
   //console.log(id)

    //Query para Obtener Producto

    const{data,loading,error} = useQuery(OBTENER_PRODUCTO,{
        variables:{
            id
        }
    })

    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    // Esquema de Validacion 

    const schemaValidation = Yup.object({
        nombre: Yup.string().required("El nombre del Producto es obligatorio"),
        existencia:Yup.number().required("La cantidad del articulo es obligatoria").positive("No se aceptan numeros negativos").integer("La existencia deben ser numeros enteros"),
        precio : Yup.number().required("El valor del producto es obligatorio").positive("El precio no puede ser negativo ")
    });



   
    if(loading) return "Cargando...."
    if(!data){
        return "Accion no permitida"
    }
    const {obtenerProducto} = data

    // Editar la informacion de un Producto
    const actualizarInfoProductos =async (valores)=>{
        const {nombre,existencia,precio} = valores
        try{
            const {data} = await actualizarProducto({
                variables:{
                    id,
                    input:{
                        nombre,
                        existencia,
                        precio
                    }
                }
            })

            //console.log(data)
            Swal.fire(
                'Actualizado!',
                "El Producto se actualizo correctamente",
                'success'
              )
            //Redireccionar
            router.push("/productos")

        }catch(error){
            console.log(error)
        }
    }
    return (
        <Layout>
         <h1  className="text-2xl text-gray-800 font-light">Editar Producto</h1>

         <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <Formik
                            validationSchema={schemaValidation}
                            enableReinitialize
                            initialValues={obtenerProducto}
                            onSubmit={valores =>{
                                actualizarInfoProductos(valores)
                            }}
                            >

                                {props =>{
                                    return (

                               
                            <form 
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
                            >
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre Producto"
                                    value={props.values.nombre}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.nombre && props.errors.nombre ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.nombre}</p>
                                        </div>
                                    ):null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                        Cantidad Disponible
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="existencia"
                                    type="number"
                                    placeholder="Cantidad Disponible"
                                    value={props.values.existencia}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.existencia && props.errors.existencia ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.existencia}</p>
                                        </div>
                                    ):null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                        Precio
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    type="number"
                                    placeholder="Precio Producto"
                                    value={props.values.precio}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.precio && props.errors.precio ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.precio}</p>
                                        </div>
                                    ):null}
                                <input 
                                    type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
                                    value="Editar Producto"
                                 />
                            </form>
                                 )
                                }}
                            </Formik>
                        </div>
                </div>
        </Layout>
        
      );
}
 
export default EditarProducto;