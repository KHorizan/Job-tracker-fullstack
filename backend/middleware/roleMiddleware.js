const authorize = (...allowedroles)=>{
     return(req,res,next)=>{
        try{
    const role = req.user.role;

    if(!allowedroles.includes(role)) 
        return res.status(403).json({message:"Access denied"});
     next();
     }catch(err){
            return res.status(500).json({message:"Server error",err})

        }
    };
};

module.exports = authorize;