import { SignupInput } from "@adarsh123/meduim-clone";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup" | "signin"}) => {
    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: "",
    })
    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
            const {jwt} =  response.data
            console.log('token'+jwt)
            localStorage.setItem('jwt', jwt)
            navigate('/blogs')
        } catch (error) {
            
        }
    }
    return (
        <div className="max-w-screen min-h-screen flex flex-col justify-start">
            <div className="flex flex-col items-center mt-10">
                <div className="max-w-md  text-3xl font-bold">
                    Create an account
                </div>
                <div className="max-w-md  text-md font-base text-slate-400">
                    {type === 'signin'?"Don't have an account":"Already have an Account? "}
                    
                    <Link className="pl-2 underline" to={type=="signin"?"/signup":'/signin'}>
                        {type === "signin"? "Sign up": "Sign in"}
                    </Link>
                </div>
            </div>
            <div className="flex flex-col  justify-center mx-28 pt-10">
                { type==='signup' &&   <LabelledInput
                        label="Name"
                        placeholder="Adarsh"
                        onChange={(e)=>{
                            setPostInputs({...postInputs, name: e.target.value})
                        }}
                    />
                    }

                <LabelledInput
                    label="Email"
                    type="email"
                    placeholder="example@example.com"
                    onChange={(e)=>{
                        setPostInputs({...postInputs, email: e.target.value})
                    }}
                />

                <LabelledInput
                    label="Password"
                    type="password"
                    placeholder="********"
                    onChange={(e)=>{
                        setPostInputs({...postInputs, password: e.target.value})
                    }}
                />
                <button type="button" onClick={sendRequest} className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2
                 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
                    
                 >{type==='signin'?'Sign In':'Sign Up'}</button>


                 
                
            </div>

        </div>
    )
}

interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange: (e:ChangeEvent<HTMLInputElement> ) => void;
    type?:string;
}

function LabelledInput({label,placeholder, onChange, type}:LabelledInputType){
    return(
        <div>
            <label  className="block  text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input type={type || "text"}  id="first_name" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required
                onChange={onChange}
            />
        </div>
    )
}