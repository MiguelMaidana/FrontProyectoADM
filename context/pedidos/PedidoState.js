import React,{useReducer} from "react"
import PedidoContext from "./PedidoContext"
import PedidoReducer from "./PedidoReducer"
import {SELECCIONAR_CLIENTE,SELECCIONAR_PRODUCTO,CANTIDAD_PRODUCTOS} from "../../types"

const PedidoState =({children})=>{

    //State de Pedidos
    const initialState ={
        cliente:{},
        productos:[],
        total:0
    }

    const [state,dispatch] = useReducer(PedidoReducer,initialState)

    //Modifica el cliente

    const agregarCliente =(cliente)=>{
        //console.log(cliente)
        dispatch({
            type : SELECCIONAR_CLIENTE,
            payload : cliente
        })

    }

    //Modifica los productos

    const agregarProducto = (productos)=>{
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: productos
        })
    }

   
    return(
        <PedidoContext.Provider
        value={{
            agregarCliente,
            agregarProducto
        }}
        >{children}

        </PedidoContext.Provider>
    )
}

export default PedidoState