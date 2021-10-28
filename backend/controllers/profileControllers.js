const { pick } = require("lodash")
const { Profile } = require("../models/profile")

module.exports.getProfile = async (req, res) => {
    try {
        let userId = req.user._id
        let profile = await Profile.findOne({ user: userId })
        return res.status(200).send(profile)
    } catch (err) {
        console.log(err)
    }
}


module.exports.setProfile = async (req, res) => {
    try {
        let userId = req.user._id
        let userPofile = pick(req.body, ["phone", "address1", "address2", "city", "state", "postcode", "country"])
        userPofile.user = userId
        let profile = await Profile.findOne({ user: userId })
        if (profile) {
            await Profile.updateOne({ user: userId }, userPofile)
        } else {
            profile = new Profile(userPofile)
            let data = await profile.save()
            res.status(200).send(data)
        }
        return res.status(200).send("Updated Successfully!")
    } catch (err) {
        console.log(err)
    }
}