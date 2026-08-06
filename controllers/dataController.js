import express from 'express';
const getProtectedData = (req, res) => {
  res.json({ message: 'This endpoint is protected with Helmet security headers!' });
};

export default getProtectedData;