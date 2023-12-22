import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiBaseUrl } from "@/lib/utils";
import { IoEyeOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import CreateModal from "./CreateModal";
import Loading from "./Loading";

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

  const handleSelectPage = (page: number) => {
    setCurrentPage(page);
  };

  const pages = Array.from({ length: 20 }, (_, i) => i + 1);

  if (isLoading) return <Loading />;

  return (
    <>
      <Table className="m-2">
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead className="font-mono text-violet-600">User Id</TableHead>
            <TableHead className="font-mono text-violet-600">
              Username
            </TableHead>
            <TableHead className="font-mono text-violet-600">Email</TableHead>
            <TableHead className="font-mono text-violet-600">
              Password
            </TableHead>
            <TableHead>
              <Button>
                <CreateModal />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((user: any) => {
            return (
              <TableRow>
                <TableCell className="font-primary font-semibold">
                  {user.userId}
                </TableCell>
                <TableCell className="font-primary">{user.username}</TableCell>
                <TableCell className="font-primary">{user.email}</TableCell>
                <TableCell className="font-primary">{user.password}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link to={`/users/${user.userId}`}>
                      <IoEyeOutline className="text-xl hover:text-violet-600 transition-all duration-300" />
                    </Link>
                    <button>
                      <UpdateModal user={user} />
                    </button>

                    <DeleteModal user={user} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex gap-1 justify-center">
        {pages.map((page) => {
          return (
            <Button
              className="bg-gray-800"
              onClick={() => handleSelectPage(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default UsersList;
