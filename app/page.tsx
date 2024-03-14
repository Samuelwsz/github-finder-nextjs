import SearchUser from "@/components/SearchUser"

export default async function Home() {
  const res = await fetch("https://api.github.com/users/samuelwsz")
  const data = await res.json()

  return (
    <main className="max-w-6xl justify-center flex text-center">
      <SearchUser />
    </main>
  )
}
