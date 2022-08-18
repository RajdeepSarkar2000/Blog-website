import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useEffect, useState} from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();
  
const [update,setUpdate] = useState("");


  const handleDelete = ()=> {
      fetch('http://localhost:8000/blogs/' + blog.id, {
          method: 'DELETE'
      }).then(()=> {
        history.push('/');
      })

  }
  const handleUpdate = (e)=>{
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method:'PATCH', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog)
    }).then(()=>{
      console.log('Blog has been updated')
      e.preventDefault();
      blog.body = update;
      
      
    })
  }

  const handleCancel = () =>{
    history.push('/')
  }
  


  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <textarea
          required
          value={update}
          onChange={(e) => setUpdate(e.target.value)
          }
          placeholder="Update blog content"
          style={{display:"block",marginBottom:"10px"}}
        ></textarea>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleUpdate}>Update</button>
          <button onClick = {handleCancel}>Cancel</button>
         
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;