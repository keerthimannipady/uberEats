let defaultState = {
  selectedItems: {items: [], restaurantName: ''},
};
let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let newState = {...state};

      if (action.payload.checkboxValue) {
        console.log('action.payload.checkboxValue', action.payload.price);
        console.log('ADD TO CART');

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          // restaurantName: action.payload,
          restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log('REMOVE FROM CART');
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              items => items.title != action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      console.log(newState.selectedItems, '🤞');
      return newState;
    }
    default:
      return state;
  }
};
export default cartReducer;
