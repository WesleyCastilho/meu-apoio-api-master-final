import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/api/users', UserController.store);
routes.post('/api/session', SessionController.store);
routes.post('/api/providers', ProviderController.store);

routes.use(authMiddleware);
routes.get('/api/session', SessionController.index);

routes.put('/api/users', UserController.update);

routes.get('/api/users', UserController.index);
routes.get('/api/users/:id', UserController.show);
routes.get('/api/providers', ProviderController.index);

routes.get('/api/providers/:providerId/available', AvailableController.index);

routes.post('/api/appointments', AppointmentController.store);
routes.get('/api/appointments', AppointmentController.index);
routes.delete('/api/appointments/:id', AppointmentController.delete);

routes.get('/api/schedule', ScheduleController.index);

routes.get('/api/notifications', NotificationController.index);
routes.put('/api/notifications/:id', NotificationController.update);

routes.post('/api/files', upload.single('file'), FileController.store);

export default routes;
