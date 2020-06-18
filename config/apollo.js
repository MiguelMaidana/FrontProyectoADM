import {ApolloClient,createHttpLink, InMemoryCache} from "@apollo/client"
import fetch from "node-fetch"
import {setContext} from "apollo-link-context"

const httplink = createHttpLink({
    uri: 'https://floating-temple-79644.herokuapp.com/',
    
        fetch
});

const authLink = setContext((_,{headers}) =>{

    //leer el storage almacenado

    const token = localStorage.getItem('token')
    return {
        headers :{
            ...headers,
            authorization : token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httplink)
})

export default client