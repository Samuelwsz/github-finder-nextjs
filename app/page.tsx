"use client"

import User from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export interface UserDataProps {
  avatar_url: string
  name: string
  created_at: string
  followers: number
  login: string
  following: number
  public_repos: number
}

export default function SearchUser() {
  const [userName, setUserName] = useState<string|undefined>(undefined)
  const [userData, setUserdata] = useState<UserDataProps | null>(null)

  async function fetchGithubUserData() {
    const res = await fetch(`https://api.github.com/users/${userName}`)

    const data = await res.json()

    if (data) {
      setUserdata(data)
      setUserName("")
    }

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    const results = data.results
    console.log(results)
  }

  function handleSubmit() {
    fetchGithubUserData()
  }

  useEffect(() => {
    fetchGithubUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="flex justify-center items-center m-auto">
      <div>
        <div className="flex flex-row gap-3 max-w-96 items-center justify-center m-auto">
          <Input
            placeholder="Search user"
            className="outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button onClick={handleSubmit}>Search</Button>
        </div>
        <div className="my-3 flex m-auto justify-center items-center text-center border border-slate-700 p-3">
          {userData !== null ? (
            <User
              avatar_url={userData.avatar_url}
              name={userData.name}
              created_at={userData.created_at}
              followers={userData.followers}
              login={userData.login}
              following={userData.following}
              public_repos={userData.public_repos}
            />
          ) : null}
        </div>
      </div>
    </main>
  )
}
