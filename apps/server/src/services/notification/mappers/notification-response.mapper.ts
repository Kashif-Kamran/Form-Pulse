import { NotificationDocument } from 'src/database/models/notification.model';
import { NotificationPublic } from '@repo/shared';

export const mapDocumentToResponse = (
  doc: NotificationDocument,
): Omit<NotificationPublic, 'sender' | 'recipient' | 'animal'> => {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    type: doc.type,
    priority: doc.priority,
    status: doc.status,
    taskDetails: doc.taskDetails,
    readAt: doc.readAt,
    acceptedAt: doc.acceptedAt,
    rejectedAt: doc.rejectedAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    isDeleted: doc.isDeleted,
    deletedAt: doc.deletedAt,
  };
};
