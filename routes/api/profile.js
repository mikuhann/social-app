const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const {  check, validationResult } = require('express-validator/check');

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
module.exports = router;
