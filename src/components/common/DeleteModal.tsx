import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User } from "@/lib/types";
import { apiBaseUrl } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { CiTrash } from "react-icons/ci";

type DeleteModalProps = {
  user?: User;
  onSubmit: () => void;
};

const deleteUser = async (id: string) => {
  const res = await axios.delete(`${apiBaseUrl}/users/${id}`);
  return res.data;
};

const DeleteModal = ({ user, onSubmit }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: cancel } = useMutation<any, any, any>({
    mutationFn: () => deleteUser(user?.userId ?? ""),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { toast } = useToast();

  const handleDeleteUser = () => {
    cancel(user);
    toast({
      title: "User Deleted Successfully",
    });
    onSubmit();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <CiTrash className="text-2xl hover:text-violet-600 transition-all duration-300" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-black hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-black"
            type="submit"
            onClick={handleDeleteUser}
          >
            Delete permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteModal;
