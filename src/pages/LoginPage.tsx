import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4 text-center">Login</h3>
        <Form>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <Form.Check type="checkbox" label="Remember me" />
            <Link to="/forgot-password" className="small">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span className="small">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </Card>
    </Container>
  );
}
