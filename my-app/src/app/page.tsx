import Link from "next/link";
import { User } from "@/interfaces/User";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function getData(): Promise<User[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return []; 
  }
}

export default async function Home() {
  const users = await getData();
  
  return (
    <>
      <h1 className="text-center text-7xl font-weight: 600 text-pink-600">User list</h1>
      <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className=" text-pink-600">Search</Label>
              <Input id="name" placeholder="Enter username" />
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
      {users.length > 0 ? (
        users.map((user) => (
          <Card key={user.id} className="w-[350px] bg-[#fce7f3] hover:bg-pink-300">
            <CardHeader>
              <CardTitle>Username: {user.username}</CardTitle>
              <CardDescription>Email: {user.email}</CardDescription>
            </CardHeader>

            <CardContent>
              <p>Company: {user.company.name}</p> 
            </CardContent>

            <CardFooter>
              <Link href={`/user/${user.id}`} className="hover:text-pink-700 outline-style: double outline-pink-500 transition duration-500 ease-in-out bg-violet-50 hover:bg-violet-200 transform hover:-translate-y-1 hover:scale-110 ">See full info</Link>
            </CardFooter>
            </Card>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
    </>
  );
}