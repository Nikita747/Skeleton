module.exports = (err, req, res) => {
  if (typeof err === 'string') {
    return res.status(400).json({ message: err });
  }

  if (err.name === 'NotFoundError') {
    return res.statusCode(404);
  }

  if (err.name === 'AccessDenied') {
    return res.statusCode(403);
  }

  console.error(err);
  return res.statusCode(500);
};