import { Link } from "react-router-dom";

/** Homepage
 * 
 *  Props: none
 * 
 * State: none
 */

function Home() {
  return (
    <div className="Home">
      <Link to="/signup">
        Sign Up
      </Link>
      <Link to="/login">
        Login
      </Link>
    </div>
  )
}

export default Home;