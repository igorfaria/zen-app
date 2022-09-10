import React from 'react'

export const ZC = React.createContext({})
export const ZenContext : any = ({children, value} : any) => {
    return (
        <ZC.Provider value={value}>
            {children}
        </ZC.Provider>
    )
}
