import express,{Request,Response,NextFunction} from "express";

const router= express.Router();

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
        res.status(200).json({
            ok:true,
            message:'test api for practices'
        })
})

export default router;