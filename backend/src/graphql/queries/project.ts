import { GraphQLID, GraphQLList } from "graphql";
import { ProjectType } from "../types";
import Project from "../../db/models/Project";

export const projects = {
  type: new GraphQLList(ProjectType),
  resolve: () => {
    return Project.find();
  },
};
export const project = {
  type: ProjectType,
  args: { id: { type: GraphQLID } },
  resolve: (args: { id: any }) => {
    return Project.findById(args.id);
  },
};
