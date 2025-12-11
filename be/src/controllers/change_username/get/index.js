import { data } from "../../../data/index.js";

export const get = async(req, res, next) => {
    try {
        
        res.status(200).json({
            status: 200,
            error: false,
            data: data?.change_username
        });
        return;
    }catch(error) {
        next(error);
    }
}