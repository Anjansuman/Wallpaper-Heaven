import { Router } from "express";

import { user } from "@repo/zod/index";
import { jwtSigner } from "../utils/jwtSigner";

const router = Router();

router.post("", (req, res) => {
    try {
        
        const body = req.body;
        //safe parse with zod
        const parsedBody = user.safeParse(body);

        if(!parsedBody.success) {
            res.status(404).json({
                message: "Invalid user data!"
            });
            return;
        }

        // db call

        const toekn = jwtSigner(userId);
        
        

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});

export default router;