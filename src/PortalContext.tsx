import { createContext, useContext } from 'react'

export const PortalContext = createContext<ShadowRoot | null>(null)
export const usePortalTarget = () => useContext(PortalContext) ?? document.body
