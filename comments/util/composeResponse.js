module.exports = {
  success: (res, message, data = null) => {
    const response = { ...message, data };

    return res.status(message.code).json(response);
  },
  error: (res, message, error = null) => {
    const response = { ...message, error };
    return res.status(message.code).json(response);
  },
};
