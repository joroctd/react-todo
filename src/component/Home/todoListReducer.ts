export const todoListReducer = (
    state: {
        data: any[];
        isLoading?: boolean;
        isError?: boolean;
    },
    action: {
        type: string;
        payload?: { 
            todos?: {id?: string; title?: string}[];
            message?: string,
            id?: string
        };
    }
) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.todos
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.message
            };
        case 'ADD':
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case 'REMOVE':
            return {
                ...state,
                data: state.data.filter(todo => todo.id !== action.payload.id)
            };
        default:
            throw new Error('Unsupported todoList action type.');
    }
};