"use client"

import User from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
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
  const [userName, setUserName] = useState<string | undefined>(undefined)
  const [userData, setUserdata] = useState<UserDataProps | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function fetchGithubUserData() {
    try {
      const res = await axios.get(`https://api.github.com/users/${userName}`)

      const data = res.data

      if (data) {
        setUserdata(data)
        setUserName("")
        setError(null)
      }
    } catch (error) {
      setError("User not found. Please try again.")
      console.error("Failed to fetch data:", error)
      setUserName("")
    }
  }

  function handleSubmit() {
    fetchGithubUserData()
  }

  useEffect(() => {
    if (userName !== undefined && userName !== null) {
      fetchGithubUserData()
    }
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
        <div className="my-3 flex m-auto justify-center items-center text-center p-3">
          {error && <p className="text-red-500">{error}</p>}
          {userData !== null && !error ? (
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
