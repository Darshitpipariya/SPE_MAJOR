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
                    timeout: 5000,
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            )
        return response;
    }catch(err){
        console.log(err);
        throw err;
    }
    
}


export const submitFrom = async (url,token,feedback) => {
    try {
        const response = await axios
            .post(`${url}/api/feedback/submit`,
                {
                    feedback: feedback
                },
                {
                    timeout: 5000,
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