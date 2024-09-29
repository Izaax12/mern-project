import { Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function DashPost() {
  const {currentUser} = useSelector((state)=>state.user); 
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(()=>{
    const fetchPosts = async() =>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);   
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 
      scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-track-slate-500">
      {currentUser.isAdmin && userPosts.length>0 ? (
        <>
         <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Fecha actualizada:</Table.HeadCell>
            <Table.HeadCell>Imagen del post:</Table.HeadCell>
            <Table.HeadCell>Titulo del post:</Table.HeadCell>
            <Table.HeadCell>Categoria:</Table.HeadCell>
            <Table.HeadCell>Borrar</Table.HeadCell>
            <Table.HeadCell><span>Editar</span></Table.HeadCell>
          </Table.Head>
          {userPosts.map((post)=>(
            // eslint-disable-next-line react/jsx-key
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span className="font-medium text-red-500 hover:underline cursor-pointer">Borrar</span>
                </Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to ={`/update-post/${post._id}`}>
                    <span>Editar</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
         </Table>
        </>
      ):(
        <p>Aún no tienes posts</p>
      )}
    </div>
  )
}