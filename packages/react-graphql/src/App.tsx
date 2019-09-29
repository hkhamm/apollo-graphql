import React from "react"
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    app: {
        textAlign: "center",
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "white"
    }
})

const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io"
})

const EXCHANGE_RATES = gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`

const App: React.FC = () => {
    const classes = useStyles()
    return (
        <ApolloProvider client={client}>
            <div className={classes.app}></div>
        </ApolloProvider>
    )
}

export default App
