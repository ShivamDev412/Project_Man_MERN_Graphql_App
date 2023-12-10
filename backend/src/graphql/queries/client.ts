import { GraphQLID, GraphQLList } from "graphql";
import { ClientType } from "../types";
import Client from "../../db/models/Client";

export const clients = {
  type: new GraphQLList(ClientType),
  resolve: () => {
    return Client.find();
  },
};
export const client = {
  type: ClientType,
  args: { id: { type: GraphQLID } },
  resolve: (args: { id: any }) => {
    return Client.findById(args.id);
  },
};
