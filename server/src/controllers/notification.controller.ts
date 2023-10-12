import { Request, Response } from 'express';
import * as NotificationService from '../services/notification.service';

export const sendMedicationNotifications = async (req: Request, res: Response) => {
    try {
        const notificationsSent = await NotificationService.sendMedicationNotifications();
        res.status(200).json({ message: `${notificationsSent} notifications sent successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Error sending medication notifications' });
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        const notifications = await NotificationService.getNotificationsForUser(userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

export const markAsSeen = async (req: Request, res: Response) => {
    try {
        const notificationId = req.params.notificationId;
        const updatedNotification = await NotificationService.markNotificationAsSeen(notificationId);
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as seen' });
    }
};