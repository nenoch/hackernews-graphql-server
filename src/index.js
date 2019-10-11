const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
    Query: { // root type
    info: () => `This is the API of a Hackernews Clone`, // root field
    feed: () => links,
    link: (parent, args) => links.find(link => link.id === args.id)
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        update: (parent, args) => {
            let oldLink = links.find(link => link.id === args.id)
            let updatedLink = {
                ...oldLink,
                ...args
            }
            links[links.indexOf(oldLink)] = updatedLink
            return updatedLink
        },
        delete: (parent, args) => {
            let newLinks = links.filter(link => link.id !== args.id)
            links = newLinks
            return links
        }

    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
