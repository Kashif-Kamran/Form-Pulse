import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useToggleState } from "@/hooks/use-toggle-state";
import { useCreateNotification } from "@/hooks/api/notification.hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import InputField from "@/components/custom-ui/form-feilds/input-field";
import { ChooseAnimalDialog } from "@/pages/diet-management/components/dialogs/choose-animal-dialog-box";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";
import {
  CreateNotificationSchema,
  CreateNotificationFormData,
  transformNotificationForBackend,
} from "./schema";
import {
  NotificationTypes,
  NotificationPriorities,
  AnimalPublic,
  PublicUser,
  RoleType,
} from "@repo/shared";
import { cn } from "@/lib/utils";
import { useMe } from "@/hooks/api/profile.hook";

interface CreateNotificationFormProps {
  onSubmit?: (data: CreateNotificationFormData) => void;
  onSuccess?: () => void;
}

export function CreateNotificationForm({
  onSubmit,
  onSuccess,
}: CreateNotificationFormProps) {
  const { toast } = useToast();
  const { mutateAsync: createNotification, isPending: isLoading } =
    useCreateNotification();

  const form = useForm<CreateNotificationFormData>({
    resolver: zodResolver(CreateNotificationSchema),
    defaultValues: {
      title: "",
      description: "",
      type: NotificationTypes.CUSTOM_MESSAGE,
      priority: NotificationPriorities.MEDIUM,
      recipient: {
        id: "",
        name: "",
        email: "",
        role: "",
      },
      animal: undefined,
    },
  });

  const getValidationErrorMessage = (fieldName: string, error: any): string => {
    const baseFieldName = fieldName.split(".")[0];

    switch (baseFieldName) {
      case "title":
        return (
          error?.message || "Please provide a clear title for the notification"
        );
      case "description":
        return error?.message || "Please provide a valid description";
      case "type":
        return "Please select a notification type";
      case "priority":
        return "Please select a priority level";
      case "recipient":
        return "Please select a recipient for this notification";
      case "animal":
        return error?.message || "Please select a valid animal";
      default:
        if (error?.message) {
          return error.message;
        }
        return `Please provide a valid value for ${fieldName}`;
    }
  };

  const handleSubmit = form.handleSubmit(
    async (formData: CreateNotificationFormData) => {
      try {
        const transformedData = transformNotificationForBackend(formData);

        // Call the API
        await createNotification(transformedData);

        toast({
          title: "Notification sent successfully!",
          description: `Your ${formData.type.toLowerCase()} has been sent to ${formData.recipient.name}.`,
          variant: "default",
        });

        // Reset form after successful creation
        form.reset({
          title: "",
          description: "",
          type: NotificationTypes.CUSTOM_MESSAGE,
          priority: NotificationPriorities.MEDIUM,
          recipient: {
            id: "",
            name: "",
            email: "",
            role: "",
          },
          animal: undefined,
        });

        // Call success callback to close modal
        if (onSuccess) {
          onSuccess();
        }

        // Call additional onSubmit callback if provided
        if (onSubmit) {
          onSubmit(formData);
        }
      } catch (error: any) {
        console.error("Error creating notification:", error);

        // Handle validation errors from API
        if (error?.response?.status === 400 && error?.response?.data?.message) {
          toast({
            title: "Validation Error",
            description: error.response.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Unable to send notification",
            description:
              error.message ||
              "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
        }
      }
    },
    (errors) => {
      const errorEntries = Object.entries(errors);
      if (errorEntries.length === 0) return;

      const [fieldName, error] = errorEntries[0];
      const errorMessage = getValidationErrorMessage(fieldName, error);

      toast({
        title: "Validation Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  );

  return (
    <Form {...form}>
      <form
        className="space-y-6 max-h-full flex flex-col"
        onSubmit={handleSubmit}
      >
        <Card className="pt-2 px-6 pb-6">
          <CardTitle className="bg-primary rounded-md p-2 text-primary-foreground mt-4 text-center text-lg">
            Create New Notification
          </CardTitle>
          <CardContent className="space-y-4 p-0 mt-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <InputField
                      placeholder="Enter notification title"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed description of the notification"
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(NotificationTypes).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(NotificationPriorities).map(
                          (priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Recipient and Animal Row */}
            <div className="grid grid-cols-2 gap-4">
              <RecipientSelection form={form} />
              <AnimalSelection form={form} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 px-4">
          <Button type="submit" className="px-8 py-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              "Send Notification"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Recipient Selection Component
const RecipientSelection = ({
  form,
}: {
  form: ReturnType<typeof useForm<CreateNotificationFormData>>;
}) => {
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
  const [isUserDialogOpen, openUserDialog, closeUserDialog] = useToggleState();
  const { data: me } = useMe();
  const recipientValue = form.watch("recipient");

  useEffect(() => {
    if (recipientValue && recipientValue.id && recipientValue.name) {
      setSelectedUser({
        id: recipientValue.id,
        name: recipientValue.name,
        email: recipientValue.email,
        role: recipientValue.role as RoleType,
        isVerified: true, // Default for display
        createdAt: new Date(),
        updatedAt: new Date(),
      } as PublicUser);
    }
  }, [recipientValue]);

  const handleSelectUser = (user: PublicUser) => {
    if (!user?.id) return;
    setSelectedUser(user);
    form.setValue("recipient", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    form.clearErrors("recipient");
  };

  return (
    <div className="flex w-full flex-col">
      <FormField
        control={form.control}
        name="recipient"
        render={() => (
          <FormItem className="w-full">
            <FormLabel>Recipient *</FormLabel>
            <FormControl>
              <Button
                variant="outline"
                type="button"
                className={cn(
                  "justify-start text-left font-normal w-full py-5",
                  !selectedUser?.name && "text-muted-foreground"
                )}
                onClick={openUserDialog}
              >
                {selectedUser?.name ? selectedUser.name : "Select Recipient"}
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ChooseUserDialog
        isOpen={isUserDialogOpen}
        onClose={closeUserDialog}
        onSelectUser={handleSelectUser}
        selectedUserId={selectedUser?.id}
        specifiedUserFilter={(user) => user.id !== me?.id}
      />
    </div>
  );
};

// Animal Selection Component
const AnimalSelection = ({
  form,
}: {
  form: ReturnType<typeof useForm<CreateNotificationFormData>>;
}) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPublic | null>(
    null
  );
  const [isAnimalDialogOpen, openAnimalDialog, closeAnimalDialog] =
    useToggleState();

  const animalValue = form.watch("animal");

  useEffect(() => {
    if (animalValue && animalValue.id) {
      setSelectedAnimal(animalValue as AnimalPublic);
    }
  }, [animalValue]);

  const handleSelectAnimal = (animal: AnimalPublic) => {
    if (!animal?.id) return;
    setSelectedAnimal(animal);
    form.setValue("animal", {
      id: animal.id,
      name: animal.name,
      breed: animal.breed,
      age: animal.age,
      weight: animal.weight,
    });
    form.clearErrors("animal");
  };

  const handleClearAnimal = () => {
    setSelectedAnimal(null);
    form.setValue("animal", undefined);
  };

  return (
    <div className="flex w-full flex-col">
      <FormField
        control={form.control}
        name="animal"
        render={() => (
          <FormItem className="w-full">
            <FormLabel>Animal (Optional)</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Button
                  variant="outline"
                  type="button"
                  className={cn(
                    "justify-start text-left font-normal flex-1 py-5",
                    !selectedAnimal?.name && "text-muted-foreground"
                  )}
                  onClick={openAnimalDialog}
                >
                  {selectedAnimal?.name ? selectedAnimal.name : "Select Animal"}
                </Button>
              </FormControl>
              {selectedAnimal && (
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={handleClearAnimal}
                  className="px-3"
                >
                  Clear
                </Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <ChooseAnimalDialog
        isOpen={isAnimalDialogOpen}
        onClose={closeAnimalDialog}
        onSelectAnimal={handleSelectAnimal}
        selectedAnimalId={selectedAnimal?.id}
      />
    </div>
  );
};
