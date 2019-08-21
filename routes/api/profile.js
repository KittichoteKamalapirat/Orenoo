const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

// @ route    GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route    GET api/profile/user/:user_id
// @desc      Get profile by user ID (other users)
// @access    Private -> can access req.user.id, use params
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    });

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.send(500).send('Server Error');
  }
});

// @ route    PUT api/profile
// @desc      Update profile
// @access    Private

router.post('/', auth, async (req, res) => {
  const {
    google,
    dict,
    mnemonic,
    synonym,
    example,
    inSentence,
    thai,
    youdao
  } = req.body;

  // Build profile object
  let profileFields = {};
  profileFields.user = req.user.id;
  if (google !== null) profileFields.google = google;
  if (dict !== null) profileFields.dict = dict;
  if (mnemonic !== null) profileFields.mnemonic = mnemonic;
  if (synonym !== null) profileFields.synonym = synonym;
  if (example !== null) profileFields.example = example;
  if (inSentence !== null) profileFields.inSentence = inSentence;
  if (youdao !== null) profileFields.youdao = youdao;
  if (thai !== null) profileFields.thai = thai;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update the profile
      console.log('before update');
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //Create if the profile was not found
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
