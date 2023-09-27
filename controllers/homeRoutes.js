const router = require("express").Router();
const { User, Post, Follower } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const following = await Follower.findAll({
      where: { followerId: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    });
  
    const followedUsers = following.map((p) => p.get({ plain: true }));
    const followedUsersIds = following.map((follow) => follow.followedId);
    followedUsersIds.push(req.session.user_id);

    const posts = await Post.findAll({
      where: {
        user_id: followedUsersIds
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'displayName']
        }
      ],
      order: [["postDate", "DESC"]],
    })

    const userPosts = posts.map((p) => p.get({ plain: true }));

    res.render("homepage", {
      logged_in: req.session.logged_in,
      followedUsers,
      userPosts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    //fetching the logged in user
    const dbUserData = await User.findByPk(userId, {
      attributes: ["username", "displayName", "email"],
    });

    const user = dbUserData.get({ plain: true });
    const postPartial = true;

    // fetching the users posts
    const dbPostData = await Post.findAll({
      where: { user_id: userId },
      include: User,
      order: [["id", "DESC"]],
    });
    const userPosts = dbPostData.map((p) => p.get({ plain: true }));

    const following = await Follower.findAll({
      where: { followerId: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    });
  
    const followedUsers = following.map((p) => p.get({ plain: true }));

    const isMobileView = req.headers["user-agent"].includes("Mobile");

    res.render("profile", {
      user,
      userPosts,
      followedUsers,
      postPartial,
      isMobileView,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profile/:username", withAuth, async (req, res) => {
  try {
    // Fetching the user
    const reqUser = req.params.username;
    const followButton = true;
    const dbUserData = await User.findOne({
      where: { username: reqUser },
      attributes: ["id", "username", "displayName"],
    });

    if (!dbUserData) {
      return res.status(404).send("User not found");
    }

    const user = dbUserData.get({ plain: true });

    const dbPostData = await Post.findAll({
      where: { user_id: user.id },
      include: User,
      order: [["id", "DESC"]],
    });

    if (user.id === req.session.user_id) {
      return res.redirect("/profile");
    }

    const following = await Follower.findOne({
      where: {
        followerId: req.session.user_id,
        followedId: dbUserData.id,
      },
    });

    var showUnfollowButton = false;

    if(following){
      showUnfollowButton = true;
    }

    const userPosts = dbPostData.map((p) => p.get({ plain: true }));

    const usersFollowing = await Follower.findAll({
      where: { followerId: user.id },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    });
  
    const followedUsers = usersFollowing.map((p) => p.get({ plain: true }));

    const isMobileView = req.headers["user-agent"].includes("Mobile");

    res.render("profile", {
      user,
      userPosts,
      followButton,
      showUnfollowButton,
      followedUsers,
      isMobileView,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
