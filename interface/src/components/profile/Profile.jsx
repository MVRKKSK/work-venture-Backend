
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Navbar } from "../home/navbar/Navbar";
import { API } from "../../config";

export const Profile = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const userdetails = user;
    const [workdata, setWorkData] = useState([]);

    // console.log(user)
    // console.log({user})

    const { email } = user

    useEffect(() => {
        const getWorkData = async () => {
            const { data } = await axios.post(`${API}/getPostsbyUser`, {
                email: email
            });
            setWorkData(data);
        };
        getWorkData();
    }, [email]);

    const [eventdata, setEventdata] = useState([]);

	useEffect(() => {
		try {
			async function getData() {
				const { data } = await axios.post(`${API}/getEventsByUser`, { email: user.email });
				// console.log(data)
				setEventdata(data);
				// console.log(eventdata)
			}
			getData();
		} catch (err) {
			console.log(err)
		}

	}, [user.email])


    const handlePostDelete = async(id) => {
console.log(id)
        const { data } = await axios.post(`${API}/deletePost`, {
            id
        });
        console.log(data)
        window.location.reload();
    }
    
    const handleEventDelete = async(id) => {
        console.log(id)
                const { data } = await axios.post(`${API}/deleteEvent`, {
                    id
                });
                console.log(data)
                window.location.reload();
            }

    return (
        <>
        <Navbar />

        <div class="p-16">
            <div class="p-8 bg-white shadow mt-24">
                <div class="grid grid-cols-1 md:grid-cols-3">
                    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p class="font-bold text-gray-700 text-xl">Profile Section</p>
                        </div>

                    </div>
                    <div class="relative">
                        <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>


                </div>

                <div class="mt-20 text-center border-b pb-12">
                    <h1 class="text-4xl font-medium text-gray-700">{userdetails.name} <span class="font-light text-gray-500"></span></h1>
                    <p class="font-light text-gray-600 mt-3">{userdetails.email}</p>

                    <p class="mt-8 text-gray-500"></p>
                    <p class="mt-2 text-gray-500">{userdetails.college}</p>


                </div>

                <div>

                    <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
                        <div className="container p-6 mx-auto space-y-8">
                            <div className="space-y-2 text-center">
                                <h2 className="text-3xl font-bold">Work Posts Posted By You</h2>
                                <p className="font-serif text-sm dark:text-gray-400">Here are the latest Work Posts posted by you . You can delete after you find a member</p>
                            </div>
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                                {workdata.map((work, index) => {
                                    return (
                                        <article className="flex flex-col dark:bg-gray-900">
                                            <div rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                                                <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={work.image} />
                                            </div>
                                            <div className="flex flex-col flex-1 p-6">
                                                <div rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></div>
                                                <div rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase hover:underline dark:text-green-400">{work.title}</div>
                                                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{work.description}</h3>
                                                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                                                    <button onClick={(e)=> handlePostDelete(e.target.value)} value={work._id}>Delete</button>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                    <>
                        <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
                            <div className="container p-6 mx-auto space-y-8">
                                <div className="space-y-2 text-center">
                                    <h2 className="text-3xl font-bold">Events Posted by You</h2>
                                    <p className="font-serif text-sm dark:text-gray-400">Here are the latest Events . You can delete after you find a member</p>
                                </div>
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                                {eventdata.map((work, index) => {
                                    return (
                                        <article className="flex flex-col dark:bg-gray-900">
                                            <div rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                                                <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={eventdata.image} />
                                            </div>
                                            <div className="flex flex-col flex-1 p-6">
                                                <div rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></div>
                                                <div rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase hover:underline dark:text-green-400">{eventdata.title}</div>
                                                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{eventdata.description}</h3>
                                                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                                                    <button onClick={(e)=> handleEventDelete(e.target.value)}>Delete</button>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                                </div>
                            </div>
                        </section></>
                </div>



            </div>
        </div>
        </>
    )
}