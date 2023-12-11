import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiBaseUrl } from "@/lib/utils";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

const getUsers = async (currentPage: any) => {
  const res = await axios.get(`${apiBaseUrl}/users?&page=${currentPage}`);
  return res.data;
};

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getUsers(currentPage),
  });
  console.log(data);

  const pages = Array.from({ length: 20 }, (_, i) => i + 1);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User Id</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((user: any) => {
            return (
              <TableRow>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Link to={`/users/${user.userId}`}>
                    <EyeOpenIcon />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex gap-1 justify-center">
        {pages.map((page) => {
          return <Button onClick={() => setCurrentPage(page)}>{page}</Button>;
        })}

        {/* <Button onClick={prevPage}>Prev</Button> */}

        {/* <Button onClick={nextPage}>Next</Button> */}
      </div>
    </>
  );
};

export default UsersList;
