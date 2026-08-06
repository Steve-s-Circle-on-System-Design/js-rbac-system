import express from 'express';
import { Roles } from '../decorators/rolesDecorator.js';
import ROLES from '../config/roles.js';

const getPublicData = (req, res) => {
  res.json({ message: 'Public data accessible by anyone.' });
};

const getUserDashboard = Roles(ROLES.USER, ROLES.ADMIN)((req, res) => {
  res.json({ message: `Welcome ${req.user.name}, this is your user dashboard.` });
});

const getAdminPanel = Roles(ROLES.ADMIN)((req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}, sensitive settings loaded.` });
});

export { getPublicData, getUserDashboard, getAdminPanel };