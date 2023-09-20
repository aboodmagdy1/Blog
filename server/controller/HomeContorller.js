const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog ",
      description: "Simple Blog created with NodeJs , Express & MongoDb",
    };
    //pagination
    const page = req.query.page * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    //next befor pages
    const pageLastIndex = page * limit;
    const documentsCount = await Post.count();
    const nextPage = page * 1 + 1;
    const hasNextPage = nextPage <= Math.ceil(documentsCount / limit);

    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();

    res.render("index", {
      locals,
      posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const locals = {
      title: post.title,
      description: "Simple Blog created with NodeJs , Express & MongoDb",
    };
    res.render("post", { locals, post });
  } catch (err) {
    console.log(err);
  }
};

exports.searchForPosts = async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs , Express & MongoDb",
    };

    const searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace("/[^a-zA-Z0-9]/g", " ");

    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", { locals, posts });
  } catch (err) {
    console.log(err);
  }
};
