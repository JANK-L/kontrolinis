import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthcontext";

const Navbar = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();
  const handleClick = (e) => {
    logout();
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/topic">Topics</a>
          </li>
          <li>
            <a href="/topic/create">New Topic</a>
          </li>
        </ul>
      </nav>
      <div>
        {user && (
          <div>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div className="login">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
