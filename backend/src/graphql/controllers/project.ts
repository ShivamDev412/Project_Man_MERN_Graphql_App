import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { ProjectType } from "../types";
import Project from "../../db/models/Project";

export const addProject = {
  type: ProjectType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: new GraphQLEnumType({
        name: "ProjectStatus",
        values: {
          new: { value: "Not Started" },
          progress: { value: "In Progress" },
          completed: { value: "Completed" },
        },
      }),
      defaultValue: "Not Started",
    },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent: any, args: any) => {
    try {
      const project = new Project({
        name: args.name,
        description: args.description,
        status: args.status,
        client: args.clientId,
      });

      await project.save();

      return project;
    } catch (error: any) {
      console.error(error);

      if (error.name === "ValidationError") {
        // Handle validation errors
        throw new Error("Validation failed. Please check your input.");
      } else {
        // Handle other unexpected errors
        throw new Error("Failed to add project. Please try again later.");
      }
    }
  },
};
export const deleteProject = {
  type: ProjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent: any, args: any) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(args.id);
      if (!deletedProject) {
        throw new Error(`No project found with ID ${args.id}`);
      }
      return deletedProject;
    } catch (error: any) {
      console.error(error);
      if (error.name === "CastError") {
        throw new Error("Invalid project ID format");
      } else {
        throw new Error("Failed to delete project. Please try again later.");
      }
    }
  },
};
export const updateProject = {
  type: ProjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: {
      type: new GraphQLEnumType({
        name: "ProjectStatusUpdate",
        values: {
          new: { value: "Not Started" },
          progress: { value: "In Progress" },
          completed: { value: "Completed" },
        },
      }),
      defaultValue: "Not Started",
    },
  },
  resolve: async (parent: any, args: any) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          description: args.description,
          status:args.status
        },
        { new: true }
      );
      if (!updatedProject) {
        throw new Error(`No project found with ID ${args.id}`);
      }
      return updatedProject;
    } catch (error: any) {
      console.error(error);
      if (error.name === "CastError") {
        throw new Error("Invalid project ID format");
      } else {
        throw new Error("Failed to update project. Please try again later.");
      }
    }
  },
};
