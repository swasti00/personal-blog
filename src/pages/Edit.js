import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage, timestamp } from "../firebase";
import LoadingSpinner from "./Loading";
import { uploadBytesResumable } from "firebase/storage";


function Edit({isAuth}) {
    useEffect(() => {
        if(!isAuth){
            navigate("/");
        }
    })
    const id= useParams();
    const ID =id.id
    let navigate = useNavigate();
    const [dataLists, setDataLists] = useState([]);
    const [title, setTitle] = useState();
    const [url, setUrl] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [postText, setPostText] = useState();
    const ref = doc(db, "posts", ID);
    const [loading, setLoading] = useState(true);
    const [progresspercent, setProgresspercent] = useState(0);

    useEffect(() => {
        const docs = async () => {
            const docRef = doc(db, "posts", ID);
            const data = await getDoc(docRef);
            const d = data.data()
            setDataLists(d);
            setTitle(d.title)
            setUrl(d.imgUrl)
            setCategory(d.category)
            setDescription(d.description)
            setPostText(d.postText)
            setLoading(false);
        }
        docs();
    },[ID])
    const editPost = async () => {
       await updateDoc(ref, {
        title: title,
        category: category ,
        description: description ,
        postText: postText,
        imgUrl: url,
        createdAt: timestamp(),
       }).then(function() {
        navigate("/")
       }).catch(function(error) {
        console.error("Error updating document: ", error);
    });
    }

    const handleChange = (e) => {
      e.preventDefault()
      const file = e.target.files[0]
      if (!file) return
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
          setUrl(url)
        });
    }
  

    const edit = (
        <div className="container">
            <h1>Edit Post</h1>
            <div className="row">
                  <div className="col-25">
                    <label className="label">Title:</label>
                  </div>
                  <div className="col-75">
                    <input defaultValue={dataLists.title} id="input" placeholder="Title..." required 
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
                    <textarea defaultValue={dataLists.description} rows="3" placeholder="Description..." required 
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
                    <input type="file" id="file_upload" accept="image/png, image/jpeg, image.jpg" required 
                     onChange={handleChange} />
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
                    <select id="category" required defaultValue={dataLists.category }
                    onChange={(event) => setCategory(event.target.value)}>
                    <option value="Nature">Nature</option>
                    <option value="Politics">Politics</option>
                    <option value="News">News</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Personal">Personal</option>
                    </select>
                  </div>
              </div>
              <div className="row">
                  <div className="col-25">
                    <label className="label">Post:</label>
                  </div>
                  <div className="col-75">
                    <textarea rows="15" defaultValue={dataLists.postText } placeholder="Post..." required 
                    onChange={(event) => {
                      setPostText(event.target.value);
                    }}/>
                  </div>
              </div>
            <button className="submit" onClick={editPost}>Update</button>
    </div>
    )

    
    return (
        <div className="editPage">
            {loading ? <LoadingSpinner /> : edit}
        </div>
    )
}


export default Edit;