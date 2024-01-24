import { useSelector } from 'react-redux'



const Notification = () => {
 

	const notification = useSelector(({notifications})=>{
		return(notifications.content)

	})

	console.log(notification)

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}


	if(notification !== null){
		return (
			<div style={style}>
				{notification}
			</div>
		)
	}
}

export default Notification