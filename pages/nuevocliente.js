import React,{useState} from 'react';
import Layout from '../components/Layout';
import {useFormik} from "formik"
import * as Yup from "yup"
import {gql,useMutation} from "@apollo/client"
import {useRouter} from "next/router"

const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input :ClienteInput){
        nuevoCliente(input :$input){
        id
        nombre
        apellido
        empresa
        email
        telefono
        
        }
    }
`

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

const NuevoCliente = () => {


    //routing

    const router = useRouter()

    //Mensajes de alerta

    const [mensaje,guardarMensaje] = useState(null)


    //Mutation para agregar Nuevo Cliente

    const [nuevoCliente] = useMutation(NUEVO_CLIENTE,{
        update(cache,{data :{nuevoCliente}}){
            //obtener el objeto de cache que deseamos actualizar
            const {obtenerClientesVendedor} = cache.readQuery({query: OBTENER_CLIENTES_USUARIO});

            //Reescribimos el cache, no se debe modificar 

            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data:{
                    obtenerClientesVendedor:[...obtenerClientesVendedor, nuevoCliente]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues :{
            nombre:"",
            apellido:"",
            empresa:"",
            email:"",
            telefono:""
        },
        validationSchema:Yup.object({
            nombre :Yup.string()
                        .required("El nombre es Obligatorio"),
            apellido: Yup.string()
                        .required("El apellido es Obligatorio"),
            empresa : Yup.string()
                        .required("El nombre de la empresa  es Obligatorio"),
            email : Yup.string()
                        .email("El email NO es valido")
                        .required("El email es Obligatorio"),
            

        }),
        onSubmit: async valores =>{
            const {nombre,apellido,empresa,email,telefono} = valores
            //console.log(valores)
           
            //console.log(data)
            try{

                const {data} = await nuevoCliente({
                    variables:{
                        input:{
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                })

                //console.log(data.nuevoCliente)
                router.push("/")

            }catch(error){
                guardarMensaje(error.message)

                setTimeout(() => {
                    guardarMensaje(null)
                }, 2000);
            }
        }

    })

    const mostrarMensaje =()=>{
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }
    return ( 
        <Layout>
                    <h1  className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
                    {mensaje && mostrarMensaje()}
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
                                    placeholder="Nombre Cliente"
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                        Apellido
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Cliente"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                    {formik.touched.apellido && formik.errors.apellido ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.apellido}</p>
                                        </div>
                                    ):null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                        Empresa
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="empresa"
                                    type="text"
                                    placeholder="Empresa Cliente"
                                    value={formik.values.empresa}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                    {formik.touched.empresa && formik.errors.empresa ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.empresa}</p>
                                        </div>
                                    ):null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email Cliente"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                      {formik.touched.email && formik.errors.email ?(
                                        <div className="my-2 bg-red-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                        </div>
                                    ):null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                        Telefono
                                    </label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="telefono"
                                    type="tel"
                                    placeholder="Telefono Cliente"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}


                                   
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
                                    value="Registrar Cliente"
                                 />
                            </form>

                        </div>
                    </div>

        </Layout>
     );
}
 
export default NuevoCliente;