import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { get } from '../../store/PermissionSlice'
import { Accordion, Button,  Spinner, Table } from 'react-bootstrap'
import { CiCircleRemove } from 'react-icons/ci'
import FormAddPermission from './FormAddPermission'

const PermissionList = (props) => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

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
    let promise = getData()
    promise.then(()=>{
      setLoading(false)
    })
  },[getData,userState.user.token])

  return <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Asignar permiso al rol</Accordion.Header>
        <Accordion.Body>
          <FormAddPermission handleSubmit={props.addPermission} rol={props.rol}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Table striped bordered hover responsive className={"mt-3"}>
    <thead>
    <tr>
      <th>ID</th>
      <th>Aplicación</th>
      <th>Permiso</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    {props.rol !== undefined && props.rol.permissions.map((g, idx)=>(<tr key={idx}>
      <td>{g.id}</td>
      <td>{g.guard_name}</td>
      <td>{g.name}</td>
      <td>
      <ButtonDelete r={props.rol} p={g} removeRol={props.removeRol} />
      </td>
    </tr>))}
    </tbody>
  </Table>
    </>
}

const ButtonDelete = (props) => {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const deleteRol = async (evt) => {
    setLoadingDelete(true)
    await props.removeRol(evt.target.dataset.rolid,evt.target.dataset.permissionid)
    setLoadingDelete(false)
  }
  return <Button variant={"danger"} size={"sm"} data-rolid={props.r.id} data-permissionid={props.p.name}
            style={{ fontSize: '1.1rem' }} onClick={deleteRol} disabled={loadingDelete}>

      {!loadingDelete && <CiCircleRemove data-rolid={props.r.id}
                                            data-permissionid={props.p.name}
                                            style={{ fontSize: '2rem' }} />}
      {loadingDelete && <Spinner />}
    </Button>
}

export default PermissionList