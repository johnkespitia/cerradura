import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

const FormGuard = (props) => {
  const guardState = useSelector((state) => state.guard)
  const [formValues, setFormValues] = useState({
    name: props.name,
    guard_name: props.guard_name,
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

  const handleSubmit = async (values, { setSubmitting , isSubmitting}) => {
    setSubmitting(true)
    setFormValues(values)
    await props.handleSubmit(values)
    setSubmitting(false)
  }

  return <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting, errors, touched }) =>
        {
          return <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" controlId="login-form">
              <FormLabel>Nombre Aplicación</FormLabel>
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
            <FormGroup className="mb-3" controlId="guard-name-account-form">
              <FormLabel>Aplicación</FormLabel>
              <Field
                name="guard_name"
                isInvalid={touched.guard_name && !!errors.guard_name}
              >
                {({ field, form }) => (
                  <select
                    className={"form-control"}
                    value={field.value}
                    controlid="guard_name"
                    placeholder="Aplicación"
                    autoComplete={"off"}
                    onChange={(event) => {
                      form.setFieldValue(field.name, event.target.value);
                    }}
                  >
                    {guardState !== undefined && guardState.guard.map((g, idx)=> (<option key={`opti-${idx}`} value={g.name}>{g.name}</option>))}
                  </select>
                )}
              </Field>
              <FormControl.Feedback type="invalid">
                {errors.guard_name}
              </FormControl.Feedback>
            </FormGroup>
            {isSubmitting && <Spinner />}
            <Button variant="success" type="submit" disabled={isSubmitting}>
              Almacenar
            </Button>
          </Form>
        }
        }
      </Formik>

}

export default FormGuard