import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { get, save } from '../../store/PermissionSlice'
import CreateButton from '../../components/CreateButton'
import List from './List'
import ModalOption from '../../components/Modal'
import FormGuard from './Form'
import ToastAlerts from '../../components/ToastAlerts'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdError } from 'react-icons/md'

const GuardPage = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [guardEditable, setGuardEditable] = useState({  })
  const [toastData, setToastData] = useState({ title:"", message:"", variant:"success" })
  const [showToast, setShowToast] = useState( false )
  const closeModal = ()=> {
    setShow(false)
  }
  const configs = useMemo(()=>({
    headers:{
      'content-type': 'application/json',
      'Authorization': `Bearer ${userState.user.token}`
    }
  }), [userState])

  const getData = useCallback(async ()=>{
    const response = await axios.get(process.env.REACT_APP_USER_API_URL + "/permission", configs)

    dispatch(get(response.data))
  },[dispatch, configs])

  useEffect(()=>{
    setLoading(true)
    let promise = getData(userState.user.token)
    promise.then(()=>{
      setLoading(false)
    })
  },[getData,userState.user.token])

  const newGuardForm = () => {
    setShow(true)
    setGuardEditable({})
  }
  const handleEdit = (guard) => {
    setShow(true)
    setGuardEditable(guard)
  }

  const store = async (formData) => {
    try {
      let res = null
      if(guardEditable.id === undefined){
        res = await axios.post(process.env.REACT_APP_USER_API_URL + "/permission", formData,configs)
      }else{
        res = await axios.put(process.env.REACT_APP_USER_API_URL + `/permission/${guardEditable.id}`, formData,configs)
      }
      dispatch(save(res.data))
      getData().then(()=>{
        setToastData({
          title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
          message: 'Proceso ejecutado satisfactoriamente!',
          variant: 'success',
        })
        setShowToast(true)
        setShow(false)
      })
    }catch (e){
      setToastData({
        title: <><MdError className={"text-danger fs-4"} /> El Cambio no fue exitoso</>,
        message: 'Se presentó un error en el proceso!',
        variant: 'danger',
      })
      setShowToast(true)
      console.log(e)
    }
  }

  return <>
  <h3 className={"mb-4 mt-2"}>Permisos en Aplicaciones</h3>
    <hr />
    <List loading={loading} handleEdit={handleEdit}/>
    <CreateButton clickEvent={newGuardForm}/>
    <ModalOption show={show} setClose={closeModal} title={"Administrar Permisos de Aplicación"}>
      <FormGuard {...guardEditable} handleSubmit={store} />
    </ModalOption>
    <ToastAlerts {...toastData} show={showToast} setShowToast={setShowToast}/>
  </>
}

export default GuardPage