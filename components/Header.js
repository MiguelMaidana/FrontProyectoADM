import React from 'react';
import {useQuery,gql} from "@apollo/client"
import{useRouter} from "next/router"

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`

const Header = () => {

    const router = useRouter()

    //query de Apollo

    const {data,loading,error,client} = useQuery(OBTENER_USUARIO)
    // console.log(data)
    // console.log(loading)
    // console.log(error)
     //console.log(client)


    //Proteger que no accedamos a data antes de tener resulatados

    if(loading) return null

    //Si no hay informacion
    if(!data) {
        router.push("/login")
    }

    const cerrarSesion =() =>{
        client.clearStore()
        localStorage.removeItem('token')
        router.push("/login")
        
    }

    const {nombre,apellido} = data.obtenerUsuario
    return ( 
        <div className="sm:flex sm:justify-between mb-10">
            <p className="mr-2 mb-5 lg:mb-0">Hola : {nombre} {apellido}</p>

            <button 
            onClick={()=>cerrarSesion()}
            type="button" 
            className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Cerrar Sesion
            </button>

        </div> 
    );
}
 
export default Header;