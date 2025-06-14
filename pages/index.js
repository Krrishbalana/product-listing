import React, { useState, useEffect } from 'react';

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState(products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(result);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <h1 className="text-center mb-4 display-5 fw-bold text-primary">
          🛍 Trending Products
        </h1>

        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <div className="row">
            {filtered.map((product) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="product-img-wrapper text-center p-4 bg-white">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-fluid"
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate">{product.title}</h6>
                    <p className="text-muted small mb-1">{product.category}</p>
                    <p className="fw-bold h5 text-dark">${product.price}</p>
                    <div className="mt-auto">
                      <span className="badge bg-success mb-2">
                        ⭐ {product.rating?.rate ?? 'N/A'}
                      </span>
                      <button className="btn btn-outline-primary w-100">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          transition: all 0.2s ease-in-out;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
