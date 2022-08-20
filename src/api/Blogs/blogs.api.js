import {http} from 'services/Http/axios'
import { axiosPrivate } from 'services/Private/axiosPrivate'

export async function getAllBlogs(){
    return new Promise ((resolve,reject)=>{
        http.get('/polls')
        .then(res=>resolve(res.data))
        .catch(err=>reject(err.response?.status))
    })
}
export async function getAllBlogsByAuthor(data){
    return new Promise ((resolve,reject)=>{
        http.get('/polls/myposts/')
        .then(res=>resolve(res.data))
        .catch(err=>reject(err.response?.status))
    })
}
export async function getSingleBlogById(id){
    return new Promise((resolve,reject)=>{
        http
          .get(`/polls/postsingle/${id}`)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err.response?.status));
    })
}
export async function createNewBlog (data){
    return new Promise ((resolve,reject)=>{
        axiosPrivate.post(`/polls/postcreate/`,data,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        .then(res=>resolve(res.status))
        .catch(err=>reject(err.response?.status));
    })
}
export async function updateSingleBlog({id,data}){
    return new Promise ((resolve,reject)=>{
        axiosPrivate.patch(`/polls/myposts/${id}`,data,{
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>resolve(res.data))
        .catch(err=>reject(err.response?.status))
    })
}