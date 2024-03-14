"use client"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import User from "./card"

export default function SearchUser() {
  const [userName, setUserName] = useState("")
  const [userData, setUserdata] = useState(null)

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
        <div>{userData !== null ? <User user={userData} /> : null}</div>
      </div>
    </main>
  )
}
