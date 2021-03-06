import React, { FC } from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { makeStyles } from "@material-ui/core"
import UserInfo from "./UserInfo"

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
    uri: "http://localhost:4000",
    resolvers: {}
})
client.writeData({ data: { firstName: "Keith", lastName: "Hamm" } })

const App: FC = () => {
    const classes = useStyles()

    return (
        <ApolloProvider client={client}>
            <div className={classes.app}>
                <UserInfo />
            </div>
        </ApolloProvider>
    )
}

export default App
