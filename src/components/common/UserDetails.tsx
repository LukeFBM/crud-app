import { User } from "@/lib/types";
import { apiBaseUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { useState } from "react";
import UsersList from "./UsersList";
import Loading from "./Loading";

const getUser = async (id: string) => {
  const res = await axios.get(`${apiBaseUrl}/users/${id}`);
  return res.data;
};

const UserDetails = () => {
  const [userIsDeleted, setUserIsDeleted] = useState(false);

  const params = useParams();
  const { data, isLoading } = useQuery<User>({
    queryKey: ["users", params.id],
    queryFn: () => getUser(params.id ?? ""),
    enabled: !!params.id,
  });
  console.log(data);

  if (isLoading) return <Loading />;
  if (userIsDeleted) return <UsersList />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary font-mono">{data?.email}</CardTitle>
        <CardDescription className="font-primary">
          ID: {data?.userId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-primary">Email: {data?.email}</p>
        <p className="font-primary">Username: {data?.username}</p>
        <p className="font-primary">Passowrd: {data?.password}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <UpdateModal user={data} />
        <DeleteModal user={data} />
      </CardFooter>
    </Card>
  );
};

export default UserDetails;
