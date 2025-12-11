import { data } from "../../../data/index.js";

export const get = async(req, res, next) => {
    try {
        
        res.status(200).json({
            status: 200,
            error: false,
            message: "You have successfully fetched registration form data",
            data: data?.register
        });
        return;
    }catch(error) {
        next(error);
    }
}