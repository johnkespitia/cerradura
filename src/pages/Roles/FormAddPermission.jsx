import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

const   FormAddPermission = (props) => {
  const permissionState = useSelector((state) => state.permissions)
  const [formValues, setFormValues] = useState({});
  const [optionsList, setOptionsList] = useState([]);
  const validationSchema = Yup.object().shape({
    permission: Yup.string().required("Valor requerido")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await props.handleSubmit(values, props.rol.id)
    setSubmitting(false)
    props.setShow(false)
  }

  useEffect(()=>{
    if(permissionState !== undefined && permissionState.permissions.length> 0 ){
      let permissions = permissionState.permissions.filter((p)=>(!props.rol.permissions.some((rp)=>(rp.name===p.name)) && p.guard_name === props.rol.guard_name))
      setOptionsList(permissions)
    }
  },[permissionState])

  if(optionsList.length===0){
    return <h5 className={"text-center text-dark"}>No hay permisos para asignar!</h5>
  }

  return <Formik
    initialValues={formValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ handleSubmit, isSubmitting, errors, touched }) => (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="rol-account-form">
          <FormLabel>Permissions</FormLabel>
          <Field
            name="permission"
            isInvalid={touched.rol && !!errors.rol}
          >
            {({ field, form }) => (
              <select
                className={"form-control"}
                value={field.value}
                controlid="permission"
                placeholder="Permiso"
                autoComplete={"off"}
                onChange={(event) => {
                  form.setFieldValue(field.name, event.target.value);
                }}
              >
                <option value={""}>Seleccione un permiso</option>
                {optionsList.map((g, idx)=> (<option key={`opti-${idx}`} value={g.name}>{g.name}</option>))}
              </select>
            )}
          </Field>
          <FormControl.Feedback type="invalid">
            {errors.permission}
          </FormControl.Feedback>
        </FormGroup>

        <Button variant="success" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Almacenar
        </Button>
      </Form>
    )}
  </Formik>

}

export default FormAddPermission