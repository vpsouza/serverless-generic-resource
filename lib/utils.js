module.exports = {
    resolveSuccess: function(res, result){
        if(result){
            res.send(200, Array.isArray(result) ? {length: result.length, result: result} : result);
        } else {
            res.send(200, Array.isArray(result) ? {length: 0, result: []} : {});
        }
    },
    resolveError: function(res, body, logger){
        if(logger){
            logger.error(err);
        }
        res.send(body);
    },
    prepare: (f, ...args) => () => f(...args)
}