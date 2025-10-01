import { NotificationPublic, PublicUser } from "@repo/shared";
import { RoleType } from "@repo/shared";

// Dummy users
const dummyUsers: {
  sender1: PublicUser;
  sender2: PublicUser;
  sender3: PublicUser;
  currentUser: PublicUser;
} = {
  sender1: {
    id: "507f1f77bcf86cd799439011",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: RoleType.Veterinarian,
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  sender2: {
    id: "507f1f77bcf86cd799439012",
    name: "Mike Thompson",
    email: "mike.thompson@example.com",
    role: RoleType.CareTaker,
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  sender3: {
    id: "507f1f77bcf86cd799439013",
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    role: RoleType.Nutritionist,
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  currentUser: {
    id: "507f1f77bcf86cd799439014",
    name: "John Doe",
    email: "john.doe@example.com",
    role: RoleType.Admin,
    isVerified: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
};

// Dummy animals
const dummyAnimals = [
  {
    id: "507f1f77bcf86cd799439021",
    name: "Bella",
    species: "Cow",
    breed: "Holstein",
    age: 3,
    weight: 650,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "507f1f77bcf86cd799439022",
    name: "Max",
    species: "Horse",
    breed: "Arabian",
    age: 5,
    weight: 450,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "507f1f77bcf86cd799439023",
    name: "Daisy",
    species: "Goat",
    breed: "Boer",
    age: 2,
    weight: 75,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// Received notifications (sent to current user)
export const dummyReceivedNotifications: NotificationPublic[] = [
  {
    id: "507f1f77bcf86cd799439031",
    title: "Vaccination Required for Bella",
    description:
      "Please schedule vaccination for cow Bella. Due date is approaching.",
    type: "Vaccination Request",
    priority: "High",
    sender: dummyUsers.sender1,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[0],
    status: "Pending",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      notes: "Annual vaccination required",
    },
    readAt: undefined,
    acceptedAt: undefined,
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439032",
    title: "Diet Plan Request for Max",
    description:
      "Horse Max needs a new diet plan. Current plan expires next week.",
    type: "Diet Plan Request",
    priority: "Medium",
    sender: dummyUsers.sender2,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[1],
    status: "Accepted",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      notes: "Focus on high-protein diet for racing season",
    },
    readAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    acceptedAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439033",
    title: "Health Check Completed for Daisy",
    description:
      "Health check for goat Daisy has been completed. All results are normal.",
    type: "Health Report Ready",
    priority: "Low",
    sender: dummyUsers.sender1,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[2],
    status: "Completed",
    taskDetails: {
      completedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      notes: "All vital signs normal. Next checkup in 6 months.",
    },
    readAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    acceptedAt: undefined,
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439034",
    title: "System Alert: Feed Stock Low",
    description: "Horse feed stock is running low. Please reorder soon.",
    type: "System Alert",
    priority: "Urgent",
    sender: dummyUsers.sender3,
    recipient: dummyUsers.currentUser,
    animal: undefined,
    status: "Pending",
    readAt: undefined,
    acceptedAt: undefined,
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439035",
    title: "Custom Message: Team Meeting",
    description:
      "Monthly veterinary team meeting scheduled for next Friday at 2 PM.",
    type: "Custom Message",
    priority: "Medium",
    sender: dummyUsers.sender1,
    recipient: dummyUsers.currentUser,
    animal: undefined,
    status: "Pending",
    readAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    acceptedAt: undefined,
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

// Sent notifications (sent by current user)
export const dummySentNotifications: NotificationPublic[] = [
  {
    id: "507f1f77bcf86cd799439041",
    title: "Diet Plan Ready for Bella",
    description:
      "New diet plan for cow Bella is ready for review and implementation.",
    type: "Diet Plan Ready",
    priority: "Medium",
    sender: dummyUsers.currentUser,
    recipient: dummyUsers.sender2,
    animal: dummyAnimals[0],
    status: "In Progress",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      notes: "Includes specialized mineral supplements",
    },
    readAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    acceptedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439042",
    title: "Vaccination Reminder for Max",
    description:
      "Please remember to administer the scheduled vaccination for horse Max.",
    type: "Vaccination Request",
    priority: "High",
    sender: dummyUsers.currentUser,
    recipient: dummyUsers.sender1,
    animal: dummyAnimals[1],
    status: "Overdue",
    taskDetails: {
      dueDateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (overdue)
      notes: "Critical vaccination - cannot be delayed further",
    },
    readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    acceptedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439043",
    title: "Health Check Request for Daisy",
    description: "Please perform routine health check for goat Daisy.",
    type: "Health Check Request",
    priority: "Low",
    sender: dummyUsers.currentUser,
    recipient: dummyUsers.sender1,
    animal: dummyAnimals[2],
    status: "Completed",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      completedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      notes: "Regular monthly checkup",
    },
    readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    acceptedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
];

// Todo notifications (tasks assigned to current user) - Mix of Accepted, In Progress, Completed, Rejected
export const dummyTodoNotifications: NotificationPublic[] = [
  // ACCEPTED - Will show in Todo tab
  {
    id: "507f1f77bcf86cd799439051",
    title: "Diet Plan Request for Max",
    description:
      "Horse Max needs a new diet plan. Current plan expires next week.",
    type: "Diet Plan Request",
    priority: "Medium",
    sender: dummyUsers.sender2,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[1],
    status: "Accepted",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      notes: "Focus on high-protein diet for racing season",
    },
    readAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    acceptedAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439052",
    title: "Schedule Vaccination for Max",
    description: "Coordinate with veterinary team for horse Max vaccination.",
    type: "Vaccination Request",
    priority: "Medium",
    sender: dummyUsers.sender1,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[1],
    status: "Accepted",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      notes: "Annual booster shot required",
    },
    readAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    acceptedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  // IN PROGRESS - Will show in Todo tab
  {
    id: "507f1f77bcf86cd799439053",
    title: "Complete Diet Plan for Bella",
    description: "Finalize and submit the diet plan for cow Bella.",
    type: "Diet Plan Request",
    priority: "High",
    sender: dummyUsers.sender2,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[0],
    status: "In Progress",
    taskDetails: {
      dueDateTime: new Date(), // Today
      notes: "Include weight management plan",
    },
    readAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    acceptedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  // COMPLETED - Will show in Completed tab
  {
    id: "507f1f77bcf86cd799439054",
    title: "Health Check for Daisy",
    description:
      "Health check for goat Daisy has been completed. All results are normal.",
    type: "Health Report Ready",
    priority: "Low",
    sender: dummyUsers.sender1,
    recipient: dummyUsers.currentUser,
    animal: dummyAnimals[2],
    status: "Completed",
    taskDetails: {
      completedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      notes: "All vital signs normal. Next checkup in 6 months.",
    },
    readAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    acceptedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    rejectedAt: undefined,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  // REJECTED - Will show in Rejected tab
  {
    id: "507f1f77bcf86cd799439055",
    title: "Emergency Feed Reorder",
    description: "Critical: Place emergency order for low-stock feed items.",
    type: "System Alert",
    priority: "Urgent",
    sender: dummyUsers.sender3,
    recipient: dummyUsers.currentUser,
    animal: undefined,
    status: "Rejected",
    taskDetails: {
      dueDateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (was overdue)
      notes: "Multiple feed types below minimum threshold",
    },
    readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    acceptedAt: undefined,
    rejectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "507f1f77bcf86cd799439056",
    title: "Weekly Report Submission",
    description: "Submit weekly animal care report by Friday.",
    type: "Custom Message",
    priority: "Low",
    sender: dummyUsers.sender2,
    recipient: dummyUsers.currentUser,
    animal: undefined,
    status: "Rejected",
    taskDetails: {
      dueDateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      notes: "Include all animal health metrics",
    },
    readAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    acceptedAt: undefined,
    rejectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];
