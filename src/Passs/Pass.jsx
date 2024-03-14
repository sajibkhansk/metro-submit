import React, { useContext, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../Providers/AuthProviders";
import Navbar from '../Navbar/Navbar';

const Pass = () => {
    const [show, setShow] = useState(false)
    const dateApi = 'https://worldtimeapi.org/api/timezone/Asia/Dhaka';
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dataParam = searchParams.get('data');
    const data = JSON.parse(decodeURIComponent(dataParam));

    const formdata = location.state;
    console.log(formdata)
    console.log(data)


    const [ticketSend, setTicketSend] = useState(true);
    const [mrtSend, setMrtSend] = useState(true);
    const [dateM, setDateM] = useState("");
    const getDate = (dateString) => {
        const date = new Date(dateString);
        let monthName = date.toLocaleString('default', { month: 'long' });
        const print = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
        return print;
    }
    const [date, setDate] = useState('');
    useEffect(() => {
        fetch(dateApi)
            .then(res => res.json())
            .then(data => {
                const dateTime = data.datetime.split('T');
                setDateM(getDate(dateTime[0]));
            })
    });


    useEffect(() => {
        const date = dateM.split(', ');
        const d = parseInt(date[1]) + 10;
        setDate(date[0] + ', ' + d);
    }, [dateM])

    useEffect(() => {
        if (user !== null && data !== null && ticketSend) {
            data.phone = user?.phoneNumber;
            data.id = "MRT-" + user?.phoneNumber;
            setTicketSend(false)
            sendData(data);
        }

    }, [user])
    useEffect(() => {
        console.log(user, formdata);
        if (user !== null && formdata !== null && mrtSend) {
            formdata.date = dateM
            formdata.expire = date
            formdata.balance = 300
            formdata.id = "MRT-" + formdata.phone;
            formdata.user_email = user?.email;
            console.log("inside");
            setMrtSend(false)
            sendMrt(formdata);
        }

    }, [user])
    console.log(data)
    console.log(user)
    console.log(formdata)
    const sendData = (data) => {
        fetch('https://metro-server-sajibkhansk.vercel.app/bookTicket', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                }
            })
    }
    const sendMrt = (data) => {
        fetch('https://metro-server-sajibkhansk.vercel.app/postMrt', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                }
            })
    }

    useEffect(() => {
        // Set showPicture to true initially
        setShow(true);
    
        // Clear the picture after 3 seconds
        const timer = setTimeout(() => {
          setShow(false);
        }, 5000);
    
        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
      }, []);

      return (
        <div>
            <Navbar></Navbar>

            {
                show ?
                    <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
                        <figure><img src="https://repository-images.githubusercontent.com/198359987/a5145380-e312-11e9-89e0-33b42410e0fd" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Enter Your Number!</h2>
                            <div className='form-control border'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
                                    <input disabled value="01xxxxxxxx" type="text" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value="******" disabled type="password" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                                </div>

                            </div>
                            <div className="card-actions justify-end">
                                <button onClick={() => navigate(`/pass?data=${encodeURIComponent(JSON.stringify(dataParam))}`)} className="btn btn-primary">Proceed</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="w-8/12 mx-auto my-5">

                        <div className="w-full bg-gray-100  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <div className=' border-b-2 border-red-600 rounded-t-lg'>
                                <div className='flex justify-between items-center my-3 py-2 md:px-5 px-3'>
                                    <div className="flex flex-row items-center">
                                        <img src="https://seeklogo.com/images/D/dhaka-mass-transit-company-limited-dmtcl-logo-DA9F1D1088-seeklogo.com.png" className="md:h-8 h-6 md:w-12 w-8"></img>
                                        <a className="md:text-2xl text-md ml-2 normal-case">Dhaka Metro</a>
                                    </div>
                                    <div className='border-2 border-green-800 rounded-lg py-1 md:px-4 px-1'>
                                        <h1 className='text-green-700 md:text-xl text-sm uppercase'> {data ? "regular" : "MRT"}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='px-8 py-8 md:grid grid-cols-6 gap-4 bg-yellow-100'>


                                <div className='col-span-4'>
                                    <div className='mb-8'>
                                        {
                                            data ? '' : <h1 className='md:text-3xl text-xl uppercase font-bold mb-2'>{formdata.name}</h1>
                                        }
                                        <h3 className='md:text-xl text-md font-semibold uppercase'>Phone: {formdata ? formdata.phone : user ? user.phoneNumber : ''}</h3>
                                        {
                                            data ? '' : <h3 className='md:text-xl text-md font-semibold uppercase'>{formdata.id}: {formdata.no}</h3>
                                        }

                                    </div>
                                    <h2 className='md:text-3xl text-xl font-semibold uppdercase mb-4'>{data ? "Ticket info" : "MRT PASS INFO"}</h2>
                                    <div className='md:flex justify-between'>
                                        <div>
                                            <div className='mb-4'>
                                                <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>MRT ID</h1>
                                                <h1 className='md:text-xl text-md'>MRT-{formdata ? formdata.phone : user ? user.phoneNumber : ''}</h1>
                                            </div>
                                            <div>
                                                <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>Balance</h1>
                                                <h1 className='md:text-xl text-md'>{data ? data.fair : "300 BDT"}</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='mb-4 mt-3'>
                                                <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>{data ? "From" : "Issued date"}</h1>
                                                <h1 className='md:text-xl text-md'>{data ? data.from : dateM}</h1>
                                            </div>
                                            <div>
                                                <h1 className='md:text-2xl text-lg uppercase text-semibold border-b-2 border-gray-500 mb-2'>{data ? "To" : "Expiry date"}</h1>
                                                <h1 className='md:text-xl text-md'>{data ? data.to : date}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-2 pr-4 md:flex flex-col items-center justify-between mt-3'>
                                    <QRCode value={user?.phoneNumber}></QRCode>
                                    <p className='md:ml-10'><span className='md:text-lg text-md font-semibold mt-1 '>Issued By</span> <br /> <span className='md:text-lg text-md'>Dhaka Metro Authority</span></p>
                                </div>
                            </div>

                        </div>

                    </div>
            }

        </div>
    );
    

        }
    export default Pass;