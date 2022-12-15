const errorHandlerMiddleware = async(err, req, res, next) => {
    console.log(error)
    return res.status(500).json({msg: 'Something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware;
