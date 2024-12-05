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
type Props = {
    params: {
        id: string;
    };
};

async function getData(id: string): Promise<User | null> {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        return null; 
    }
}

export default async function Home({ params: { id } }: Props) {
    const user = await getData(id);

    return (
        <>
            <h2 className="text-center text-7xl font-weight: 600 text-pink-600">User {id}</h2>
            {user ? (
                <Card key={user.id} className="w-[80%] h-[80%] bg-[#fce7f3] m-auto">
                    <CardHeader>
                    <CardTitle>Name: {user.name}</CardTitle>
                    <CardDescription>Username: {user.username}</CardDescription>
                    </CardHeader>
        
                    <CardContent>
                    <p>Email: {user.email}</p> 
                    <CardDescription>Address: {user.address.street}, {user.address.city}</CardDescription>
                    <p className="font-weight: 800">Phone: {user.phone}</p> 
                    <p>Website: {user. website}</p> 
                    <p>Company: {user.company.name}</p> 
                    </CardContent>
        
                    <CardFooter>
                    <Link href={"/"} className="hover:text-pink-700 bg-violet-50 outline-style: double outline-pink-500 ">Home</Link>
                    </CardFooter>
                </Card>
            ) : (
                <p>Ошибка загрузки данных.</p>
            )}
        </>
    );
}