import { gql } from "apollo-boost"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

interface UserInfo {
    firstName: string
    lastName: string
}

const GET_USER_INFO = gql`
    query getUserInfo {
        firstName @client
        lastName @client
    }
`

export const useGetUserInfo = () => useQuery<UserInfo>(GET_USER_INFO)

export const useSetUserInfo = () => {
    const client = useApolloClient()
    return (firstName: string, lastName: string) => {
        client.writeData({ data: { firstName, lastName } })
    }
}
