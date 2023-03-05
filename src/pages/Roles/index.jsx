import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { get, save } from '../../store/rolesSlice'
import { get as getGuards } from '../../store/guardSlice'
import CreateButton from '../../components/CreateButton'
import List from './List'
import ModalOption from '../../components/Modal'
import Form from './Form'
import ToastAlerts from '../../components/ToastAlerts'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
import PermissionList from './PermissionList'

const GuardPage = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [showPermission, setShowPermission] = useState(false)
  const [objEditable, setObjEditable] = useState({  })
  const [toastData, setToastData] = useState({ title:"", message:"", variant:"success" })
  const [showToast, setShowToast] = useState( false )
  const closeModal = ()=> {
    setShow(false)
  }
  const closeModalPermission = ()=> {
    setShowPermission(false)
  }
  const configs = useMemo(()=>({
    headers:{
      'content-type': 'application/json',
      'Authorization': `Bearer ${userState.user.token}`
    }
  }), [userState])

  const getData = useCallback(async ()=>{
    const response = await axios.get(process.env.REACT_APP_USER_API_URL + "/rol", configs)

    dispatch(get(response.data))
  },[dispatch, configs])

  const getDataGuards = useCallback(async ()=>{
    const response = await axios.get(process.env.REACT_APP_USER_API_URL + "/guard", configs)

    dispatch(getGuards(response.data))
  },[dispatch, configs])

  useEffect(()=>{
    setLoading(true)
    let promise = getData()
    promise.then(()=>{
      setLoading(false)
    })
    setLoading(true)
    promise = getDataGuards()
    promise.then(()=>{
      setLoading(false)
    })
  },[getData, getDataGuards,userState.user.token])

  const newGuardForm = () => {
    setShow(true)
    setObjEditable({})
  }
  const handleEdit = (obj) => {
    setShow(true)
    setObjEditable(obj)
  }
  const handlePermission = (obj) => {
    setShowPermission(true)
    setObjEditable(obj)
  }

  const store = async (formData) => {
    try {
      let res
      if(objEditable.id === undefined){
        res = await axios.post(process.env.REACT_APP_USER_API_URL + "/rol", formData,configs)
      }else{
        res = await axios.put(process.env.REACT_APP_USER_API_URL + `/rol/${objEditable.id}`, formData,configs)
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
    }
  }

  const removeRol = async (rol, permission) => {
    let res = await axios.post(process.env.REACT_APP_USER_API_URL + `/rol/revoke-permission/${rol}`, {
      "permission":permission
    } ,configs)
    dispatch(save(res.data))
    getData().then(()=>{
      setToastData({
        title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
        message: 'Proceso ejecutado satisfactoriamente!',
        variant: 'success',
      })
      setShowToast(true)
      setShowPermission(false)
    })
  }

  const addPermission = async (permission, rol) => {
    let res = await axios.post(process.env.REACT_APP_USER_API_URL + `/rol/grant-permission/${rol}`, permission ,configs)
    dispatch(save(res.data))
    getData().then(()=>{
      setToastData({
        title: <><AiFillCheckCircle className={"text-success fs-4"} /> Cambio Exitoso</>,
        message: 'Proceso ejecutado satisfactoriamente!',
        variant: 'success',
      })
      setShowToast(true)
      setShowPermission(false)
    })
  }

  return <>
    <h3 className={"mb-4 mt-2"}>Roles</h3>
    <hr />
    <List loading={loading} handleEdit={handleEdit} handlePermission={handlePermission}/>
    <CreateButton clickEvent={newGuardForm}/>
    <ModalOption show={show} setClose={closeModal} title={"Administrar Rol"}>
      <Form {...objEditable} handleSubmit={store} />
    </ModalOption>
    <ModalOption show={showPermission} setClose={closeModalPermission} title={"Permisos de Rol"}>
      <PermissionList rol={objEditable} removeRol={removeRol} addPermission={addPermission}/>
    </ModalOption>
    <ToastAlerts {...toastData} show={showToast} setShowToast={setShowToast}/>
  </>
}

export default GuardPage