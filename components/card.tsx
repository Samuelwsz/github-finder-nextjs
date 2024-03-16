import { UserDataProps } from "@/app/page"
import Image from "next/image"

export default function User({
  avatar_url,
  followers,
  following,
  public_repos,
  name,
  login,
  created_at,
}: UserDataProps) {
  const createdDate = new Date(created_at)

  return (
    <div>
      <div>
        {avatar_url && (
          <>
            <Image
              src={avatar_url}
              className="avatar"
              alt="User"
              width={500}
              height={500}
            />
          </>
        )}
      </div>
      <div className="">
        <a href={`https://github.com/${login}`}>{name || login}</a>
        {created_at && (
          <>
            <p>
              User joined on{" "}
              {`${createdDate.getDate()} ${createdDate.toLocaleString("en-us", {
                month: "short",
              })} ${createdDate.getFullYear()}`}
            </p>
          </>
        )}
      </div>
      <div className="text-left">
        <div>{<p>Public Repos: {public_repos}</p>}</div>
        <div>{<p>Followers: {followers}</p>}</div>
        <div>{<p>Following: {following}</p>}</div>
      </div>
    </div>
  )
}
