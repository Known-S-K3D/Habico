import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4 text-center">Sign Up</h3>
        <Form>
          <Form.Group className="mb-3" controlId="signupName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Create Account
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span className="small">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </Container>
  );
}
