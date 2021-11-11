export default {

    manager:()=>{
        return fetch("/manager",{
            headers:{
                "Content-type":"application/json"
            }
        }).then((res)=>{
           return  res.json()
        }).then((data)=>{
           return data
        })  
    },
    admin:()=>{
        return fetch("/admin",{
            headers:{
                "Content-type":"application/json"
            }
        }).then((res)=>{
           return  res.json()
        }).then((data)=>{
           return data
        })  
    },
    customer:()=>{
        return fetch("/customer",{
            headers:{
                "Content-type":"application/json"
            }
        }).then((res)=>{
           return  res.json()
        }).then((data)=>{
           return data
        })  
    },
    delete:(id)=>{
        return fetch(`/delete?data=${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        }).then((res)=>{
            return  res.json()
         }).then((data)=>{
            return data
         })  
    },
    edit:(id,user)=>{
        console.log(id,"eo")
        return fetch(`/edit?data=${id}`,{
            method:"PUT",
            body:JSON.stringify(user),
            headers:{
                "Content-type":"application/json"
            },
        }).then((res)=>{
            return  res.json()
         }).then((data)=>{
            return data
         })  
    },
    details:(id)=>{
        return fetch(`/details?data=${id}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        }).then((res)=>{
            return  res.json()
         }).then((data)=>{
            return data
         })  
    }
   
}