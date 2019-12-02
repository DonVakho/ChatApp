const graphql = require('graphql');
const mongoose = require('mongoose');

const User = require('../models/users')
const Message = require('../models/messages')
const Room = require('../models/room')

mongoose.set('useFindAndModify', false);

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean } = graphql;

const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: () => ({
        id: { type: GraphQLString },
        roomName: { type: GraphQLString },
        firstUser: { type: GraphQLBoolean },
        secondUser: { type: GraphQLBoolean },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, _) {
                return Message.find({ roomId: parent.id })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, _) {
                return User.find({ roomId: parent.id })
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        roomId: { type: GraphQLString },
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        roomId: { type: GraphQLString },
        userId: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { userName: { type: GraphQLString } },
            resolve(_, args) {
                return User.findOne({ userName: args.userName })
            }
        },
        userConf: {
            type: UserType,
            args: { userName: { type: GraphQLString }, password: { type: GraphQLString } },
            resolve(_, args) {
                return User.findOne({ userName: args.userName, password: args.password })
            }
        },
        messages: {
            type: MessageType,
            args: { roomId: { type: GraphQLString } },
            resolve(_, args) {
                return Message.find({ roomId: args.id });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(_, __) {
                return User.find({});
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args) {
                let user = new User({
                    userName: args.userName,
                    password: args.password
                })
                return user.save();
            }
        },
        removeUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedUser = User.findByIdAndRemove(args.id).exec();
                if (!removedUser) {
                    throw new Error(`Couldn't find User with id: ${args.id}`)
                } else {
                    return removedUser;
                }
            }
        },
        addRoom: {
            type: RoomType,
            args: {
                roomName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(_, args) {
                let room = new Room({
                    roomName: args.roomName
                });
                return room.save();
            }
        },
        removeRoom: {
            type: RoomType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedPost = Room.findByIdAndRemove(args.id).exec();
                if (!removedPost) {
                    throw new Error(`Couldn't find Post with id: ${args.id}`)
                }
                const removedMessages = Message.deleteMany({ roomId: args.id }).exec()
                if (!removedMessages) {
                    console.log('there were no messages in this room')
                }
                return removedPost;
            }
        },
        removeMessages: {
            type: MessageType,
            args: { roomId: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(_, args) {
                const removedMessages = Message.deleteMany({ roomId: args.id }).exec()
                if (!removedMessages) {
                    console.log('there were no messages in this room')
                }
                return removedMessages;
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})