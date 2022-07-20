const { gql } = require('apollo-server');

const typeDefs = gql`
        type User {
            id: ID!
            name: String!
            username: String!
            age: Int!
            nationality:  Nationality!    
            friends: [User]  
            favoriteMovies: [Movie] 
        }
        type Movie {
            id: ID!
            name: String!
            yearOfPublication: Int!
            isInTheaters: Boolean!
        
        }

        type Query {
             users: UsersResult
             user(id:ID!) : User!
             movies: [Movie!]!
             movie(name:String!) : Movie!

        }
        input CreateUserInput {
            name: String!
            username: String!
            age: Int!
            nationality:  Nationality = INDIA
             
        }

        input UpdateUserInput {
            id: ID!
            newUsername: String!
        }
        type Mutation {
        
            createUser(input: CreateUserInput!): User
            updateUser(input: UpdateUserInput!): User
            deleteUser(id: ID!): User
        
        }


        enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY,
        CHILE
        
        }

        type UsersSuccessfulResult {
            users: [User!]!
        
        }
        type UsersErrorResult {
            error: String!
        }

        union UsersResult = UsersSuccessfulResult | UsersErrorResult
`;

module.exports = {typeDefs}