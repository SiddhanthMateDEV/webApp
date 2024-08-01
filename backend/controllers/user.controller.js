import User from '../models/user.model.js';
import SendErrorMessage from '../lib/utils/errorHandles.js';

export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if(!user){
            return res.status(401).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: `Error occuring in the getUserProfile function: ${error.message}`});
        console.error(`Error occuring in the getUserProfile function: ${error.message}`);
    }
}

export const followUnfollow = async (req, res) => {
    try {

        const { id } = req.params;
        const userModifyRelation = await User.findById(id);
        const currUser = await req.User.findById(req.user._id);

        if(id === req.user._id){
            return res.status(400).json({
                error: "You cannot follow/unfollow yourself"
            });
        }

        if(!userModifyRelation || !currUser){
            return SendErrorMessage(res, 400, `followUnfollow function cannot find current and foreign user`);
        }

        const followingSet = new Set(currUser.following);
        const isFollowing = followingSet.has(id);

        try {
            if(isFollowing){
                await User.findByIdAndUpdate(id, {
                    $pull: {followers: req.user._id}
                });
                await User.findByIdAndUpdate(req.user._id, { 
                    $push: {following: id}
                });
                res.status(200).json({
                    message: "User unfollowed successfully"
                });
            } else {
                await User.findByIdAndUpdate(id,{ 
                    $push: {followers: req.user._id} 
                });
                await User.findByIdAndUpdate(req.user._id,{ 
                    $push: {following: id} 
                });
                res.status(200).json({
                    message: "User followed successfully"
                });
            }
        } catch (error) {
            res.status(500).json({error: `Error occuring in the followUnfollow operation: ${error.message}`});
            console.error(`Error occuring in the followUnfollow function: ${error.message}`);
        }


    } catch (error) {
        res.status(500).json({error: `Error occuring in the followUnfollow function: ${error.message}`});
        console.error(`Error occuring in the followUnfollow function: ${error.message}`);
    }
}