import axios from "axios";


export const loginhttp = async (url,username, password) => {
    try{
        const response = await axios
            .post(`${url}/api/auth/login/student`,
                {
                    username: username,
                    password: password
                },
                {
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            )
        
        return response;
    }catch(err){
        console.log(JSON.stringify(err));
        throw err;
    }
    
}


export const submitFrom = async (url,token,feedback) => {
    try {
        console.log(url+" "+token+" "+JSON.stringify(feedback));
        const response = await axios
            .post(`${url}/api/feedback/submit`,
                {
                    feedback: feedback
                },
                {
                    headers: {
                        token: token,
                        "Content-Type": "application/json",
                    }
                }
            )
        return response;
    } catch (error) {
        
        console.log(error);
        throw error;

    }
    
}

export const resetPassword = async (url,username) => {
    try{
        const response = await axios
        .post(`${url}/password-reset/`,
        {
            username:username,
        },
        {
            headers:{
                "Content-Type": "application/json",
            }
        }
        )
    }catch(err){
        console.log(JSON.stringify(err));
        throw err;
    }
}