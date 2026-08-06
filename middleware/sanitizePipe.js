import express from 'express';
import validator from 'validator';

const sanitizeData = (data) => {
  if (typeof data === 'string') {
    return validator.escape(validator.trim(data));
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  }

  if (data !== null && typeof data === 'object') {
    const sanitizedObject = {};

    for (const key of Object.keys(data)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }

      sanitizedObject[key] = sanitizeData(data[key]);
    }

    return sanitizedObject;
  }

  return data;
};

const globalSanitizerPipe = (req, res, next) => {
  if (req.body) req.body = sanitizeData(req.body);
  if (req.query) req.query = sanitizeData(req.query);
  if (req.params) req.params = sanitizeData(req.params);

  next();
};

export default globalSanitizerPipe;