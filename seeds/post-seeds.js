const { Post } = require("../models");

// user_id,content,postDate,backgroundImage
// YYYY-MM-DD hh:mm:ss
const postData = [
  {
    user_id: 1,
    content: "Our drinks taste good!",
    postDate: "2023-05-15 13:30:00",
    backgroundImage:
      "https://static.vecteezy.com/system/resources/previews/002/596/183/non_2x/blue-sky-and-clouds-wallpaper-background-and-sunny-day-free-photo.jpg",
  },
  {
    user_id: 2,
    content: "Our cars are reliable!",
    postDate: "2023-06-20 08:00:00",
    backgroundImage:
      "https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_960_720.jpg",
  },
  {
    user_id: 3,
    content: "We have many products!",
    postDate: "2023-02-13 12:45:00",
    backgroundImage:
      "https://cdn.pixabay.com/photo/2012/10/26/00/40/cyclone-62957_640.jpg",
  },
];

const seedPosts = () => User.bulkCreate(postData);

module.exports = seedPosts;
