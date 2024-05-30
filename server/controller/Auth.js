exports.loginUser = async (req, res) => {
    const user = req.user;
    res
        .cookie('jwt', user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
        .status(201)
        .json({ id: user.id, role: user.role });
}


exports.logout = async (req, res) => {
    res
        .cookie('jwt', null, { expires: new Date(Date.now() + 3600000), httpOnly: true })
        .sendStatus(200);
}