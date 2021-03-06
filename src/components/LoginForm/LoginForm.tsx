import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import { Button, CircularProgress } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Alert from "@material-ui/lab/Alert";

import authService from "../../services/users/auth.service";

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState("ada@lovelace.test");
  const [password, setPassword] = useState("FIRSTprogrammer!");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);

    authService
      .login(email, password)
      .then(() => {
        setLoading(false);
        history.push("/");
        window.location.reload();
      })
      .catch((error: any) => {
        if (!error.response) {
          setErrorMessage("Server error. Please contact administrator.");
        } else {
          setErrorMessage(error.response.data);
        }
      })
      .finally(() => setLoading(false));
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <div className="LoginForm" data-testid="LoginForm">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Row className="justify-content-center">
            <VpnKeyIcon style={{ fontSize: 100 }} />
          </Row>
          <Card.Title>Welcome to EPS!</Card.Title>

          <Card.Text>Please login in order to continue.</Card.Text>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {!loading && (
              <Button
                variant="contained"
                color="primary"
                disabled={!validateForm()}
                type="submit"
                startIcon={<LockOpenIcon />}
              >
                Login
              </Button>
            )}
          </Form>
          {loading && <CircularProgress />}

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
