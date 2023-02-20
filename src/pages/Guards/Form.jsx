import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'

const FormGuard = (props) => {
  const [formValues, setFormValues] = useState({
    name: props.name,
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Valor requerido").max(20, "Nombre debe ser máximo de 20 caracteres")
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

            <Button variant="success" type="submit" disabled={isSubmitting}>
              Almacenar
            </Button>
          </Form>
        )}
      </Formik>

}

export default FormGuard