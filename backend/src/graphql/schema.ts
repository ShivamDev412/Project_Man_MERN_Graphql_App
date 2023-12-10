import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { addClient, deleteClient } from "./controllers/client";
import { client, clients } from "./queries/client";
import { project, projects } from "./queries/project";
import {
  addProject,
  deleteProject,
  updateProject,
} from "./controllers/project";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    clients,
    client,
    projects,
    project,
  },
});
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient,
    deleteClient,
    addProject,
    deleteProject,
    updateProject,
  },
});
export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
