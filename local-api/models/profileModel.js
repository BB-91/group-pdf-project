import {Sequelize} from "sequelize";
import { sequelize } from "../db/index.js";


export const Profile = sequelize.define("profiles", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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