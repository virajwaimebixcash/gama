const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    },
}


export const CreateRebalanceDetailDataReducer = (newState = state, action) => {

    switch (action.type) {
        case "ADD_REBALANCE_DETAIL_DATA_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:[]
        }

        case "ADD_REBALANCE_DETAIL_DATA_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "ADD_REBALANCE_DETAIL_DATA_FAILURE": return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: action.payload
            }
        }
        
        default: return newState
    }
}