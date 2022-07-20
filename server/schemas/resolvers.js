const { UserList, MovieList } = require('../FakeData')

const _ = require("lodash")
const resolvers = {
    Query: {
        users: (parent,args, context, info) => {
            
            if(UserList) return {users: UserList}

            return {message: "There was an error"}
            
        },
        user: (parent, args, context, info) => {
            const id = args.id
            const user = _.find(UserList, { id: Number(id) })
            return user;
        },
        movies: () => {
            return MovieList
        },
        movie: (parent, args) => {
            const name = args.name
            const movie = _.find(MovieList, { name })
            return movie;
        }
    },
    User: {
        favoriteMovies: (parent) => {
            // console.log(parent)
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010)
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input
            const userId = UserList[UserList.length - 1].id + 1
            user.id = userId
            UserList.push(user)
            return user
        },
        updateUser: (parent, args) => {
            const {id, newUsername} = args.input
            let newUser
            UserList.forEach(user => {
                if(user.id === Number(id)){
                    user.username = newUsername
                    newUser = user
                }
            })
            return newUser
        },
        deleteUser: (parent, args) => {
            const id = args.id
            _.remove(UserList, (user) => user.id === Number(id))
            return null
        }
    },
    UsersResult: {
        __resolveType(obj) {
                if(obj.users){
                    return "UsersSuccessfulResult"
                }

                if(obj.message){
                    return "UsersErrorResult"  
                }

                return null
        }
    }
}

module.exports = { resolvers }