const router = require("express").Router();
const { User, Post } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUserData = await User.create({
      username: req.body.username,
      displayName: req.body.displayName,
      password: req.body.password,
      email: req.body.email,
    });

    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;

      res.json({ user: newUserData ,message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/post", async (req, res) => {
  try {

    const userId = req.session.user_id;

    const postData = await Post.create({
      user_id: userId,
      content: req.body.content,
      postDate: req.body.postDate,
      backgroundImage: req.body.backgroundImage,

    });
    res.status(200).json(postData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/post", async (req, res) => {
  try {
    const postData = await Post.findAll();

    res.status(200).json(postData);
  }
  catch (error) {
    res.status(500).json(error);
  }
})


router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id' ,"username"]
    });

    const usernames = users.map((user) => user.username)

    res.status(200).json(usernames);

  } catch (error) {
    res.status(500).json(error);
  }
})

router.get("/:username", async (req, res) => {
  try {
    const reqUser = req.params.username;
    const dbUserData = await User.findOne({
      where: { username: reqUser },
      attributes: ['id', 'username']
    });

    const user = dbUserData.get({ plain: true });

    if (dbUserData) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
    
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
