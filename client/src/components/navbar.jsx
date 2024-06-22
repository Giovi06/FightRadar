import { Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <ul>
        <li>
          <button>Home</button>
        </li>
        <li>
          <button>Matches</button>
        </li>
        <li>
          {" "}
          <button>Logout</button>
        </li>
      </ul>
    </>
  );
}
