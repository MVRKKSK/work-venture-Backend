const event = require('../models/Events');

exports.createEvent = async(req, res) => {
    try {

        Event = await new event(req.body).save();
        res.json(Event);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

exports.getEvents = async(req, res) => {
    try {
        const events = await event.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $unwind: '$user'
            },
        ])

        const data = events.map((event) => {
            return {
                _id: event._id,
                name: event.name,
                description: event.description,
                email: event.user.email,
                event_email: event.email,
                name: event.user.name,
                ppImage: event.user.ppImage,
                college: event.user.college,
                link: event.link,
                title: event.title,
                date: event.date,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                image: event.image
            }
        })


        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}
exports.getEventsByCollege = async(req, res) => {
    try {
        const { college } = req.body
        const events = await event.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $unwind: '$user'
            },
            {
                $match: {
                    "user.college": college
                }
            }
        ])

        const data = events.map((event) => {
            return {
                _id: event._id,
                name: event.name,
                description: event.description,
                email: event.user.email,
                event_email: event.email,
                name: event.user.name,
                ppImage: event.user.ppImage,
                college: event.user.college,
                link: event.link,
                date: event.date,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                image: event.image
            }
        })


        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

exports.getEventsByUser = async(req, res) => {
    try {
        const { email } = req.body
        const events = await event.aggregate([{
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $unwind: '$user'
            },
            {
                $match: {
                    "user.email": email
                }
            }
        ])

        const data = events.map((event) => {
            return {
                _id: event._id,
                name: event.name,
                description: event.description,
                email: event.user.email,
                event_email: event.email,
                name: event.user.name,
                ppImage: event.user.ppImage,
                college: event.user.college,
                link: event.link,
                date: event.date,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                image: event.image
            }
        })


        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

exports.deleteEvent = async(req, res) => {
    const { id } = req.body
    try {
        const deletedEvent = await event.findByIdAndDelete(id)
        res.json(deletedEvent)
    } catch (err) {
        res.status(400).json(err)
    }

}