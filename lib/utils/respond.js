const respond = asyncFn => {
    return (req, res, next) => {
        asyncFn(req)
            .then(data => {
                if(req.id && !data) {
                    throw {
                        status: 404,
                        error: `id ${req.id} not found`
                    };
                }
                else res.json(data);
            })
            .catch(next);
    };
};

module.exports = {
    respond
};