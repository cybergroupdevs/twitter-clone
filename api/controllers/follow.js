const express = require('express');
const follower = require('../models/followerModel');
const following = require('../models/followingModel');
const {User} = require('../models/user');
const tokenDecoder = require('../models/tokenDecoder');

class followController{
    constructor(){

    }
    async follow(req, res) {
        try{
            const { userhandle, followerhandle } = req.body;
            const userId = await User.findOne({ userhandle: userhandle }).select('_id');
            const followId = await User.findOne({ userhandle: followerhandle }).select('_id');
            let followObj={
                user:userId,
                follower:followId,
            }
            let followingObj={
                user:followId,
                following:userId
            }
            const relation = await follower.getRelation(followObj);
            const followingRelation = await following.getRelation(followingObj);
            
            if( relation== null && followingRelation== null){
                await User.updateOne({ _id: userId._id }, { $inc: { "followerCount": 1 } });
                await User.updateOne({ _id: followId._id }, { $inc: { "followingCount": 1 } });
                await follower.create(followObj);
                await following.create(followingObj);
            
                res.send({
                    success: true,
                    payload: {
            
                    }
                });
                
            }
            else{
                res.send("already following")
            }
        }
        catch(error){
            console.log(error);
        }
    };


    async unfollow(req, res) {
        try{
                const { userhandle, followerhandle } = req.body;
                const userId = await User.findOne({ userhandle: userhandle }).select('_id');
                const followId = await User.findOne({ userhandle: followerhandle }).select('_id');  
                let followObj={
                    user:userId,
                    follower:followId
                }
                let followingObj={
                    user:followId,
                    following:userId
                }

                const relation = await follower.getRelation(followObj);
                const followingRelation = await following.getRelation(followingObj);
                
                if(relation!= null && followingRelation!= null){
                 
                await User.updateOne({ _id: userId._id }, { $inc: { "followerCount": -1 } });
                await User.updateOne({ _id: followId._id }, { $inc: { "followingCount": -1 } });
                await follower.delete(followObj);
                await following.delete(followingObj);

                res.send({
                    success: true,
                    payload: {
                        
                    }
                });
            }

            else{
                res.send("already unfollowed")
            }
        }
        catch(error){
            console.log(error);
        }
    
    };

    async checkRelation(req,res){
        const { userhandle, followerhandle } = req.body;
        const userId = await User.findOne({ userhandle: userhandle }).select('_id');
        const followId = await User.findOne({ userhandle: followerhandle }).select('_id'); 
        let checkObj={
            user:userId,
            follower:followId
        }
        const relation = await follower.getRelation(checkObj);
        if(relation!=null){
            res.send({
                success: true,
                payload: {
                    isRelation: true
                }
            });
        }
        else{
            res.send({
                success: true,
                payload: {
                    isRelation: false
                }
            });
        }
    };

    async getFollowersData(req,res){
        const currentUser = tokenDecoder(req.headers.authorization);
        const currentUserId = currentUser._id;
        const userhandle = req.params.userhandle;
        const userId = await User.findOne({userhandle: userhandle}).select('_id');
        let followersList = await follower.getFollowers({user: userId});
        followersList = await Promise.all(followersList.map(async(followers) =>{
            const hasRelation = await follower.getRelation({ user:  followers.follower._id, follower: userId })
            const isCurrentUserFollowing = await follower.getRelation({user: followers.follower._id, follower: currentUserId})
            return {followers, hasRelation: (hasRelation? true: false), isCurrentUserFollowing: (isCurrentUserFollowing?true: false) }
        }));
        if(followersList!=null){
            res.send({
                success: true,
                payload: {
                    followers: followersList
                }
            });
        }
        else {
            console.log("no followers")
            res.send({
                success: true,
                payload: {
                    followers: "user has no followers"
                }
            });
        }
    };

    async getFollowingData(req,res){
        const currentUser= tokenDecoder(req.headers.authorization);
        const currentUserhandle= currentUser.userhandle;
        const currentUserId = currentUser._id;
        console.log(currentUserhandle,currentUserId);
        const userhandle = req.params.userhandle;
        const userId = await User.findOne({userhandle: userhandle}).select('_id');
        let followingList = await following.getFollowing({user:userId});
        followingList = await Promise.all(followingList.map(async(following) =>{
            const hasRelation = await follower.getRelation({ user: userId, follower: following.following._id })
            const isCurrentUserFollowing = await follower.getRelation({user: following.following._id, follower: currentUserId })
            return {following, hasRelation: (hasRelation? true: false), isCurrentUserFollowing: (isCurrentUserFollowing? true: false)}
        }));
       
        if(followingList!=null){
            res.send({
                success: true,
                payload: {
                    following: followingList
                }
            });
        }
        else {
            console.log("not following anyone")
            res.send({
                success: true,
                payload: {
                    followers: "user does not  follow anyone"
                }
            });
        }
    };
}
module.exports = new followController();