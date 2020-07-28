const bcryptjs = require('bcryptjs');
require('dotenv').config({ path: 'variables.env'});
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');
const Business = require('../models/Business');
const Service = require('../models/Service');
const Pet = require('../models/Pet');
const Employee = require('../models/Employees');

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

        getPetsByUser: async (_, {}, ctx) => {
            try {
                const pets = await Pet.find({ user: ctx.user.id.toString() });
                return pets;
            } catch (error) {
                console.log(error);
            }
        },

        getPetById: async (_, { id }, ctx) => {
            //Check if pet exists
            const pet = await Pet.findById(id);

            if(!pet) {
                throw new Error('Pet not found!');
            }

            //Check if user can see it
            if(pet.user.toString() !== ctx.user.id) {
                throw new Error("You don't have the credentials to see this pet.");
            }

            return pet;
        },

        /* Employee Queries
        =============================================== */
        getEmployees: async () => {
            try {
                const employees = await Employee.find({});
                return employees;
            } catch (error) {
                console.log(error)
            }
        },

        getEmployeesByUser: async (_, {}, ctx) => {
            try {
                const employees = await Employee.find({ user: ctx.user.id.toString() });
                return employees;
            } catch (error) {
                console.log(error);
            }
        },

        getEmployeeById: async (_, { id }, ctx) => {
            //Check if employee exists
            const employee = await Employee.findById(id);

            if(!employee) {
                throw new Error('Employee not found!');
            }

            //Check if user can see it

            if(!employee.user.toString() === ctx.user.id) {
                throw new Error("You don't have the credentials to see this employee.")
            }

            return employee;
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
        newBusiness: async (_, { input }, ctx) => {
            try {
                const newBusiness = new Business(input);

                //Assign the user (business owner)
                newBusiness.user = ctx.user.id;
                console.log(ctx.user.id);

                //Save in Database
                const business = await newBusiness.save();

                return business;
            } catch (error) {
                console.log(error);
            }
        },

        updateBusiness: async(_, { id, input }, ctx) => {
            //Check if business exists
            let business = await Business.findById(id);

            if(!business) {
                throw new Error('Business not found!')
            }

            //Check identity of the user
            if(business.user.toString() !== ctx.user.id){
                throw new Error("You don't have the credentials to update this Business.");
            }

            //Update and save in database
            business = await Business.findOneAndUpdate({ _id: id }, input, { new: true });

            return business;
        },
        
        deleteBusiness: async(_, { id }, ctx) => {
            //Check if product exists
            const business = await Business.findById(id);

            if(!business) {
                throw new Error('Business not found!')
            }

            //Check identity of the user
            if(business.user.toString() !== ctx.user.id){
                throw new Error("You don't have the credentials to delete this Business.");
            }

            //Delete Business from database
            await Business.findOneAndDelete({ _id: id });

            return 'Business deleted!';
        },

        /* Services Mutations
        =============================================== */
        newService: async (_, { input }, ctx) => {
            try {
                const newService = new Service(input);

                //Assign the user (business owner)

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
        newPet: async (_, { input }, ctx) => {
            try {
                const newPet = new Pet(input);

                //Assign the user (pet owner)
                newPet.user = ctx.user.id;

                //Save in Database
                const pet = await newPet.save();

                return pet;
            } catch (error) {
                console.log(error);
            }
        },

        updatePet: async (_, { id, input }, ctx) => {
            //Check if pet exists
            let pet = await Pet.findById(id);

            if(!pet) {
                throw new Error('Pet not found!');
            }

            //Check the identity of the user
            if(pet.user.toString() !== ctx.user.id) {
                throw new Error("You can't modify this pet. Only owners can modify their pets.");
            }

            //Update and save in database
            pet = await Pet.findOneAndUpdate({ _id: id}, input, { new: true });

            return pet;
        },

        deletePet: async (_, { id }, ctx) => {
            //Check if service exists
            let pet = await Pet.findById(id);

            if(!pet) {
                throw new Error('Pet not found!');
            }

            //Check if the identity of the user
            if(pet.user.toString() !== ctx.user.id) {
                throw new Error("You can't delete this pet. Only owners can delete their pets.");
            }

            //Delete pet from database
            await Pet.findOneAndDelete({ _id: id });

            return 'Pet deleted!'
        },

        /* Employee Mutations
        =============================================== */
        newEmployee: async (_, { input }, ctx) => {
            try {
                const newEmployee = new Employee(input);

                //Assing the user (business owner)
                newEmployee.user = ctx.user.id;

                //Save in Database
                const employee = await newEmployee.save();

                return employee;
            } catch (error) {
                console.log(error)
            }
        },

        updateEmployee: async (_, { id, input }, ctx) => {
            //Check if employee exists
            let employee = await Employee.findById(id);

            if(!employee) {
                throw new Error('Employee not found!');
            }

            //Check the identity of the user
            if(employee.user.toString() !== ctx.user.id){
                throw new Error("You can't modify this employee. Only business owners can modify their business employees.");
            }

            //Update and save in the database
            employee = await Employee.findOneAndUpdate({ _id: id }, input, { new: true });

            return employee;
        },

        deleteEmployee: async (_, { id }, ctx) => {
            //Check if employee exists
            let employee = await Employee.findById(id);

            if(!employee) {
                throw new Error('Employee not found!');
            }

            //Check the identity of the user
            if(employee.user.toString() !== ctx.user.id){
                throw new Error("You can't delete this employee. Only business owners can delete their business employees.");
            }

            //Delete employee from database
            await Employee.findOneAndDelete({ _id: id });

            return 'Employe deleted!'
        }
    }
}

module.exports = resolvers;