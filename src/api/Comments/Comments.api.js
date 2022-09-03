import { axiosPrivate } from "services/Private/axiosPrivate"


export async function createNewComment ({id,data}){
    return new Promise ((resolve,reject)=>{
       axiosPrivate
         .post(`/polls/createcomment/${id}`, data, {
           headers: { "Content-Type": "multipart/form-data" },
         })
         .then(res=>console.log('Successfully'))
         .catch((err) => reject(err.message));
    })
}