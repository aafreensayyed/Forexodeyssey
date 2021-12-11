import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { Disclosure } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import SignUp from './login'
import SignIn from './registration'
import Link from 'next/link'
import UserCreatedModal from './userCreatedModal'
import { signOut } from "next-auth/client"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [session, loadingSession] = useSession();
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [isSigninModalOpen, setSigninModalOpen] = useState(false);
    const [signupModal, setupsigupModal] = useState(false)


    console.log('session', session, loadingSession)

    const openSignupModal = () => {
        setSignupModalOpen(true);
    }


    const closeSignupModal = () => {
        setSignupModalOpen(false);
    }

    const closeSigninModal = () => {
        setSigninModalOpen(false);
    }

    const handleOpen = () => {
        setSignupModalOpen(false);
        setSigninModalOpen(true);
    }
    const handleOpenSignup = () => {
        setSignupModalOpen(true);
        setSigninModalOpen(false);
    }

    const handleuserCreated = () => {
        closeSigninModal()
        setupsigupModal(true)
    }

    const closeUserCreated = () => {
        setupsigupModal(false)
        setSignupModalOpen(true);
    }

    const handleLogout = () => {
        signOut({ callbackUrl: 'http://localhost:3001' })
    }

    return (
        <>
            <SignIn isOpen={isSigninModalOpen} close={closeSigninModal} handleOpenSignup={handleOpenSignup} userCreated={handleuserCreated} />
            <SignUp isOpen={isSignupModalOpen} close={closeSignupModal} handleOpenSignin={handleOpen} />
            <UserCreatedModal isOpen={signupModal} closeUserCreated={closeUserCreated} />
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="flex items-center px-2 lg:px-0">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="block lg:hidden h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                            alt="Workflow"
                                        />
                                        <img
                                            className="hidden lg:block h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden lg:block lg:ml-6">
                                        <div className="flex space-x-4 items-center">
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <Link href="/"  >
                                                <a className="hover:bg-gray-700 hover:text-white  text-gray-300 px-3 py-2 rounded-md font-medium">
                                                    Home
                                                </a>

                                            </Link>
                                            <Link href="/about"  >
                                                <a className="hover:bg-gray-700 hover:text-white text-gray-300  px-3 py-2 rounded-md font-medium">
                                                    About
                                                </a>

                                            </Link>

                                            <Link
                                                href="/stats"

                                            >
                                                <a className="hover:bg-gray-700 hover:text-white  text-gray-300 px-3 py-2 rounded-md font-medium">
                                                    Stats
                                                </a>
                                            </Link>
                                            {session === null ?
                                                <p
                                                    onClick={openSignupModal}

                                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer"
                                                >
                                                    Sign In
                                                </p> :
                                                <p
                                                    onClick={handleLogout}
                                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer"
                                                >
                                                    SignOut
                                                </p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                                    <div className="max-w-lg w-full lg:max-w-xs">
                                        <label htmlFor="search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Home
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    About
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Projects
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Stats
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Sign In
                                </Disclosure.Button>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>


        </>
    )
}