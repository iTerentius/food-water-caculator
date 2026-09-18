import { createContext, useContext } from 'react'

export const PortalContext = createContext(null)
export const usePortalTarget = () => useContext(PortalContext) ?? document.body
