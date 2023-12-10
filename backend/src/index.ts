import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
connectDB();
app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.use(express.json());
app.listen(PORT, async () => {
  console.log("listening on port:", PORT);
});
