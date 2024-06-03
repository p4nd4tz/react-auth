exports.loginUser = async (req, res) => {
    const user = req.user;
    res
        .cookie('jwt', user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
        .status(201)
        // .json({ id: user.id, role: user.role });
        .json({ id: 1, role: 'admin' })
}


exports.logout = async (req, res) => {
    res
        .cookie('jwt', null, { expires: new Date(Date.now() + 3600000), httpOnly: true })
        .sendStatus(200);
}

exports.checkAuth = async (req, res) => {
    if (req.user) {
        return res.json(req.user);
    } else {
        return res.sendStatus(401);
    }
}