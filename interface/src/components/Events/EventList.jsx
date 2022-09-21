import React, { useState} from "react";
import { useEffect } from "react";
import { Navbar } from "../home/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { API } from "../../config";

export const EventList = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const navigate = useNavigate();

	const [eventdata, setEventdata] = useState([]);
	// const [success, setSuccess] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const link = e.target.value
		const name = user.name
		const email = user.email
		const data = await axios.post(`${API}/email`, { link, name, email })
			.then(res => res.data).catch(err => console.log(err));
		if(data){
			// setSuccess(true);
			navigate("/SuccessPage");
			return;
		}

	}

	useEffect(() => {
		try {
			async function getData() {
				const { data } = await axios.get(`${API}/getEvents`);
				// console.log(data)
				setEventdata(data);
				// console.log(eventdata)
			}
			getData();
		} catch (err) {
			console.log(err)
		}

	}, [])
	console.log(eventdata)

	return (
		<>
			<Navbar />
			<div className="dark:bg-gray-800 dark:text-gray-50">
				<ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 " >
					<li className="nav-item flex-auto text-center" >
						<a href="/EventList" className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      
      focus:border-transparent
      active
    " >Global Events</a>
					</li>

					<li className="nav-item flex-auto text-center" >
						<a href="/CollegeEvents" className="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      
      focus:border-transparent
    " >College Events</a>
					</li>
				</ul>
			</div>
			<section className="dark:bg-gray-800 dark:text-gray-100">
				<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
					<p rel="noopener noreferrer" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
						<img src="https://www.nyit.edu/files/events/Event_20181004_NavigatingTheTechCenterMarketplace_Hero.jpg" alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
						<div className="p-6 space-y-2 lg:col-span-5">
							<h3 className="text-2xl font-semibold sm:text-4xl">Want to Host an Event ?</h3>
							<p className="text-2xl pb-16 text-amber-200">Host any college events , Coding camps , Workshops by an Ease ....</p>
							<a href="/HostEvent"><button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Host Event
							</button></a>
						</div>
					</p>
					<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

						{eventdata.map((event, index) => {

							return (
								<div rel="noopener noreferrer" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900">
									<img className="object-cover w-full rounded h-44 dark:bg-gray-500" alt="" src={`https://source.unsplash.com/random/480x360?${index}`} />
									<div className="p-6 space-y-2">
										<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{event.name}</h3>
										<span className="text-xs dark:text-gray-400">January 21, 2021</span>
										<p>{event.description}</p>
										{/* <form onSubmit={handleSubmit}> */}
										<button onClick={handleSubmit} type="submit" value={event.link} name="link"  className="px-8 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100">Register</button>
										{/* </form> */}
									</div>
								</div>
							)

						})}

					</div>
				</div>
			</section>
		</>
	)
}