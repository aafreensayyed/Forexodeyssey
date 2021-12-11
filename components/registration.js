/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Loader from './loader'

export default function SignUp(props) {
    const [isloading, setIsloading] = useState(false)
    const [userData,setuserData]=useState({
        email:'',
        password:'',
        phone:'',
        firstName:'',
        lastName:''
        
    })
    const [err,seterr]=useState('')

    const handleChange=(e)=>{//function for storing value in state
        const {value}=e.target
        console.log()
        seterr('')
        setuserData(prevState=>({
            ...prevState,
            [e.target.name]:value
        }))
    }

    const handlephone=(e)=>{//function for storing data in phone no
        seterr('')
        setuserData(prevState=>({
            ...prevState,
            phone:e
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        // Getting value from state
        const { email,password,phone,firstName,lastName,confirmPassword}=userData
        //Validation
        if (!email || !password || !phone || !firstName || !lastName || !confirmPassword) {
            seterr('Input fields cannot be empty')
            return;
        } else if(password!==confirmPassword){
            seterr('Password and Confirm password should be same')
            return;
        } else if(password.length<8){
            seterr('Your password must be at least 8 characters')
            return; 
        } else if(password.search(/[a-z]/i)<0){
            seterr('Your password must contain at least one letter')
            return; 
        }else if(password.search(/[0-9]/i)<0){
            seterr('Your password must contain at least one digit')
            return; 
        }else if(password.search(/[!@#$%^&*]/)<0){
            seterr('Your password must contain at least one special character ')
            return; 
        }else if(email.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)<0){
            seterr('Please provide valid email ')
            return; 
        } else {
            setIsloading(true)
            const res = await fetch('/api/auth/SignUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                phone: phone,
                firstName: firstName,
                lastName: lastName,
            }),
        });
         // //Await for data for any desirable next steps
        const data = await res.json();
        setIsloading(false) 
        props.userCreated()// logic to open successfully creation of user modal
        }
        
        
    };
    const handleOpen = () => {
        props.handleOpenSignup()
    }
    return (
        <>
          
            <Transition.Root show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.close}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className=" relative inline-block align-bottom bg-white rounded-lg  pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-lg sm:w-full ">
                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={props.close}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-1 text-center sm:mt-0 sm:ml-2 sm:text-left">
                                        <div className="min-h-full flex flex-col justify-center py-12 sm:px-4 lg:px-4">
                                            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                                                <img
                                                    className="mx-auto h-12 w-auto"
                                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                    alt="Workflow"
                                                />
                                                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Create New  Account</h2>

                                            </div>

                                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                                                <div className="bg-white py-6 sm:px-2">
                                                    <form className=" flex items-baseline justify-between flex-wrap space-y-6" action="#" method="POST">
                                                        <div className='w-full lg:w-[45%]'>
                                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                                First Name
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    onChange={handleChange}
                                                                    value={userData.firstName}
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    type="text"
                                                                    required
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-[45%]">
                                                            <label htmlFor="lirstName" className="block text-sm font-medium text-gray-700">
                                                                Last Name
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                   onChange={handleChange}
                                                                   value={userData.lastName}
                                                                    id="lastName"
                                                                    name="lastName"
                                                                    type="text"
                                                                    required
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-[45%]">
                                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                                Phone Number
                                                            </label>
                                                            <div className="mt-1">
                                                            <PhoneInput
                                                                country={'us'}
                                                                value={userData.phone}
                                                                onChange={(phone)=>handlephone(phone)}
                                                                name='phone'
                                                            />
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-[45%]">
                                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                Email
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    value={userData.email}
                                                                    onChange={handleChange}
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    required
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-[45%]">
                                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                Password
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="password"
                                                                    id="password"
                                                                    value={userData.password}
                                                                    onChange={handleChange}
                                                                    name='password'
                                                                    autoComplete="current-password"
                                                                    required
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-[45%]">
                                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                                Confirm Password
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    id="password"
                                                                    name="confirmPassword"
                                                                    value={userData.confirmPassword}
                                                                    onChange={handleChange}
                                                                    type="password"
                                                                    autoComplete="current-password"
                                                                    required
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <div>
                                                        {err!==""?<p className='text-red-600 text-sm m-5 text-center'>{err}</p>:<></>}
                                                    </div>
                                                    <div className='mt-10'>
                                                        <button
                                                            onClick={onFormSubmit}
                                                            type="submit"
                                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            Sign Up
                                                        </button>
                                                    </div>

                                                    <p onClick={handleOpen} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 text-center	mt-5">
                                                        Login
                                                    </p>
                                                    <div className="mt-6">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 flex items-center">
                                                                <div className="w-full border-t border-gray-300" />
                                                            </div>
                                                            <div className="relative flex justify-center text-sm">
                                                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 grid grid-cols-3 gap-3">
                                                            <div>
                                                                <a
                                                                    href="#"
                                                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                                >
                                                                    <span className="sr-only">Sign in with Facebook</span>
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="#"
                                                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                                >
                                                                    <span className="sr-only">Sign in with Twitter</span>
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                                    </svg>
                                                                </a>
                                                            </div>

                                                            <div>
                                                                <a
                                                                    href="#"
                                                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                                >
                                                                    <span className="sr-only">Sign in with GitHub</span>
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Loader loading={isloading}/>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

