"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/users')
    .then((res) => setUsers(res.data))
    .catch((e) => console.error('Failed to fetch users:', e));
  }, []);

  const handleAddUser = async() => {
    try{
      const res = await axios.post('http://localhost:3001/users', {name, email});
      setUsers([...users, res.data]);
      setName('');
      setEmail('');
    }catch(e){
      console.error('Failed to fetch users:', e)
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>Nextjs express.js mysql prismaによるアプリケーション作成</header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="border-b-2 border-blue-900">User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="underline decoration-blue-500">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <h2 className="border-b-2 border-blue-900">Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddUser} className="bg-green-400 cursor-pointer">Add</button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
