import { combineReducers } from 'redux'
import todos 

/* State
	{
		todos: [
			{
				id: 1,
				text: buy eggs,
				completed: false
			},
			{
				id: 2,
				text: buy milk,
				completed: true
			}
		],
			
		
		visibilityFilter:
			{
				filter: 
			}
	}

 */
const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		case 'TOGGLE_TODO':
			return state.map( todo => 
				if (todo.id === action.id) {
					return {
						...todo, 
						completed: !todo.completed
					}
				} else {
					return todo 
				}
			)
		default:
			return state
	}
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter
		default:
			return state
	}
}



const todoApp = combineReducers({
	todos,
	visibilityFilter
})

export default todoApp