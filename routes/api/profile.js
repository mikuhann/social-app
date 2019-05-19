const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator/check');

// @route   GET api/profile/me
// @desc    Get currents user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: `There is no profile for this user` });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server Error`);
  }
});

// @route   Post api/profile/
// @desc    Create/update user profile
// @access  Private
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;
  const profileFields = {};
  profileFields.social = {};
  profileFields.user = req.user.id;
  profileFields.company = company || null;
  profileFields.website = website || null;
  profileFields.location = location || null;
  profileFields.status = status || null;
  profileFields.bio = bio || null;
  profileFields.skills = skills.split(',').map((skill) => skill.trim()) || null;
  profileFields.githubusername = githubusername || null;
  profileFields.social.youtube = youtube || null;
  profileFields.social.twitter = twitter || null;
  profileFields.social.facebook = facebook || null;
  profileFields.social.linkedin = linkedin || null;
  profileFields.social.instagram = instagram || null;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true});
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profile/
// @desc    Get all users profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profileList = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profileList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!userProfile) {
      return res.status(400).json({ msg: 'Profile not found'});
    }
    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo remove users posts
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.put('/experience', [ auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found.Create profile first' });
    }
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    const index = profile.experience.findIndex((item) => item.id === req.params.exp_id);
    if (index > -1) {
      profile.experience.splice(index, 1);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
