import { Link, type LinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { useFeaturedOrSearch } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar, Nav, Container, Row, Col, Card, Button, Spinner, Alert
} from "react-bootstrap";
import "./MainPage.css";

// Wrapper to make Link type-safe for react-bootstrap's `as` prop
const RBLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

export default function MainPage() {
  const { data: products, loading, error } = useFeaturedOrSearch();

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Categories", value: 4 },
    { label: "Orders Today", value: 12 },
    { label: "Revenue", value: "$1,250" },
  ];

  const features = ["Analytics", "Inventory", "Orders", "Customers"];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar bg="white" expand="lg" sticky="top" className="py-3 shadow-sm border-bottom">
        <Container fluid className="px-5">
          <Navbar.Brand as={RBLink} to="/" className="fw-bold text-warning fs-3">
            WeavShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="gap-3 ms-auto align-items-center">
              {["shop", "cart", "about", "login"].map((path) => (
                <Nav.Link key={path} as={RBLink} to={`/${path}`} className="fw-semibold">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Nav.Link>
              ))}
              <Button as={RBLink} to="/signup" variant="warning" className="px-4 py-2 text-white fw-semibold">
                Sign Up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="warning" />
        </div>
      )}

      <main className="flex-grow-1">
        <Container fluid className="px-5 py-5">
          <Row className="mb-4 align-items-center">
            <Col md={8}>
              <h1 className="display-5 fw-bold">Dashboard</h1>
              <p className="lead text-muted">Overview of your ecommerce store performance and products.</p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button as={RBLink} to="/shop" variant="warning" className="px-4 py-2 me-2">
                Go to Shop
              </Button>
              <Button as={RBLink} to="/cart" variant="outline-warning" className="px-4 py-2">
                View Cart
              </Button>
            </Col>
          </Row>

          <Row className="mb-5 g-4">
            {stats.map(({ label, value }) => (
              <Col xs={6} md={3} key={label}>
                <Card className="text-center border-0 shadow-sm rounded-4 stat-card">
                  <Card.Body>
                    <div className="mb-1 h4 fw-bold">{value}</div>
                    <small className="text-muted">{label}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <section className="p-4 mb-5 bg-white rounded shadow-sm">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h3 className="fw-semibold">Sample Products</h3>
              <Button as={RBLink} to="/shop" variant="warning">View All Products</Button>
            </div>
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {!loading && !error && (
              <Row className="g-4">
                {products.slice(0, 4).map((p) => (
                  <Col xs={6} md={3} key={p.id}>
                    <ProductCard product={p} />
                  </Col>
                ))}
                {products.length === 0 && (
                  <Col>
                    <Card className="p-4 text-center border-0 shadow-sm">
                      <Card.Body>
                        <p className="text-muted">No products available at the moment. Please check back later.</p>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
            )}
          </section>

          <section className="p-4 mb-5 bg-white rounded shadow-sm">
            <h3 className="mb-3 fw-bold">Design Features</h3>
            <Row className="g-3">
              {features.map((feature) => (
                <Col xs={6} md={3} key={feature}>
                  <Card className="text-center border-0 shadow-sm rounded-4 feature-card">
                    <Card.Body className="fw-semibold">{feature}</Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </Container>
      </main>
    </div>
  );
}
