import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { get as getRoles } from '../../store/rolesSlice'
import { get, save } from '../../store/AccountSlice'
import CreateButton from '../../components/CreateButton'
import List from './List'
import ModalOption from '../../components/Modal'
import Form from './Form'
import ToastAlerts from '../../components/ToastAlerts'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdError } from 'react-icons/md'

const Accounts = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [objEditable, setObjEditable] = useState({  })
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
    const response = await axios.get(process.env.REACT_APP_USER_API_URL + "/accounts", configs)

    dispatch(get(response.data))
  },[dispatch, configs])

  const getDataRoles = useCallback(async ()=>{
    const response = await axios.get(process.env.REACT_APP_USER_API_URL + "/rol", configs)

    dispatch(getRoles(response.data))
  },[dispatch, configs])

  useEffect(()=>{
    setLoading(true)
    let promise = getData(userState.user.token)
    promise.then(()=>{
      setLoading(false)
    })
    setLoading(true)
    promise = getDataRoles(userState.user.token)
    promise.then(()=>{
      setLoading(false)
    })
  },[getData, getDataRoles,userState.user.token])

  const newAccontsForm = () => {
    setShow(true)
    setObjEditable({})
  }
  const handleEdit = (obj) => {
    setShow(true)
    setObjEditable(obj)
  }
  const addRol= async (values, id)=>{
    let res = await axios.post(process.env.REACT_APP_USER_API_URL + "/accounts/role/" + id, values,configs)
    dispatch(save(res.data))
    getData().then(()=>{
      setToastData({
        title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
        message: 'Proceso ejecutado satisfactoriamente!',
        variant: 'success',
      })
      setShowToast(true)
    })
  }
  const removeRol= async (rol, id)=>{
    let res = await axios.delete(process.env.REACT_APP_USER_API_URL + `/accounts/role/${id}/${rol}` ,configs)
    dispatch(save(res.data))
    getData().then(()=>{
      setToastData({
        title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
        message: 'Proceso ejecutado satisfactoriamente!',
        variant: 'success',
      })
      setShowToast(true)
    })
  }
  const addSuperior= async (values, id)=>{
    let res = await axios.post(process.env.REACT_APP_USER_API_URL + "/accounts/superior/" + id, values,configs)
    dispatch(save(res.data))
    getData().then(()=>{
      setToastData({
        title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
        message: 'Proceso ejecutado satisfactoriamente!',
        variant: 'success',
      })
      setShowToast(true)
    })
  }
  const deleteSuperior= async (superior, id)=>{
    let res = await axios.delete(process.env.REACT_APP_USER_API_URL + `/accounts/superior/${id}/${superior}`,configs)
    dispatch(save(res.data))
    getData().then(()=>{
      setToastData({
        title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
        message: 'Proceso ejecutado satisfactoriamente!',
        variant: 'success',
      })
      setShowToast(true)
    })
  }
  const store = async (formData) => {
    try {
      let res = null
      if(formData.superior === null){
        delete formData.superior
      }
      if(objEditable.id === undefined){
        res = await axios.post(process.env.REACT_APP_USER_API_URL + "/accounts", formData,configs)
      }else{
        if(formData.password === null){
          delete formData.password
          delete formData.password_confirmation
        }
        res = await axios.put(process.env.REACT_APP_USER_API_URL + `/accounts/${objEditable.id}`, formData,configs)
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
    <h3 className={"mb-4 mt-2"}>Cuentas de Usuario</h3>
    <hr />
    <List loading={loading} handleEdit={handleEdit} addRol={addRol} addSuperior={addSuperior} removeRol={removeRol} removeSuperior={deleteSuperior}/>
    <CreateButton clickEvent={newAccontsForm}/>
    <ModalOption show={show} setClose={closeModal} title={"Administrar Cuenta de Usuario"}>
      <Form {...objEditable} handleSubmit={store} />
    </ModalOption>
    <ToastAlerts {...toastData} show={showToast} setShowToast={setShowToast}/>
  </>
}

export default Accounts