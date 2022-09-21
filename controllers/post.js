// const post = require("../models/post");
const post = require("../models/post");
const cloudinary = require("../utils/cloudinary");

exports.createPost = async(req, res) => {
    try {
        console.log(req.body)
        const Post = await new post(req.body).save();
        res.json(Post);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

exports.getposts = async(req, res) => {
    try {
        const posts = await post
            .aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    },
                },
                {
                    $unwind: "$user"
                },

            ])
        const data = posts.map((post) => {
            return {
                _id: post._id,
                name: post.user.name,
                email: post.user.email,
                college: post.user.college,
                title: post.title,
                description: post.Description,
                domain: post.domain,
                link: post.link,
                image: post.image,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                comments: post.comments
            }
        })
        res.json(data)
    } catch (err) {
        console.log(err)
    }
}
exports.getPostbyCollege = async(req, res) => {
    try {
        const { college } = req.body
        const posts = await post
            .aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    },
                },
                {
                    $unwind: "$user"
                },
                {
                    $match: {
                        "user.college": college
                    }
                },
            ])
        const data = posts.map((post) => {
            return {
                _id: post._id,
                name: post.user.name,
                email: post.user.email,
                college: post.user.college,
                title: post.title,
                description: post.Description,
                domain: post.domain,
                link: post.link,
                image: post.image.url,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                comments: post.comments
            }
        })
        res.json(data)
    } catch (err) {
        console.log(err)
    }
}

exports.getPostByuser = async(req, res) => {
    try {
        console.log(req.body.email)
        const { email } = req.body
        const posts = await post
            .aggregate([{
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    },
                },
                {
                    $unwind: "$user"
                },
                {
                    $match: {
                        "user.email": email
                    }
                },
            ])
        const data = posts.map((post) => {
            return {
                _id: post._id,
                name: post.user.name,
                email: post.user.email,
                college: post.user.college,
                title: post.title,
                description: post.Description,
                domain: post.domain,
                link: post.link,
                image: post.image.url,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                comments: post.comments
            }
        })
        res.json(data)
    } catch (err) {
        console.log(err)
    }
}

exports.deletePost = async(req, res) => {
    const { id } = req.body
    try {
        const deletedpost = await post.findByIdAndDelete(id)
        res.json(deletedpost)
    } catch (err) {
        res.status(400).json(err)
    }

}