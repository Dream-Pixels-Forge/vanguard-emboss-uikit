import React from 'react'

type Direction = 'ltr' | 'rtl'

const DirectionContext = React.createContext<Direction | undefined>(undefined)

export interface DirectionProviderProps {
  children: React.ReactNode
  dir?: Direction
}

export function DirectionProvider({
  children,
  dir = 'ltr',
}: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection(): Direction {
  const ctx = React.useContext(DirectionContext)
  if (ctx === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider. Wrap your app with <DirectionProvider>.')
  }
  return ctx
}
