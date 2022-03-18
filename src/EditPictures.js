import { useState } from "react";

/** Edit Pictures Page
 * Show pictures that have been uploaded with an X to delete them.
 * Show area to upload new pictures.
 * 
 * Props: 
 * - pictures: array of {id, url}
 * 
 * State: selectedPicture
 * 
 * EditProfile -> EditPictures -> ¿{DeletePictures, UploadPictures}?
 */

function EditPictures({ pictures, deletePicture, uploadPicture }) {
  console.log("EditPictures:", pictures);

  const [selectedPicture, setSelectedPicture] = useState(null);

  function onPictureChange(evt) {
    setSelectedPicture(evt.target.files[0]);
  }

  async function handleUpload(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("picture", selectedPicture);
    await uploadPicture(formData);
    evt.target.reset();
  }

  function handleDeletePicture(evt) {
    const pictureId = Number(evt.target.id.replace("delete-", ""));
    deletePicture(pictureId);
  }



  return (
    <div className="EditPictures">
      <h4>Your pictures</h4>
      <div className="EditPictures-my-pictures">
        {pictures.map(pic => {
          return (
            <div key={pic.id} className="EditPicture-picture">
              <img src={pic.url} alt={pic.id} />
              <button
                id={`delete-${pic.id}`}
                onClick={handleDeletePicture}
              >
                X
              </button>
            </div>
          )
        })}
      </div>
      <h4>Upload new picture</h4>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={onPictureChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );

}

export default EditPictures;