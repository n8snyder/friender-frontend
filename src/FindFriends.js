import { useEffect, useState, useContext } from "react";
import FrienderApi from "./api";
import UserContext from "./userContext";
import UserProfile from "./UserProfile";


/** Find potential friends in your area
 * 
 * Props: none
 * 
 * State:
 * - users: array of users
 * - maybeFriend: user
 * 
 * Routes -> FindFriends
 */

function FindFriends() {
  const [users, setUsers] = useState(null);
  const [maybeFriend, setMaybeFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(function fetchUsersOnMount() {
    async function fetchUsers() {
      const fetchedUsers = (await FrienderApi.getUsers({
        radius: user.radius,
        zipCode: user.zipCode,
        numUsers: 10
      })).users;
      setUsers(fetchedUsers);
    }
    if (user !== null) {
      fetchUsers();
    }
  }, [user]);

  useEffect(function assignMaybeFriend() {
    if ((users !== null) && (users.length > 0)) {
      setMaybeFriend(users[0]);
      setLoading(false)
    }
    if ((users !== null) && (users.length === 0)) {
      setMaybeFriend(null);
    }
  }, [users]);

  /** Like another user */
  function like(userId) {
    // TODO: make the api call for liking a user
    setUsers(users.filter(user => user.id !== userId))
  }

  /** Dislike another user */
  function dislike(userId) {
    // TODO: make the api call for disliking a user
    setUsers(users.filter(user => user.id !== userId))
  }

  if (loading) {
    return <div className="FindFriends"><p>Loading...</p></div>
  }

  return (
    <div className="FindFriends">
      {!maybeFriend &&
        <p>No more people in your area</p>}
      {maybeFriend &&
        <UserProfile user={maybeFriend} like={like} dislike={dislike} />}
    </div>
  );
}

export default FindFriends;