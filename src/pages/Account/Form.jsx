import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormGroup, FormLabel, FormCheck, Spinner } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

const FormApp = (props) => {
  const rolesState = useSelector((state) => state.roles)
  const accountsState = useSelector((state) => state.accounts)
  const [formValues, setFormValues] = useState({
    name: props.name,
    email: props.email,
    active: props.active,
    rol: (props.roles && props.roles.length>0 )?props.roles[0].id:null,
    superior: (props.superior && props.superior.length>0 )?props.superior[0].id:null,
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Valor requerido").max(20, "Nombre debe ser máximo de 20 caracteres"),
    email: Yup.string().email().required("Valor requerido"),
    password:  (props.id === undefined)?Yup.string()
      .required('El campo de contraseña es obligatorio')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'):Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation:(props.id === undefined)?Yup.string()
      .required('El campo de verificación de contraseña es obligatorio')
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'):Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir') ,
    active: Yup.bool().required("Valor requerido"),
  });
  const handleAutofillChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (values, { setSubmitting }) => {
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
    {({ handleSubmit, isSubmitting, errors, touched, values }) => (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="name-account-form">
          <FormLabel>Nombre</FormLabel>
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

        <FormGroup className="mb-3" controlId="email-account-form">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            as={Field}
            name="email"
            controlid="email"
            placeholder="Email"
            autoComplete={"off"}
            onInput={handleAutofillChange}
            isInvalid={touched.email && !!errors.email}
          />
          <FormControl.Feedback type="invalid">
            {errors.email}
          </FormControl.Feedback>
        </FormGroup>

        <FormGroup className="mb-3" controlId="pass-account-form">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            as={Field}
            name="password"
            controlid="password"
            placeholder="Password"
            autoComplete={"off"}
            onInput={handleAutofillChange}
            isInvalid={touched.password && !!errors.password}
          />
          <FormControl.Feedback type="invalid">
            {errors.password}
          </FormControl.Feedback>
        </FormGroup><FormGroup className="mb-3" controlId="passval-account-form">
          <FormLabel>Verificación de Password</FormLabel>
          <FormControl
            type="password"
            as={Field}
            name="password_confirmation"
            controlid="password_confirmation"
            placeholder="Verificación de Password"
            autoComplete={"off"}
            onInput={handleAutofillChange}
            isInvalid={touched.password_confirmation && !!errors.password_confirmation}
          />
          <FormControl.Feedback type="invalid">
            {errors.password_confirmation}
          </FormControl.Feedback>
        </FormGroup>

        <FormGroup className="mb-3" controlId="active-account-form">
          <FormLabel>Estado</FormLabel>
          <Field name="active">
            {({ field, form }) => (
              <FormCheck
                {...field}
                type="switch"
                id="active"
                name="active"
                controlid="active"
                placeholder="active"
                value={field.value}
                defaultChecked={field.value!==0}
                onChange={(event) => {
                  form.setFieldValue(event.target.name, event.target.checked);
                }}
                autoComplete={"off"}
                onInput={handleAutofillChange}
                isInvalid={touched.active && !!errors.active}
              />
            )}
          </Field>
          <FormControl.Feedback type="invalid">
            {errors.active}
          </FormControl.Feedback>
        </FormGroup>

        <FormGroup className="mb-3" controlId="rol-account-form">
          <FormLabel>Rol Inicial</FormLabel>
          <Field
            name="rol"
            isInvalid={touched.rol && !!errors.rol}
          >
            {({ field, form }) => (
              <select
                className={"form-control"}
                value={field.value}
                controlid="rol"
                placeholder="Rol Inicial"
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

        <FormGroup className="mb-3" controlId="rol-account-form">
          <FormLabel>Superior Inicial</FormLabel>
          <Field
            name="superior"
            isInvalid={touched.superior && !!errors.superior}
          >
            {({ field, form }) => (
              <select
                className={"form-control"}
                value={field.value}
                controlid="rol"
                placeholder="Rol Inicial"
                autoComplete={"off"}
                onChange={(event) => {
                  form.setFieldValue(field.name, event.target.value);
                }}
              >
                <option value={""}>Sin Superior</option>
                {accountsState !== undefined && accountsState.accounts.map((g, idx)=> (<option key={`opti-${idx}`} value={g.id}>{g.name}  ({g.email})</option>))}
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

export default FormApp