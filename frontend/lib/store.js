import React, { useEffect, createContext, useContext, useReducer } from 'react'

export const StoreContext = createContext()

// Hook for child components to use
export const useStore = () => {
    return useContext(StoreContext)
}

// Initial state values
const initialState = {
    saved: [],
}

// Persisted state values from localStorage
const persistedState =
    typeof window !== 'undefined' &&
    JSON.parse(window.localStorage['persistedState'] || '{}')

// Store reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SAVED': {
            return { ...state, saved: [...state.saved, action.value] }
        }
        case 'REMOVE_SAVED': {
            return {
                ...state,
                saved: state.saved.filter(x => x !== action.value),
            }
        }
        case 'TOGGLE_SAVED': {
            return {
                ...state,
                saved: state.saved.includes(action.value)
                    ? state.saved.filter(x => x !== action.value)
                    : [...state.saved, action.value],
            }
        }
    }

    return state
}

// Helper function to log state changes
const logger = reducer => {
    const reducerWithLogger = (state, action) => {
        console.log()
        console.log(
            '%cPrevious State:',
            'color: #9E9E9E; font-weight: 700;',
            state
        )
        console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action)
        console.log(
            '%cNext State:',
            'color: #47B04B; font-weight: 700;',
            reducer(state, action)
        )
        return reducer(state, action)
    }

    return reducerWithLogger
}

// Provider component that wraps your app and makes the store object
// available to any child component that calls useStore()
export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(logger(reducer), {
        ...initialState,
        ...persistedState,
    })
    const value = { state, dispatch }

    // Persist any state we want to keep
    useEffect(() => {
        window.localStorage['persistedState'] = JSON.stringify({
            saved: state.saved,
        })
    }, [state])

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}

// Consumer component for our StoreContext
export const StoreConsumer = StoreContext.Consumer

// HOC to supply component with useStore
export const withStore = WrappedComponent => {
    const Wrapper = props => {
        const store = useStore()
        return <WrappedComponent store={store} {...props} />
    }

    return Wrapper
}
