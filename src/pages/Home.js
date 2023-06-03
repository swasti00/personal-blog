import React, { useEffect ,useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import LoadingSpinner from "./Loading";
import { Helmet } from "react-helmet";



function Home({isAuth }) {
    const[postLists, setPostLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clicked, setClicked] = useState(false)
    const [sortedData, setSortedData] = useState([]);
    const [sort, setSort] = useState(false);

    const boolean = () => {
        setClicked(current => !current)
    }


    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc);
        window.location.pathname = "/";
    }

    useEffect(() => {
        const getposts = async () => {
            const postCollectionRef = collection(db, "posts")
            const q = query(postCollectionRef, orderBy("createdAt",'desc'))
            const data = await getDocs(q);
            setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setIsLoading(false)
        }
        getposts();
    },[]);
       
    

    const filter = async (catItem) => {
        setSort(true);
        const ref = query(collection(db, "posts"), where("category", "==" , catItem));
        const data = await getDocs(ref);

        setSortedData(data.docs.map((doc) => 
        ({...doc.data(), id: doc.id})
        ));  
    }


    const category = (
        <div>
            <div className="dropdown">
                <label className="cat" onClick={boolean}>Category {clicked ? <i className="fa-solid fa-chevron-down"></i> :  <i className="fa-solid fa-chevron-right"></i>}</label> 
                {clicked ? 
                (<div className="dropdown-content">
                <li><span className="content" value="" onClick={() => {
                    setSort(false);
                    setClicked(false);
                }}>All</span></li>
                <li><span className="content" value="Nature" onClick={() =>{
                    filter('Nature');
                    setClicked(false);
                } }>Nature</span></li>
                <li><span className="content" value="Politics" onClick={() => {
                    filter('Politics');
                    setClicked(false);
                }}>Politics</span></li>
                <li><span className="content" value="News"onClick={() => {
                    filter('News');
                    setClicked(false);
                }}>News</span></li>
                <li><span className="content" value="Fashion"onClick={() => {
                    filter('Fashion');
                    setClicked(false);
                }}>Fashion</span></li>
                <li><span className="content" value="Personal"onClick={() =>{
                    filter('Personal')
                    setClicked(false);
                }}>Personal</span></li>
                </div>) : ""
                }              
                
            </div>
            <div className="list" >
                <span className="btn" value="" onClick={() => setSort(false)}>All</span>
                <span className="btn" value="Nature" onClick={() => filter('Nature') }>Nature</span>
                <span className="btn" value="Politics" onClick={() => filter('Politics')}>Politics</span>
                <span className="btn" value="News"onClick={() => filter('News')}>News</span>
                <span className="btn" value="Fashion"onClick={() => filter('Fashion')}>Fashion</span>
                <span className="btn" value="Personal"onClick={() => filter('Personal')}>Personal</span>
            </div>
            <hr className="hr"/>
        </div>

    )

    const renderUser = (
        <div>
            <h1 className="layout">A place for our thoughts, fears, finds, fads, obsession and opinions.</h1>
            {category}
            <div>
            {!sort && (
                <div className="containers">
                    {postLists.map((post) => {
                return <div className="card" key={post.id}>
                    
                    <div className="card__header" >
                    <img src={post.imgUrl} alt="post_image" className="card__image" height="300" width="600" />
                  </div>
                  
                  <div className="card__body">
                    <span className="tag tag-brown">{post.category}</span>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                  </div>
                  <div className="card__footer">
                  {isAuth && <div className="extra">
                        <span className="trash" onClick={() => {deletePost(post.id)}}>
                        <i className="fa fa-trash"></i>
                        </span>
                        <span className="edit"><a className="edit-post" href={`/${post.id}/edit-post`}>
                        <i className="fa fa-pen-to-square"></i>
                            </a></span>
                    </div>}
                  <a className="read" href={`/${post.id}`}>Read...</a>
                  </div>
                    </div>
            
                
                
                  })}
                </div>
            )}
            {sort && (
                <div className="containers">
                {sortedData.map((post) => {
            return <div className="card" key={post.id}>
            <div className="card__header">
            <img src={post.imgUrl} alt="post_image" className="card__image" width="600" />
          </div>
          
          <div className="card__body">
            <span className="tag tag-brown">{post.category}</span>
            {/* {isAuth && <>
                <span className="trash" onClick={() => {deletePost(post.id)}}>
                <i className="fa fa-trash"></i>
                </span>
                <span className="edit"><a className="edit-post" href={`/${post.id}/edit-post`}>
                <i className="fa fa-pen-to-square"></i>
                    </a></span>
            </>} */}
            <h4>{post.title}</h4>
            <p>{post.description}</p>
          </div>
          <div className="card__footer">
                  <a className="read" href={`/${post.id}`}>Read...</a>
                  </div>
            </div>
          
         })}
            </div>
            )}   
            </div>  
        </div>
             
    )

    return (
        <div className="homePage">
            <Helmet>
                <title>Blogging</title>
            </Helmet>
            {isLoading ? <LoadingSpinner /> : renderUser}
        </div>

    
)
}

export default Home;