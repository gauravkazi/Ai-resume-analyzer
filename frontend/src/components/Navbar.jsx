import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

      {!token && (
        <>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </>
      )}

      {token && (
        <>
          <Link to="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link to="/analyze" style={{ color: "white" }}>
            Analyze
          </Link>
          <button
            onClick={handleLogout}
            style={{
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;