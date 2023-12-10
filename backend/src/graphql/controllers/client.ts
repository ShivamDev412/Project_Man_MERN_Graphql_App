import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { ClientType } from "../types";
import Client from "../../db/models/Client";

export const addClient = {
  type: ClientType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    parent: any,
    args: { name: any; email: any; phoneNumber: any }
  ) => {
    try {
      const newClient = new Client({
        name: args.name,
        email: args.email,
        phoneNumber: args.phoneNumber,
      });
      await newClient.save();
      return newClient;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
export const deleteClient = {
  type: ClientType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent: any, args: { id: string }) => {
    try {
      const deletedClient = await Client.findByIdAndDelete(args.id);
      if (!deletedClient) {
        throw new Error("Client not found");
      }
      return deletedClient;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete client");
    }
  },
};
