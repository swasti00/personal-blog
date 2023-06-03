import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore"
import { db, storage, timestamp } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/createpost.css";
import { uploadBytesResumable } from "firebase/storage";



function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [category, setCategory] = useState("Nature");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(postsCollectionRef, 
            { 
                title,
                postText, 
                category,
                description,
                imgUrl,
                createdAt: timestamp(),
            });
        navigate("/");
    };
    useEffect(() => {
      if(!isAuth){
          navigate("/");
      }
  })

  const handleChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file) return;
    const storageRef = storage.ref(`images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },(error) => {
        alert(error);
      },async () => {
        const url = await storageRef.getDownloadURL();
        setImgUrl(url)
      });
  }



    const create = (
      <div className="create-post">
            <div className="container">
              <h1 className="create">CreatePost</h1>
              <div className="row">
                  <div className="col-25">
                    <label className="label">Title:</label>
                  </div>
                  <div className="col-75">
                    <input id="input" placeholder="Title..." required 
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}/>
                  </div>
              </div>
              
              <div className="row">
                  <div className="col-25">
                    <label className="label">Description:</label>
                  </div>
                  <div className="col-75">
                    <textarea placeholder="Description..." rows="3" required 
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}/>
                  </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="label">Choose Image:</label>
                </div>
                    <div className="col-75">
                    <input type="file" id="file_upload" accept="image/png, image/jpeg, image.jpg" required  onChange={handleChange} />
                    <div className="progress">
                      <div className="progress-percent" style={progresspercent ? {width:progresspercent+"%",height: "5px"} : {width:"0"}}></div>
                    </div>
                    </div>
              </div>
              <div className="row">
                  <div className="col-25">
                    <label className="label" >Category:</label>
                  </div>
                  <div className="col-75">
                    <select id="category" required 
                    onChange={(event) => setCategory(event.target.value)}>
                    <option className="ctgry" value="Nature">Nature</option>
                    <option className="ctgry" value="Politics">Politics</option>
                    <option className="ctgry" value="News">News</option>
                    <option className="ctgry" value="Fashion">Fashion</option>
                    <option className="ctgry" value="Personal">Personal</option>
                    </select>
                  </div>
              </div>

              <div className="row">
                  <div className="col-25">
                    <label className="label">Post:</label>
                  </div>
                  <div className="col-75">
                    <textarea rows="15" placeholder="Post..." required 
                    onChange={(event) => {
                      setPostText(event.target.value);
                    }}/>
                  </div>
              </div>
              <button className="submit" onClick={(title && description && postText)? createPost: console.log("Change") }>Create</button>

              </div>
        </div>
    )

    return (
      <div>
        {isAuth && create}
      </div>  
    );
}

export default CreatePost;