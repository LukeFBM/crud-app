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

type UpdateModalProps = {
  user?: User;
};

const updateUser = async (id: string, body: any) => {
  const res = await axios.put(`${apiBaseUrl}/users/${id}`, body);
  return res.data;
};

const UpdateModal = ({ user }: UpdateModalProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: update } = useMutation<any, any, any>({
    mutationFn: (body) => updateUser(user?.userId ?? "", body),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users", user?.userId] });
    },
  });

  const { toast } = useToast();

  const handleUpdateUser = () => {
    update({
      email: emailInputValue,
      username: usernameInputValue,
      password: passwordInputValue,
    });
    toast({
      title: "User Updated Successfully",
    });
  };

  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [emailInputValue, setEmailInputValue] = useState("");
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [formIsClosed, setFormIsClosed] = useState(true);

  const handleCloseModal = () => {
    setFormIsClosed(!formIsClosed);
  };
  const onSubmit: SubmitHandler<User> = handleCloseModal;

  return (
    <Dialog>
      <DialogTrigger onClick={() => setFormIsClosed(true)}>
        Update
      </DialogTrigger>
      {formIsClosed ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="">Update</DialogTitle>
            <DialogDescription>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label>Username</label>
                <Input
                  {...register("username")}
                  value={usernameInputValue}
                  onChange={(e) => setUsernameInputValue(e.target.value)}
                />
                <label>Email</label>
                <Input
                  {...register("email")}
                  value={emailInputValue}
                  onChange={(e) => setEmailInputValue(e.target.value)}
                />
                <label>Password</label>
                <Input
                  {...register("password")}
                  value={passwordInputValue}
                  onChange={(e) => setPasswordInputValue(e.target.value)}
                />

                <Button type="submit" onClick={handleUpdateUser}>
                  Test Update
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default UpdateModal;
