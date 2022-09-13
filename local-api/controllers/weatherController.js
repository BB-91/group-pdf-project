import { WeatherHistory } from "../models/weatherModel.js";    
import validator from "../../src/data/patchValidator.mjs";

export const getWeatherHistory = (req, res) => {
    WeatherHistory.findAll()
        .then(history => {
            res.status(200).send(history)
        })
        .catch(err => {
            console.log(err)
        })
};

export const addWeatherHistory = (req, res) => {
    WeatherHistory.create(req.body)
        .then(() => {
            res.status(201).send({ message: "Created" })
        })
        .catch(err => {
            console.log(err)
        })
};

export const updateWeatherHistory = (req, res) => {
    const { body } = req;
    const { getUpdateKey, getUpdateValue, getWhereKey, getWhereValue, WHERE } = validator;

    const updateKey = getUpdateKey(body);
    const updateValue = getUpdateValue(body);

    const whereKey = getWhereKey(body)
    const whereValue = getWhereValue(body);

    console.log("updateKey: ", updateKey)
    console.log("updateValue: ", updateValue)
    console.log("whereKey: ", whereKey)
    console.log("whereValue: ", whereValue)

    WeatherHistory.update(
        { [updateKey]: updateValue},
        { [WHERE]: {[whereKey]: whereValue}}
    )
    .then(() => {
        res.status(200).send({ message: "Updated" })
    })
    .catch(err => {
        console.log(err)
    })
};