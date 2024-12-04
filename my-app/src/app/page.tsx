import Link from "next/link";

async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}

export default async function Home() {
  const posts = await getData();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Карточка</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.id}</h2>
          <p>{post.username}</p>
          <p>{post.email}</p> 
          <p>{post.company.name}</p> {/* Обычно "company" является объектом, поэтому нужно обращаться к "name" */}
          <Link href={`/user/${post.id}`}>See full info</Link>
        </div>
      ))}
    </div>
  );
}
