import React, { FC } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

interface ExchangeRate {
    currency: string
    rate: string
    name: string
}

interface ExchangeRateData {
    rates: ExchangeRate[]
}

const EXCHANGE_RATES = gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`

const ExchangeRates: FC = () => {
    const { loading, error, data } = useQuery<ExchangeRateData>(EXCHANGE_RATES)

    if (loading || !data || !data.rates) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error :(</p>
    }

    return (
        <>
            {data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                    <p>
                        {currency}: {rate}
                    </p>
                </div>
            ))}
        </>
    )
}

export default ExchangeRates
