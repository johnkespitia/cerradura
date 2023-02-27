import { Badge, Button, Container, Spinner, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BiCheckboxChecked, BiErrorCircle, BiPlus } from 'react-icons/bi'
import FormAddRol from './FormAddRol'
import PopoverWrapper from '../../components/Popover'
import FormAddSuperior from './FormAddSuperior'
import { CiCircleRemove } from 'react-icons/ci'
import React, { useState } from 'react'

const List =(props) =>{
  const accountState = useSelector((state) => state.accounts)
  const handleEdit = (evt) => {
    const indexGuard = evt.target.dataset.index;
    props.handleEdit(accountState.accounts[indexGuard])
  }

  const deleteRol = async (rolid, userid) => {
    await props.removeRol(rolid,userid)
  }

  const deleteSuperior = async (superiorid,userid) => {
    await props.removeSuperior(superiorid,userid)
  }

  if(props.loading){
    return <Container className={"text-center justify-content-center"}>
      <Spinner className={"text-center"} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  }
  return <Table striped bordered hover responsive>
    <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Email</th>
      <th>Roles</th>
      <th>Superiores</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    {accountState !== undefined && accountState.accounts.map((g, idx)=>(<tr key={idx}>
      <td>{g.id}</td>
      <td>{g.name}</td>
      <td>{g.email}</td>
      <td>
        {g.roles.map((r, idx)=>
          <React.Fragment key={`rol-${g.id}-${r.id}-${idx}`}>{" "}
            <ButtonRolDelete r={r} u={g} removeRol={deleteRol} />
            </React.Fragment>
            )}
        {" "}
        <PopoverWrapper
          caller={<BiPlus />}
          title={"Asignar nuevo rol"}
        >
          <FormAddRol  handleSubmit={props.addRol} accountId={g.id}/>
        </PopoverWrapper>

      </td>
      <td>
        {g.superior.map((r, idx)=>
          <React.Fragment key={`sup-${g.id}-${r.id}-${idx}`}>{" "}
            <ButtonSuperiorDelete s={r} u={g} removeSuperior={deleteSuperior} />
          </React.Fragment>
        )}
        {" "}
        <PopoverWrapper
          caller={<BiPlus />}
          title={"Asignar nuevo superior"}
        >
          <FormAddSuperior handleSubmit={props.addSuperior} accountId={g.id}/>
        </PopoverWrapper>
      </td>
      <td className={"text-center"}>
        {!!g.active && <BiCheckboxChecked className={"text-success"} style={{ fontSize:"1.7rem" }} />}
        {!g.active && <BiErrorCircle className={"text-danger"} style={{ fontSize:"1.7rem" }} />}
      </td>
      <td><Button variant={"warning"} data-index={idx} className={"text-light"} onClick={handleEdit}>Editar</Button></td>
    </tr>))}
    </tbody>
  </Table>
}

const ButtonSuperiorDelete = (props) => {
  const [loadingSupDelete, setLoadingSupDelete] = useState(false)
  const deleteSuperior = async (evt) => {
    setLoadingSupDelete(true)
    await props.removeSuperior(evt.target.dataset.superiorid,evt.target.dataset.userid)
    setLoadingSupDelete(false)
  }
  return <Badge bg="info" className={"m-1"} >{props.s.name}
    <button data-superiorid={props.s.id} data-userid={props.u.id} className={'btn btn-link btn-sm text-light'}
             style={{ fontSize: '1.1rem' }} onClick={deleteSuperior} disabled={loadingSupDelete}>

      {!loadingSupDelete && <CiCircleRemove data-superiorid={props.s.id}
                       data-userid={props.u.id}
                       style={{ fontSize: '2rem' }} />}
      {loadingSupDelete && <Spinner />}
    </button>
  </Badge>
}

const ButtonRolDelete = (props) => {
  const [loadingRolDelete, setLoadingRolDelete] = useState(false)
  const deleteRol = async (evt) => {
    setLoadingRolDelete(true)
    await props.removeRol(evt.target.dataset.rolid,evt.target.dataset.userid)
    setLoadingRolDelete(false)
  }
  return <Badge bg="secondary" className={"m-1"} >{props.r.guard_name}:{props.r.name}
    <button data-rolid={props.r.id} data-userid={props.u.id} className={'btn btn-link btn-sm text-light'}
            style={{ fontSize: '1.1rem' }} onClick={deleteRol} disabled={loadingRolDelete}>

      {!loadingRolDelete && <CiCircleRemove data-rolid={props.r.id}
                                            data-userid={props.u.id}
                                            style={{ fontSize: '2rem' }} />}
      {loadingRolDelete && <Spinner />}
    </button>
  </Badge>
}

export default List