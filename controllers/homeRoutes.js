const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

<<<<<<< HEAD
router.get("/", async (req, res) => {
=======
router.get('/', withAuth, async (req, res) => {
>>>>>>> b3f8db4cb82334860152a4b3497dd612f1bcbb4c
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
=======
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
>>>>>>> b3f8db4cb82334860152a4b3497dd612f1bcbb4c
    return;
  }

  res.render("login");
});

<<<<<<< HEAD
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
=======
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
>>>>>>> b3f8db4cb82334860152a4b3497dd612f1bcbb4c
    return;
  }

  res.render("signup");
});

router.get('/profile', withAuth, async (req,res) =>{
  try{
    const dbUserData = await User.findOne(req.params.username, {
      include: [
        {
          model: User,
          attributes: [
            'username',
            'displayName',
            'email'
          ]
        }
      ]
    })

    const user = dbUserData.get({ plain: true });

    res.render('profile', { user, logged_in: req.session.logged_in });

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
