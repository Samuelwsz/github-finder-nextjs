"use client"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import User from "./card"

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
  const [userName, setUserName] = useState(undefined)
  const [userData, setUserdata] = useState<UserDataProps | null>(null)

  async function fetchGithubUserData() {
    const res = await fetch(`https://api.github.com/users/${userName}`)

    const data = await res.json()

    if (data) {
      setUserdata(data)
      setUserName("")
    }

    console.log(data)
  }

  function handleSubmit() {
    fetchGithubUserData()
  }

  useEffect(() => {
    fetchGithubUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
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
        <div className="my-3">
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
