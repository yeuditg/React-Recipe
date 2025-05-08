import React, { createContext } from "react"

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    passward: string,
    email: string,
    address: string,
    phone: string
}
export type reducerType = {
    currentUser: User,
    dispatch: React.Dispatch<Action>
}
export const CurrentContext = createContext<reducerType | null>(null)
export const userIdRes = createContext<string>('')
type Action = {
    type: 'CREATE' | 'UPDATE' | 'GET' | 'REMOVE',
    new_data: User
}
export const userReducer = (current: User, action: Action) => {
    switch (action.type) {
        case 'CREATE':
            const { id, firstName, passward } = action.new_data
            return {
                id: id,
                firstName: firstName,
                lastName: '',
                passward: passward,
                email: '',
                address: '',
                phone: ''
            }
        case 'UPDATE':
            return {
                id: current.id,
                firstName: current.firstName,
                lastName: action.new_data.lastName || '',
                passward: current.passward,
                email: action.new_data.lastName || '',
                address: action.new_data.address || '',
                phone: action.new_data.phone || ''
            }
        default:
            return current
    }
}
