import { data } from "../../../data/index.js";

export const get = async(req, res, next) => {
    try {
        
        res.status(200).json({
            status: 200,
            error: false,
            data: data?.resend_activation
        });
        return;
    }catch(error) {
        next(error);
    }
}