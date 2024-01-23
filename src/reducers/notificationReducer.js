import { createSlice } from '@reduxjs/toolkit'





const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: null
  },
  reducers: {
    
    
    
    
    addNotification(state, action){
        state.content = action.payload
        return(state)
      
    }
    
        
    }
})


export const { addNotification } = notificationSlice.actions


export const setupNotification = (content, time) => {
  return async dispatch =>{
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(addNotification(null))
    }, time * 1000)

  }
}








export default notificationSlice.reducer