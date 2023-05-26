module.exports = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== 'ADMIN') {
    return res.sendStatus(403);
  }
  next();
};
