import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

const   FormAddSuperior = (props) => {
  const accountsState = useSelector((state) => state.accounts)
  const [formValues, setFormValues] = useState({});
  const validationSchema = Yup.object().shape({
    superior: Yup.string().required("Valor requerido")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await   props.handleSubmit(values, props.accountId)
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
        <FormGroup className="mb-3" controlId="superior-account-form">
          <FormLabel>Superior</FormLabel>
          <Field
            name="superior"
            isInvalid={touched.superior && !!errors.superior}
          >
            {({ field, form }) => (
              <select
                className={"form-control"}
                value={field.value}
                controlid="superior"
                placeholder="Superior"
                autoComplete={"off"}
                onChange={(event) => {
                  form.setFieldValue(field.name, event.target.value);
                }}
              >
                <option value={""}>Seleccione...</option>
                {accountsState !== undefined && accountsState.accounts.map((g, idx)=> (<option key={`opti-${idx}`} value={g.id}>{g.name} ({g.email})</option>))}
              </select>
            )}
          </Field>
          <FormControl.Feedback type="invalid">
            {errors.superior}
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

export default FormAddSuperior