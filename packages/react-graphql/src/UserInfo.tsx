import React, { FC, useState, ChangeEvent } from "react"
import { useGetUserInfo, useSetUserInfo } from "./Store"

const UserInfo: FC = () => {
    const { loading, error, data } = useGetUserInfo()
    const setUserInfo = useSetUserInfo()
    const [newFirstName, setNewFirstName] = useState<string>("")
    const [newLastName, setNewLastName] = useState<string>("")

    if (loading || !data) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error :(</p>
    }

    const updateFirstName = (event: ChangeEvent<HTMLInputElement>) => setNewFirstName(event.target.value)
    const updateLastName = (event: ChangeEvent<HTMLInputElement>) => setNewLastName(event.target.value)
    const submit = () => {
        setUserInfo(newFirstName, newLastName)
        setNewFirstName("")
        setNewLastName("")
    }

    return (
        <>
            <p>First Name {data.firstName}</p>
            <p>Last Name {data.lastName}</p>

            <input value={newFirstName} onChange={updateFirstName} style={{ marginBottom: 16 }} />
            <input value={newLastName} onChange={updateLastName} style={{ marginBottom: 16 }} />
            <button onClick={submit}>SUBMIT</button>
        </>
    )
}

export default UserInfo