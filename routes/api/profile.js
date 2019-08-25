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
    youdao,
    hippo
  } = req.body;

  // Build profile object
  let profileFields = {};
  profileFields.user = req.user.id;

  google === null
    ? (profileFields.google = true)
    : (profileFields.google = google);

  dict === null ? (profileFields.dict = true) : (profileFields.dict = dict);

  mnemonic === null
    ? (profileFields.mnemonic = true)
    : (profileFields.mnemonic = mnemonic);
  synonym === null
    ? (profileFields.synonym = true)
    : (profileFields.synonym = synonym);
  example === null
    ? (profileFields.example = true)
    : (profileFields.example = example);
  inSentence === null
    ? (profileFields.inSentence = true)
    : (profileFields.inSentence = inSentence);
  thai === null ? (profileFields.thai = true) : (profileFields.thai = thai);

  youdao === null
    ? (profileFields.youdao = true)
    : (profileFields.youdao = youdao);

  hippo === null ? (profileFields.hippo = true) : (profileFields.hippo = hippo);

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

// Danger routes
// @ route    PUT api/profile
// @desc      Update all profile for every user
// @access    Private
// router.post('/updateAll', async (req, res) => {
//   try {
//     const users = await User.find();
//     users.forEach(async user => {
//       try {
//         const profile = new Profile({
//           user: user._id,
//           google: true,
//           dict: true,
//           mnemonic: true,
//           synonym: true,
//           example: true,
//           inSentence: true,
//           thai: false,
//           youdao: false,
//           hippo: true
//         });
//         await profile.save();
//         console.log(profile);
//       } catch (err) {
//         console.error(err.message);
//       }
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// router.post('/updateAll', async (req, res) => {
//   try {
//     const profiles = await Profile.find();
//     profiles.forEach(async profile => {
//       profile.hippo = true;
//       await profile.save();
//       console.log(profile);
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });
module.exports = router;
