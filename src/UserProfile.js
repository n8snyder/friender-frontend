import { useEffect, useState } from "react";


/** Profile page of a user to try to match with them
 * 
 * Props:
 * - user: object with limited user info
 * - like: function to like the user
 * - dislike: function to dislike the user
 * 
 * State: 
 * - currentPictureIdx: number of index in pictures array
 * 
 * FindFriends -> UserProfile
 */

function UserProfile({ user, like, dislike }) {
  const [currentPictureIdx, setCurrentPictureIdx] = useState(0);

  useEffect(function resetPictureIdx() {
    setCurrentPictureIdx(0);
  }, [user])

  //Increments currCardIdx state by 1
  function goForwards() {
    if (currentPictureIdx < user.pictures.length - 1) {
      setCurrentPictureIdx(currentPictureIdx + 1);
    }
  }

  //Increments currCardIdx state by 1
  function goBackwards() {
    if (currentPictureIdx > 0) {
      setCurrentPictureIdx(currentPictureIdx - 1);
    }
  }

  function handleLike(evt) {
    like(user.id);
  }

  function handleDislike(evt) {
    dislike(user.id);
  }

  return (
    <div className="UserProfile">
      <div className="UserProfile-pictures">
        {user.pictures.length &&
          <div className="UserProfile-current-picture">
            <button onClick={goBackwards}>
              {"<"}
            </button>
            <img src={user.pictures[currentPictureIdx].url} alt="Missing" />
            <button onClick={goForwards}>
              {">"}
            </button>
          </div>
        }
      </div>
      <div className="UserProfile-like-area">
        <button className="UserProfile-like-button" onClick={handleLike}>👍</button>
        <button className="UserProfile-dislike-button" onClick={handleDislike}>👎</button>
      </div>
      <div className="UserProfile-details">
        <h3 className="UserProfile-name">{user.name}</h3>
        <h5>Hobbies</h5>
        <p className="UserProfile-hobbies">{user.hobbies}</p>
        <h5>Interests</h5>
        <p className="UserProfile-interests">{user.interests}</p>
      </div>

    </div>
  )
}

export default UserProfile;