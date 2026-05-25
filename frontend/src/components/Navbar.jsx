import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        background: "#111",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link to="/login" style={{ color: "white" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white" }}>
        Register
      </Link>

      <Link to="/dashboard" style={{ color: "white" }}>
        Dashboard
      </Link>

      <Link to="/analyze" style={{ color: "white" }}>
        Analyze
      </Link>
    </nav>
  );
}

export default Navbar;