import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import event from "./event.svg"
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../config";

export const PostEvent = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const initialValues = {
        title: "",
        description: "",
        link: "",
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
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/createEvent`, formdata).then(res => res.data).catch(err => console.log(err));
            console.log(data)
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Start an Event</h2>
                    <div className="dark:text-gray-400">Host an Event , Webinar , Workshop , Coding Camp</div>
                </div>
                <img src={event} alt="" className=" h-96 w-96 " />
            </div>
            <form onSubmit={handleSubmit} novalidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label for="name" className="text-sm">Title</label>
                    <input name="title" onChange={handleChange} id="name" type="text" placeholder="" className="w-full border-2 border-white outline-none p-3 rounded dark:bg-gray-800" />
                </div>
                <div>
                    <label for="email" className="text-sm">Event Link</label>
                    <input name="link" onChange={handleChange} id="email" type="email" className="w-full  p-3 rounded border-2  border-white outline-none dark:bg-gray-800" />
                </div>
                <div>
                    <label for="message" className="text-sm">Description</label>
                    <textarea name="description" onChange={handleChange} id="message" rows="3" className="w-full  p-3 rounded border-2 border-white outline-none dark:bg-gray-800"></textarea>
                </div>

                <fieldset className="w-full space-y-1 dark:text-gray-100">
                    <label for="files" className="block text-sm font-medium">Select Image for Event</label>
                    <div className="flex">
                        <input name="image" type="file" onChange={handleChange} id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" />
                    </div>
                </fieldset>

                {/* <DatePicker name="date" selected={formdata.date} onChange={(date) => setDate(date)} /> */}

                <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-green-400 dark:text-gray-900">Launch Event</button>
            </form>
        </div>
    )
}