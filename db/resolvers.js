const bcryptjs = require('bcryptjs');
require('dotenv').config({ path: 'variables.env'});
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');
const Business = require('../models/Business');
const Service = require('../models/Service');
const Pet = require('../models/Pet');

//Create a token
const createToken = (user, secret, expiresIn) => {
    const { id, email, firstName, lastName, phone, avatar } = user;
    return jwt.sign({id, email, firstName, lastName, phone, avatar}, secret, {expiresIn});
}

const resolvers = {
    Query: {
        /* User Queries
        =============================================== */
        getUser: async (_, { token }) => {
            const userId = await jwt.verify(token, process.env.SECRET);
            return userId;
        },

        /* Business Queries
        =============================================== */
        getBusinesses: async () => {
            try {
                const businesses = await Business.find({});
                return businesses;
            } catch (error) {
                console.log(error);
            }
        },

        getBusinessById: async (_, { id }) => {
            //Check if product exists
            const business = await Business.findById(id);

            if(!business) {
                throw new Error('Business not found!')
            }

            return business;
        },
        
        getBusinessByName: async (_, { name }) => {
            //Check if product exists
            const business = await Business.find({name});

            if(!business) {
                throw new Error('Business not found!')
            }

            return business;
        },
        
        getBusinessByCity: async (_, { city }) => {
            //Check if product exists
            const business = await Business.find({city});

            if(!business) {
                throw new Error('Business not found!')
            }

            return business;
        },
        
        getBusinessByZipcode: async (_, { zipcode }) => {
            //Check if product exists
            const business = await Business.find({zipcode});

            if(!business) {
                throw new Error('Business not found!')
            }

            return business;
        },

        /* Service Queries
        =============================================== */
        getServices: async () => {
            try {
                const services = await Service.find({});
                return services;
            } catch (error) {
                console.log(error);
            }
        },

        getServiceById: async (_, { id }) => {
            //Check if service exists
            const service = await Service.findById(id);

            if(!service) {
                throw new Error('Service not found!');
            }

            return service;
        },
        
        getServiceByName: async (_, { name }) => {
            //Check if service exists
            const service = await Service.find({name});

            if(!service) {
                throw new Error('Service not found!');
            }

            return service;
        },

        /* Pet Queries
        =============================================== */
        getPets: async () => {
            try {
                const pets = await Pet.find({});
                return pets;
            } catch (error) {
                console.log(error);
            }
        },

        getPetById: async (_, { id }) => {
            //Check if pet exists
            const pet = await Pet.findById(id);

            if(!pet) {
                throw new Error('Pet not found!');
            }

            return pet;
        },

        getPetByName: async (_, { name }) => {
            //Check if pet exists
            const pet = await Pet.find({name});

            if(!pet) {
                throw new Error('Pet not found!');
            }

            return pet;
        }
    },

    Mutation: {
        /* User Mutations
        =============================================== */
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

        /* Business Mutations
        =============================================== */
        newBusiness: async (_, { input }) => {
            try {
                const newBusiness = new Business(input);

                //Save in Database
                const business = await newBusiness.save();

                return business;
            } catch (error) {
                console.log(error);
            }
        },

        updateBusiness: async(_, { id, input }) => {
            //Check if product exists
            let business = await Business.findById(id);

            if(!business) {
                throw new Error('Business not found!')
            }

            //Update and save in database
            business = await Business.findOneAndUpdate({ _id: id }, input, { new: true });

            return business;
        },
        
        deleteBusiness: async(_, { id}) => {
            //Check if product exists
            const business = await Business.findById(id);

            if(!business) {
                throw new Error('Business not found!')
            }

            //Delete Business from database
            await Business.findOneAndDelete({ _id: id });

            return 'Business deleted!';
        },

        /* Business Mutations
        =============================================== */
        newService: async (_, { input }) => {
            try {
                const newService = new Service(input);

                //Save in Database
                const service = await newService.save();

                return service;
            } catch (error) {
                console.log(error);
            }
        },

        updateService: async (_, {id, input }) => {
            //Check if service exists
            let service = await Service.findById(id);

            if(!service) {
                throw new Error('Service not found!');
            }

            //Update and save in database
            service = await Service.findOneAndUpdate({ _id: id }, input, { new: true });


            return service;
        },

        deleteService: async (_, { id }) => {
            //Check if service exists
            let service = await Service.findById(id);

            if(!service) {
                throw new Error('Service not found!');
            }
            
            //Delete service from database
            await Service.findOneAndDelete({ _id: id });

            return 'Service deleted!'
        },

        /* Pet Mutations
        =============================================== */
        newPet: async (_, { input }) => {
            try {
                const newPet = new Pet(input);

                //Save in Database
                const pet = await newPet.save();

                return pet;
            } catch (error) {
                console.log(error);
            }
        },

        updatePet: async (_, { id, input }) => {
            //Check if pet exists
            let pet = await Pet.findById(id);

            if(!pet) {
                throw new Error('Pet not found!');
            }

            //Update and save in database
            pet = await Pet.findOneAndUpdate({ _id: id}, input, { new: true });

            return pet;
        },

        deletePet: async (_, { id }) => {
            //Check if service exists
            let pet = await Pet.findById(id);

            if(!pet) {
                throw new Error('Pet not found!');
            }

            //Delete pet from database
            await Pet.findOneAndDelete({ _id: id });

            return 'Pet deleted!'
        }
    }
}

module.exports = resolvers;