import {services} from "../../../services/index.js"

export const post = async(req, res, next) => {

    try {

        const response = await services.logout({req, res})

        res.status(200).json(response);
    }catch(error) {
        console.error("Error handling logout POST request:", error);
        next(error);
    } 
}