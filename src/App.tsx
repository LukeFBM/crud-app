import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./components/common/UsersList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserDetails from "./components/common/UserDetails";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/users",
    element: <UsersList />,
  },
  {
    path: "/users/:id",
    element: <UserDetails />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
