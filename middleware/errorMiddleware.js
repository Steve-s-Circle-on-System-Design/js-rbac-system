import express from 'express';
const errorHandler = (err, req, res, next) => {
  // Log the error internally for server debugging
  console.error('[Error Details]:', err);
  // Safe property check to handle string errors or missing message properties
  const errorMessage = err?.message || 'An unexpected error occurred';
  // Catch CORS policy violations
  if (errorMessage.includes('CORS policy restriction')) {
    return res.status(403).json({
      status: 'fail',
      message: errorMessage,
    });
  }
  // Default fallback for unhandled 500 errors
  return res.status(err.status || 500).json({
    status: 'error',
    message: errorMessage,
  });
};

export default errorHandler;