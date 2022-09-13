import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("local_weather_api", "root", "password", {
    dialect: "mysql",
    host: "localhost",
});