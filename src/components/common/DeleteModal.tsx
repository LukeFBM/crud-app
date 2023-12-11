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
import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit" onClick={handleDeleteUser}>
            Test Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteModal;
