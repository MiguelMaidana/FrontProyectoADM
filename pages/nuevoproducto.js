import React from 'react';
import Layout from '../components/Layout';
import Swal from "sweetalert2"
import {useFormik} from "formik"
import * as Yup from "yup"
import {gql,useMutation} from "@apollo/client"
import {useRouter} from "next/router"

const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input:ProductoInput){
    nuevoProducto(input:$input){
        nombre
        existencia
        precio
    }
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

const NuevoProducto = () => {

    //Routing

    const router = useRouter()

    //Mutation para Nuevo Producto

    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO,{
        update(cache,{data:nuevoProducto}){
            //obtengo de cache lo que deseo actualizar 
            const {obtenerProductos} = cache.readQuery({query:OBTENER_PRODUCTOS});
            // reescribo el cache con el dato nuevo
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos :[...obtenerProductos,nuevoProducto]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues :{
            nombre :"",
            existencia :"",
            precio :""
        },
        validationSchema : Yup.object({
            nombre: Yup.string().required("El nombre del Producto es obligatorio"),
            existencia:Yup.number().required("La cantidad del articulo es obligatoria").positive("No se aceptan numeros negativos").integer("La existencia deben ser numeros enteros"),
            precio : Yup.number().required("El valor del producto es obligatorio").positive("El precio no puede ser negativo ")
        }),
        onSubmit: async valores =>{
            console.log(valores)
            const {nombre,existencia,precio} = valores
            try{
                const {data} = await nuevoProducto({
                    variables:{
                        input:{
                            nombre,
                            existencia,
                            precio
                        }
                    }
                })
                //console.log(data)
                Swal.fire(
                    "Creado",
                    "Se creo el producto correctamente",
                    "success"
                )


                //redireccionar 
                router.push("/productos")
            }catch(error){
                console.log(error)
            }

          
        }
    })
    return ( 
        <Layout>
            <h1  className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
            <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form 
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={formik.handleSubmit}
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
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.nombre && formik.errors.nombre ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.nombre}</p>
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
                                    value={formik.values.existencia}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.existencia && formik.errors.existencia ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.existencia}</p>
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
                                    value={formik.values.precio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.precio && formik.errors.precio ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.precio}</p>
                                        </div>
                                    ):null}
                                <input 
                                    type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
                                    value="Registrar Nuevo Producto"
                                 />
                            </form>
                        </div>
                </div>

        </Layout>
        );
}
 
export default NuevoProducto;