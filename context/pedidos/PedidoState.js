import React,{useReducer} from "react"
import PedidoContext from "./PedidoContext"
import PedidoReducer from "./PedidoReducer"
import {SELECCIONAR_CLIENTE,SELECCIONAR_PRODUCTO,CANTIDAD_PRODUCTOS} from "../../types"

const PedidoState =({children})=>{

    //State de Pedidos
    const initialState ={
        cliente:[],
        producto:[],
        total:0
    }

    const [state,dispatch] = useReducer(PedidoReducer,initialState)

    const holaMundoenuseReducer =()=>{
        console.log("Hola Mundo")
    }
    return(
        <PedidoContext.Provider
        value={{
            holaMundoenuseReducer
        }}
        >{children}

        </PedidoContext.Provider>
    )
}

export default PedidoState