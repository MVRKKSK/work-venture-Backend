import React, { useState } from "react";
import { Navbar } from "../home/navbar/Navbar";
import event from "./event.svg"
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../../config";
export const PostWork = () => {
    const { user } = useSelector((state) => ({ ...state }));


    const initialValues = {
        title: "",
        Description: "",
        link: "",
        domain: "",
        image: "",
        user: user.id
    }
    const [formdata, setFormdata] = useState(initialValues);

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        let imageUrl;
        if (name === "image") {
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("fileName", files[0].name);
            const res = await axios.post(`${API}/uploadImages`, formData)

            imageUrl = res.data[0].url;
        }
        setFormdata({ ...formdata, [name]: name === "image" ? imageUrl : value });
    }
    console.log(formdata);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata.image)
        try {
          const data = await axios.post(`${process.env.REACT_APP_API_URL}/createPost`, formdata).then(res => res.data).catch(err => console.log(err));
    console.log(data)
        } catch (err) {
          console.log(err);
        }

    }
    return (
        <>
            <Navbar />
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Start an Event</h2>
                        <div className="dark:text-gray-400">Vivamus in nisl metus? Phasellus.</div>
                    </div>
                    <img src={event} alt="" className=" h-96 w-96 " />
                </div>
                <form onSubmit={handleSubmit} novalidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div>
                        <label for="name" className="text-sm">Title</label>
                        <input id="name" name="title" onChange={handleChange} type="text" placeholder="" className="w-full border-2 border-white outline-none p-3 rounded dark:bg-gray-800" />
                    </div>
                    <div>
                        <label for="text" className="text-sm">Hackathon or Project Overview Link (if any)</label>
                        <input id="text" name="link" onChange={handleChange} type="text" className="w-full  p-3 rounded border-2  border-white outline-none dark:bg-gray-800" />
                    </div>
                    <div>
                        <label for="message" className="text-sm">Description</label>
                        <textarea id="message" name="Description" onChange={handleChange} rows="3" className="w-full  p-3 rounded border-2 border-white outline-none dark:bg-gray-800"></textarea>
                    </div>

                    <fieldset className="w-full space-y-1 dark:text-gray-100">
                        <label for="files" className="block text-sm font-medium">Select Image for Event</label>
                        <div className="flex">
                            <input type="file" onChange={handleChange} name="image" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" />
                        </div>
                    </fieldset>
                    <select id="domain" name="domain" onChange={handleChange} class="dark:bg-gray-800 dark:text-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue="web Development">Web Development</option>
                        <option >Machine Learning / AI</option>
                        <option >App Development</option>
                        <option >Blockchain / Web 3</option>
                        <option >Cloud Computing</option>
                        <option >Design</option>
                        <option >AR / VR</option>
                        <option >Cybersecurity</option>
                        <option >Gaming</option>
                        <option >IoT</option>
                    </select>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-green-400 dark:text-gray-900">Launch Event</button>
                </form>
            </div>
        </>
    )
}