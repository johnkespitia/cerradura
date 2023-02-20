import React, { useState } from "react";
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup";
import { FormGroup, Button, FormControl, Card, FormLabel, FormText } from 'react-bootstrap'
import axios from 'axios'
import { login } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import { redirect } from 'react-router-dom'


const LoginPage = () => {
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address").required("Required")
    ,
    password: Yup.string().required("Required")
  });

  const handleAutofillChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value

    })
  }
  const handleSubmit = async (values, { setSubmitting }) => {
    setFormValues(values);
    try {
        const res = await axios.post(process.env.REACT_APP_USER_API_URL + "/login", formValues)
        dispatch(login(res.data))
        return redirect("/");
    }catch (e){
      console.log(e)
    }
    setSubmitting(false)
  };

  return <Card style={{
    maxWidth: "40%",
    justifySelf:"center",
    alignSelf:"center",
    margin: "auto",
  }}>
    <Card.Header className={"text-center text-uppercase"}><h3>{ `Iniciar Sesión en ${process.env.REACT_APP_NAME}` }</h3></Card.Header>
    <Card.Body>
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" controlId="login-form">
            <FormLabel>Email address</FormLabel>
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
            <FormText className="text-muted">
              We'll never share your email with anyone else.
            </FormText>
            <FormControl.Feedback type="invalid">
              {errors.email}
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              as={Field}
              type="password"
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
          </FormGroup>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
    </Card.Body>
  </Card>
}

export default LoginPage