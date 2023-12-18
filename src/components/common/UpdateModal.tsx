import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/types";
import { apiBaseUrl } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CiEdit } from "react-icons/ci";

type UpdateModalProps = {
  user?: User;
};

const updateUser = async (id: string, body: any) => {
  const res = await axios.put(`${apiBaseUrl}/users/${id}`, body);
  return res.data;
};

const UpdateModal = ({ user }: UpdateModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });

  const queryClient = useQueryClient();
  const { mutateAsync: update } = useMutation<any, any, any>({
    mutationFn: (body) => updateUser(user?.userId ?? "", body),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User Updated Successfully",
      });
      setOpen(false);
    },
  });
  const onSubmit = async (data: User) => {
    return update(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CiEdit className="text-2xl hover:text-violet-600" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>Username</label>
              <Input {...register("username")} />
              <label>Email</label>
              <Input {...register("email")} />
              <label>Password</label>
              <Input {...register("password")} />

              <Button type="submit">Test Update</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
