import CartAtionTypes from "./action-types";

const initialState = {
    products: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartAtionTypes.ADD_PRODUCT:
            // verificar se o produto já está no carrinho
            const productsIsAlreadyInCart = state.products.some(
                (product) => product.id === action.payload.id
            )
    
            // se ele estiver, aumentar a sua quantidade em 1
            if(productsIsAlreadyInCart) {
                return {
                    ...state,
                    products: state.products.map((product) =>
                        product.id === action.payload.id
                            ? { ...product, quantity: product.quantity + 1}
                            : product
                    ),
                }
            }

            // se nao estiver, adicioná-lo
            return {
                ...state,
                products: [...state.products, { ...action.payload, quantity: 1}],
            }
        
        case CartAtionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
            }

        case CartAtionTypes.INCREASE_PRODUCT_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload
                    ? {...product, quantity: product.quantity + 1}
                    : product
                )
            }

        case CartAtionTypes.DECREASE_PRODUCT_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload
                    ? {...product, quantity: product.quantity - 1}
                    : product
                )
                .filter(product => product.quantity > 0),
            }

        default:
            return state;
    }
}

export default cartReducer
