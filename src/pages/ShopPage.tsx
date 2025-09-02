
import ProductCard from '../components/ProductCard';
import { useFeaturedOrSearch } from '../hooks/useProducts';
import { Container, Row, Col, Spinner, Alert, Form, InputGroup, Button, Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopPage() {
  const { data: products, loading, error } = useFeaturedOrSearch();
  const [search, setSearch] = useState("");

  // Color palette
  const accent = "#4f46e5"; // Indigo
  const bg = "#f8fafc"; // Light gray
  const cardBg = "#fff";
  const cardShadow = "0 2px 16px 0 rgba(79,70,229,0.08)";

  return (
    <div style={{ background: bg, minHeight: '100vh', paddingTop: 0 }}>
      {/* Header Navigation */}
      <Navbar expand="md" style={{ background: accent, borderBottom: '2px solid #e0e7ef' }} variant="dark" className="py-2 mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: 700, letterSpacing: 1, color: '#fff', fontSize: 22 }}>
            Habico
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" style={{ fontWeight: 500 }}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shop" style={{ color: '#fff', fontWeight: 500 }}>
                Shop
              </Nav.Link>
              {/* Add more nav links as needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="mb-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <h2 className="mb-3 fw-bold mb-md-0" style={{ color: accent, letterSpacing: 1 }}>Shop All Products</h2>
          <Form className="w-100 w-md-auto" style={{ maxWidth: 340 }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ borderRadius: 20 }}
              />
              <Button variant="primary" style={{ background: accent, border: 'none', borderRadius: 20 }}>
                <i className="bi bi-search" />
              </Button>
            </InputGroup>
          </Form>
        </div>
        {loading && (
          <div className="py-5 d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" style={{ color: accent }} />
            <span className="ms-3 text-primary">Loading products...</span>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="mb-4">
            Error: {error}
          </Alert>
        )}
        <Row className="g-4">
          {products.map(p => (
            <Col xs={12} sm={6} md={4} lg={3} key={p.id}>
              <div
                style={{
                  background: cardBg,
                  borderRadius: 18,
                  boxShadow: cardShadow,
                  transition: 'box-shadow 0.2s',
                  border: `1px solid #e0e7ef`,
                  padding: 12,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                className="h-100 hover-shadow"
              >
                <ProductCard product={p} />
              </div>
            </Col>
          ))}
          {products.length === 0 && !loading && (
            <Col xs={12} className="py-5 text-center text-muted">
              <i className="bi bi-emoji-frown" style={{ fontSize: 32, color: accent }} />
              <div className="mt-2">No products found.</div>
            </Col>
          )}
        </Row>
      </Container>
      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 4px 32px 0 rgba(79,70,229,0.16);
        }
        .navbar {
          border-radius: 0 0 18px 18px;
        }
      `}</style>
    </div>
  );
}
