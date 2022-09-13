import {Sequelize} from "sequelize";
import { sequelize } from "../db/index.js";


export const WeatherHistory = sequelize.define("weather_histories", {
        zip: {
            type: Sequelize.INTEGER,
            // autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        data: {
            type: Sequelize.JSON,
        },
    },
        {
            timestamps: false
        }
)