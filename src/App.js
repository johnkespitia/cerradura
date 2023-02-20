import { GetRoutes } from './routes'
import Layout from './components/Layout'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {  mydata } from './store/userSlice'

function App() {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const getData = useCallback(async (token)=>{
    const response = await axios.get(process.env.REACT_APP_USER_API_URL + "/my-account", {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    dispatch(mydata(response.data))
  },[dispatch])

  useEffect( ()=>{
    if(userState.user != null && userState.user.hasOwnProperty("token")  && userState.user.data === undefined){
      getData(userState.user.token)
    }
  },[userState, getData])
  return (
    <Layout>
        <GetRoutes />
    </Layout>
  );
}

export default App;
