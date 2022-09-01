const express = require("express");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const server = express();

server.use(express.json());

server.use("/product", productRoutes);
server.use("/category", categoryRoutes);

module.exports = server;
