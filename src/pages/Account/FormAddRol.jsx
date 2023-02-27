import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

const   FormAddRol = (props) => {
  const rolesState = useSelector((state) => state.roles)
  const [formValues, setFormValues] = useState({});
  const validationSchema = Yup.object().shape({
    rol: Yup.string().required("Valor requerido")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await props.handleSubmit(values, props.accountId)
    setSubmitting(false)
    props.setShow(false)
  }

  return <Formik
    initialValues={formValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ handleSubmit, isSubmitting, errors, touched }) => (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="rol-account-form">
          <FormLabel>Rol</FormLabel>
          <Field
            name="rol"
            isInvalid={touched.rol && !!errors.rol}
          >
            {({ field, form }) => (
              <select
                className={"form-control"}
                value={field.value}
                controlid="rol"
                placeholder="Rol"
                autoComplete={"off"}
                onChange={(event) => {
                  form.setFieldValue(field.name, event.target.value);
                }}
              >
                {rolesState !== undefined && rolesState.roles.map((g, idx)=> (<option key={`opti-${idx}`} value={g.id}>{g.guard_name}:{g.name}</option>))}
              </select>
            )}
          </Field>
          <FormControl.Feedback type="invalid">
            {errors.rol}
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

export default FormAddRol