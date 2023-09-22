const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
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

router.get("/post",  withAuth, async (req, res) => {
  try{
    res.render("post", { logged_in: req.session.logged_in, })
  }catch(error){
    res.status(500).json(error);
  }
})

router.get('/profile', withAuth, async (req,res) =>{
  try{

    const userId = req.session.user_id;

    const dbUserData = await User.findByPk(userId, {
      attributes: ['username', 'displayName', 'email']
    })

    const user = dbUserData.get({ plain: true });
    const postPartial = true;

    res.render('profile', { user, postPartial, logged_in: req.session.logged_in });

  }catch(error){
    res.status(500).json(error);
  }
  
});

router.get('/profile/:username', withAuth, async (req, res) => {
  try{
    const reqUser = req.params.username;
    const dbUserData = await User.findOne({
      where: { username: reqUser },
      attributes: ['username', 'displayName'] // Specify the attributes you want
    });

    const user = dbUserData.get({ plain: true });

    if(dbUserData){
      res.render('profile', { user, logged_in: req.session.logged_in})
    }else{
      res.status(404).send('User not found');
    }

  }catch(error){
    res.status(500).json(error);
  }
});

module.exports = router;
