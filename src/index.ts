import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import orderRoutes from "./routes/orderroutes";
import "./queue/orderwork";

dotenv.config();

const app = Fastify();

const PORT = Number(process.env.PORT) || 5000;


app.register(fastifyWebsocket);
app.register(orderRoutes, { prefix: "/api/orders" });

// sequelize.sync({
//     force: true,
// });

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");

    await sequelize.sync({ alter: true });

    await app.listen({ port: PORT, host: "0.0.0.0" }); 
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();