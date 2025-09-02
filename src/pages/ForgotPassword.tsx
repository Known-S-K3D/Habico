import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4 text-center">Forgot Password</h3>
        <p className="small text-muted">
          Enter your email address and we’ll send you a link to reset your password.
        </p>
        <Form>
          <Form.Group className="mb-3" controlId="forgotEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Button type="submit" variant="warning" className="w-100">
            Send Reset Link
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="/login" className="small">
            Back to Login
          </Link>
        </div>
      </Card>
    </Container>
  );
}
