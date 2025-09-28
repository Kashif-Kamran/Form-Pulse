import { NotificationPublic, AnimalPublic, PublicUser } from '@repo/shared';

// Mapper for lean notifications with populated sender, recipient, and animal
export const mapLeanNotificationToResponse = (
  notification: any, // Lean object with populated fields
): NotificationPublic => {
  return {
    id: notification._id.toString(),
    title: notification.title,
    description: notification.description,
    type: notification.type,
    priority: notification.priority,
    status: notification.status,
    sender: {
      id: notification.sender._id.toString(),
      name: notification.sender.name,
      email: notification.sender.email,
      role: notification.sender.role,
      isVerified: notification.sender.isVerified,
      createdAt: notification.sender.createdAt,
      updatedAt: notification.sender.updatedAt,
    },
    recipient: {
      id: notification.recipient._id.toString(),
      name: notification.recipient.name,
      email: notification.recipient.email,
      role: notification.recipient.role,
      isVerified: notification.recipient.isVerified,
      createdAt: notification.recipient.createdAt,
      updatedAt: notification.recipient.updatedAt,
    },
    animal: notification.animal
      ? {
          id: notification.animal._id.toString(),
          name: notification.animal.name,
          species: notification.animal.species,
          breed: notification.animal.breed,
          age: notification.animal.age,
          weight: notification.animal.weight,
          isDeleted: notification.animal.isDeleted,
          deletedAt: notification.animal.deletedAt,
        }
      : undefined,
    taskDetails: notification.taskDetails,
    readAt: notification.readAt,
    acceptedAt: notification.acceptedAt,
    rejectedAt: notification.rejectedAt,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
    isDeleted: notification.isDeleted,
    deletedAt: notification.deletedAt,
  } as NotificationPublic;
};
