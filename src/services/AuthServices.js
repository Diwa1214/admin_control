export default {

    login :(user)=>{
        console.log(user)
        return fetch('user/login',{
            method:"POST",
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
           return data
        })
    },
    register:(user)=>{
        console.log(user,"user")
        return fetch('user/register',{
            method:"POST",
            body:JSON.stringify(user),

            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
           return data
        })
    },
    logout:()=>{
        return fetch('user/logout').then((res)=>{
            return res.json()
        }).then((data)=>{
           return data
        })
    },
    isAuthenticated:()=>{
        return fetch('user/authenticated',{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            if(!res.status == 401 ){
               return res.json()
            }
            else{
                return {isAuthenticated:false,user:{email:"",role:""}}
            }
        }).then((data)=>{
           return data
        })
    }
}