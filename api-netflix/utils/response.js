function OK(response, statusCode, data, message) {
  response.status(statusCode).json({ isError: false, data, message });
}

function ERR(response, statusCode, message) {
  response.status(statusCode).json({ isError: true, message });
}

module.exports = { OK, ERR };
