import React, { useState } from "react";
import { useEffect } from "react";
import { Navbar } from "../home/navbar/Navbar";
import axios from "axios";
import { GlobalWork } from "./GlobalWork";
import { useSelector } from "react-redux";
import { API } from "../../config";
// import { Navbar } from "./navbar/Navbar";

export const Work = () => {
	const { user } = useSelector((state) => ({ ...state }));
	console.log(user)

	const [workdata, setWorkData] = useState([]);

	useEffect(() => {
		const getWorkData = async () => {
			const { data } = await axios.get(`${API}/getPosts`);
			setWorkData(data);
		};
		getWorkData();
	}, []);

	console.log(workdata);

	return (
		<>
			<Navbar />
			<GlobalWork />
			{workdata.map((work, index) => {
				console.log(work.image)
				return (
					<div className="dark:bg-gray-800 dark:text-gray-50 pb-8">
						<div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
							<div className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4" style={{ "backgroundImage": `url(${work.image})`, "backgroundPosition": "center", "backgroundBlendMode": "multiply", "backgroundSize": "cover" }}></div>
							<div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
								<div className="flex justify-start">
									<span className="px-2 py-1 text-xs rounded-full dark:bg-green-400 dark:text-gray-900">{work.domain}</span>
								</div>
								<h1 className="text-3xl font-semibold">{work.title}</h1>
								<p className="flex-1 pt-2">{work.description}</p>
								<a rel="noopener noreferrer" href="/" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-green-400">
									<span>Apply here</span>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
										<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
									</svg>
								</a>
								<div className="flex items-center justify-between pt-2">
									<div className="flex space-x-2">
										<div>
											<a rel="noopener noreferrer" href="/" className="flex items-center">
												<img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
												<span className="hover:underline dark:text-gray-400">{work.name}</span>
											</a>
										</div>
									</div>
									<span className="text-xs">3 min read</span>
								</div>
							</div>
						</div>
					</div>
				)
			})}

		</>
	)
}