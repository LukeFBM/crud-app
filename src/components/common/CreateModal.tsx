import { User } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";

type CreateModalProps = {
  user?: User;
};

const createUser = async (id: string, body: any) => {
  const res = await axios.post(`${apiBaseUrl}/users/${id}`, body);
  console.log(res.data);
  return res.data;
};

const CreateModal = ({ user }: CreateModalProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: create } = useMutation<any, any, any>({
    mutationFn: (body) => createUser(user?.userId ?? "", body),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users", user?.userId] });
    },
  });

  const handleCreateUser = () => {
    create({
      email: emailInputValue,
      username: usernameInputValue,
      password: passwordInputValue,
    });
    toast({
      title: "User Created Successfully",
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
      <DialogTrigger
        className="w-full p-0 m-0"
        onClick={() => setFormIsClosed(true)}
      >
        Create new user
      </DialogTrigger>

      {formIsClosed ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="">Create new User</DialogTitle>
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

                <Button
                  type="submit"
                  className="bg-violet-600"
                  onClick={handleCreateUser}
                >
                  Create
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default CreateModal;
