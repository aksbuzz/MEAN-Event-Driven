module.exports = {
  SUCCESS: {
    code: 200,
    message: 'Success',
    success: true
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Bad Request. Please check your request and try again.',
    success: false
  },
  NOT_FOUND: {
    code: 404,
    message: 'Not Found. Please check your request and try again.',
    success: false
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error. Please try again.',
    success: false
  }
}