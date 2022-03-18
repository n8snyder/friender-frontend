import EditPictures from "./EditPictures";
import DetailsForm from "./DetailsForm";
import { useContext, useEffect, useState } from "react";
import FrienderApi from "./api";
import UserContext from "./userContext";

/** Edit Profile page
 * 
 * Props: none
 * 
 * State:
 * - user: object 
 * - pictures: array of { id, url, }
 * 
 * Routes -> EditProfile -> {EditPictures, DetailsForm}
 */

function EditProfile() {
  const [pictures, setPictures] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(function fetchPicturesOnMount() {
    async function fetchPictures(userId) {
      const fetchedPictures = (await FrienderApi.getPictures(userId)).pictures;
      setPictures(fetchedPictures);
    }
    if (user !== null) {
      console.log("getting pictures from user:", user);
      fetchPictures(user.id);
    }
  }, [user]);


  /** Upload picture in FormData with key "picture" */
  async function uploadPicture(formData) {
    const { picture } = await FrienderApi.uploadPicture(formData);
    setPictures([...pictures, picture]);
  }

  /** Delete picture by id */
  async function deletePicture(id) {
    const result = await FrienderApi.deletePicture(id);
    if (result.success === true) {
      const newPictures = pictures.filter(pic => {
        return (pic.id !== id)
      });
      setPictures(newPictures);
    }
  }

  return (
    <div className="EditProfile">
      <h3>Edit Profile</h3>
      {!pictures &&
        <p>Loading...</p>}
      {pictures &&
        <>
          <EditPictures
            pictures={pictures}
            deletePicture={deletePicture}
            uploadPicture={uploadPicture}
          />
          <DetailsForm />
        </>}
    </div>
  )
}

export default EditProfile;