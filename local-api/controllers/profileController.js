import { Profile } from "../models/profileModel.js";    
import validator from "../../src/data/patchValidator.mjs";

export const getProfiles = (req, res) => {
    Profile.findAll()
        .then(profile => {
            res.status(200).send(profile)
        })
        .catch(err => {
            console.log(err)
        })
};

export const addProfile = (req, res) => {
    Profile.create(req.body)
        .then(() => {
            res.status(201).send({ message: "Created" })
        })
        .catch(err => {
            console.log(err)
        })
};

export const updateProfile = (req, res) => {
    const { body } = req;
    const { getUpdateKey, getUpdateValue, getWhereKey, getWhereValue, WHERE } = validator;

    const updateKey = getUpdateKey(body);
    const updateValue = getUpdateValue(body);

    const whereKey = getWhereKey(body)
    const whereValue = getWhereValue(body);

    Profile.update(
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