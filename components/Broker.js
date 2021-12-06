import React from 'react'

const data=[
    {
        "name": "Kelly Wilson",
        "phone": "(580) 718-1418",
        "country": "Belgium",
        "alphanumeric": "CEQ29ZDQ7BC",
        "address": "P.O. Box 411, 1250 Massa Avenue",
        "email": "at.arcu.vestibulum@aol.net"
    },
    {
        "name": "Fuller Alford",
        "phone": "1-397-656-1451",
        "country": "Vietnam",
        "alphanumeric": "TIC27IBU9GN",
        "address": "Ap #876-5724 Interdum. Street",
        "email": "arcu.iaculis@yahoo.edu"
    },
    {
        "name": "Gannon Mclaughlin",
        "phone": "1-433-401-0634",
        "country": "Vietnam",
        "alphanumeric": "BFV11YKK8DJ",
        "address": "Ap #582-9925 Quisque St.",
        "email": "et.magnis.dis@icloud.com"
    },
    {
        "name": "Drake Woods",
        "phone": "(746) 705-7361",
        "country": "Australia",
        "alphanumeric": "QFE23QVL4HT",
        "address": "6162 Tincidunt Rd.",
        "email": "nunc.ac@google.edu"
    },
    {
        "name": "Kalia Sanchez",
        "phone": "(267) 428-1473",
        "country": "Turkey",
        "alphanumeric": "LKB53IQW1AV",
        "address": "616-8053 Auctor, Avenue",
        "email": "at@aol.net"
    }
]
const Broker=()=>{
    return(
        <>
            <h2>Top 10 Brokers</h2>
            {data.map((dat)=>{
                return(
                <div>
                    <div className='flex justify-between  h-12  rounded-md bg-indigo-500 my-5 text-white'>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Name:{dat.name}</p>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Phone:{dat.phone}</p>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Email:{dat.email}</p>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Country:{dat.country}</p>
                        <button>Read More</button>

                    </div>
                </div>

                )})}
        </>
    )
}

export  default  Broker

