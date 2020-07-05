const bcryptjs = require('bcryptjs');
require('dotenv').config({ path: 'variables.env'});
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');
const Business = require('../models/Business');

//Create a token
const createToken = (user, secret, expiresIn) => {
    const { id, email, firstName, lastName, phone, avatar } = user;
    return jwt.sign({id, email, firstName, lastName, phone, avatar}, secret, {expiresIn});
}

const resolvers = {
    Query: {
        getUser: async (_, { token }) => {
            const userId = await jwt.verify(token, process.env.SECRET);
            return userId;
        }
    },

    Mutation: {
        newUser: async (_, { input }) => {
            const { email, password } = input;
            
            //Check if the user exists
            const userExists = await User.findOne({email});
            console.log(userExists);
            if(userExists) {
                throw new Error('The user is already registered.');
            }

            //Hash password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const user = new User(input);
                //Save in Database
                user.save();
                return user;
            } catch (error) {
                console.log(error);
            }
        },

        userAuthentication: async (_, { input }) => {
            const { email, password } = input;

            //Check if the user exists
            const userExists = await User.findOne({email});
            if(!userExists) {
                throw new Error("The user doesn't exist");
            }

            //Check if password is correct
            const validPassword = await bcryptjs.compare(password, userExists.password);
            if(!validPassword) {
                throw new Error('The password is incorrect');
            }

            //Create the user's token
            return {
                token: createToken(userExists, process.env.SECRET, '24h')
            }
        },

        newBusiness: async (_, { input }) => {
            try {
                const newBusiness = new Business(input);

                //Save in Database
                const business = await newBusiness.save();
                
                return business;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;