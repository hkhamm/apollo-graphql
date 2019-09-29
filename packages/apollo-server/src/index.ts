import { ApolloServer, gql, IResolvers } from "apollo-server"
import axios from "axios"

interface ExchangeRateData {
    currency: string
    rates: {
        [key: string]: string
    }
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        rates(currency: String!): [ExchangeRate]
    }

    type ExchangeRate {
        currency: String
        rate: String
        name: String
    }
`

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
    Query: {
        rates: async (root, { currency }: { currency: string }) => {
            try {
                const result: { data: { data: ExchangeRateData } } = await axios.get(
                    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
                )

                const exchangeRates = result.data
                return Object.entries(exchangeRates.data.rates).map(([currency, rate]) => ({
                    currency,
                    rate
                }))
            } catch (e) {
                console.error(e)
            }
        }
    },
    ExchangeRate: {
        name: async ({ currency }: { currency: string }) => {
            try {
                const currencyData: { data: Array<{ id: string; name: string }> } = await axios.get(
                    "https://api.coinbase.com/v2/currencies"
                )

                const currencyInfo = currencyData.data.find(c => c.id.toUpperCase() === currency)
                return currencyInfo ? currencyInfo.name : null
            } catch (e) {
                console.error(e)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
