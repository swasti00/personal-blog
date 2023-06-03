import { deleteDoc, doc, getDoc  } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import LoadingSpinner from "./Loading";
import "../styles/post.css"
import {Helmet} from "react-helmet";

const Posts = ({ isAuth }) => {
    const id  = useParams();
    const ID = id.id
    let navigate = useNavigate();
    const [dataLists, setDataLists] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const docs = async () => {
            const docRef = doc(db, "posts", ID);
            await getDoc(docRef).then(function(doc) {
                if (doc.exists) {
                    setDataLists(doc.data());
                    setLoading(false);
                } else {
                    window.location.pathname("/")
                }
            }).catch(function(error){
                window.location.pathname("/")
            })            
        }
        docs();
        
    },[ID])

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc);
        navigate("/");
    }

    const post = (
        <div className="post-container">
                <Helmet>
                <meta name="title" content={dataLists.title} />
                <meta name="description" content={dataLists.description} />
                <meta name="keywords" content={dataLists.category} />
                <title>{dataLists.title}</title>
            </Helmet>
           
        
            {isAuth ? <div className="icon-post">
                <span className="bin" onClick={() => deletePost(ID)}><i className="fa fa-trash"></i></span>
                <span className="EDIT" ><a className="Edit" href={`/${id.id}/edit-post`}><i className="fa fa-pen-to-square"></i></a></span>
                <br />
                <br />
                <span className="post-cat">{dataLists.category}</span>
            </div> : <div><span className="post-cat">{dataLists.category}</span></div>}
            <br/>
            <img className="post_image" src={dataLists.imgUrl} alt="post_image" />
            <div className="post-body">
                <h1 className="post-title">{dataLists.title}</h1>
            </div>
            

            <div className="row rows">
            <label className="description">Description:</label>
            <h2 className="post-description">{dataLists.description}</h2>  
                </div>
                <div className="row rows">
                <label className="POST">Post:</label>
            <h2 className="post-detail">{dataLists.postText}</h2>
                </div> 
            
        </div>
    )

   return ( <div className="PostPage">
    {loading ? <LoadingSpinner /> : post}
   </div>)
    

}
export default Posts;
