// It is basicaaly used for th eautomaticallly eroor handling and this function takse the function as a argument and also return be a funciton

module.exports = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next)
    }
}