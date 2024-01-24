import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const VisibilityFilter = () => {
	const dispatch = useDispatch()


	const handleFilterChange = (event) => {
		console.log(event.target.value)
		dispatch(filterChange(event.target.value))
	}

 
	return(
		<p>filter <input onChange={handleFilterChange}/></p> 
	)
  
  

}

export default VisibilityFilter