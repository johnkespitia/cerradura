import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

const FormApp = (props) => {
  const guardState = useSelector((state) => state.guard)
  const [formValues, setFormValues] = useState({
    name: props.name,
    guard_name: props.guard_name
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Valor requerido").max(20, "Nombre debe ser máximo de 20 caracteres"),
    guard_name: Yup.string().required("Valor requerido")
  });
  const handleAutofillChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setFormValues(values)
    props.handleSubmit(values)
    setSubmitting(false)
  }

  return <Formik
    initialValues={formValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ handleSubmit, isSubmitting, errors, touched }) => (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="login-form">
          <FormLabel>Nombre Rol</FormLabel>
          <FormControl
            type="text"
            as={Field}
            name="name"
            controlid="name"
            placeholder="Nombre"
            autoComplete={"off"}
            onInput={handleAutofillChange}
            isInvalid={touched.name && !!errors.name}
          />
          <FormControl.Feedback type="invalid">
            {errors.name}
          </FormControl.Feedback>
        </FormGroup>

        <FormGroup className="mb-3" controlId="login-form">
          <FormLabel>Aplicación</FormLabel>
          <Field
            name="guard_name"
          >
            {({ field, form }) => (
              <select
                className={"form-control"}
                value={field.value}
                controlid="guard_name"
                placeholder="Aplicación"
                autoComplete={"off"}
                isInvalid={touched.name && !!errors.name}
                onChange={(event) => {
                  form.setFieldValue(field.name, event.target.value);
                }}
              >
                {guardState !== undefined && guardState.guard.map((g, idx)=> (<option key={`opti-${idx}`} value={g.name}>{g.name}</option>))}
              </select>
            )}
        </Field>
          <FormControl.Feedback type="invalid">
            {errors.name}
          </FormControl.Feedback>
        </FormGroup>

        <Button variant="success" type="submit" disabled={isSubmitting}>
          Almacenar
        </Button>
      </Form>
    )}
  </Formik>

}

export default FormApp