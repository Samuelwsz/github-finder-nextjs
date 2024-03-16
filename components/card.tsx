import Image from "next/image"
import { UserDataProps } from "./SearchUser"

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
    <div className="">
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
      <div className="">
        <div>{public_repos && <p>Public Repos: {public_repos}</p>}</div>
        <div>{followers && <p>Followers: {followers}</p>}</div>
        <div>{following && <p>Following: {following}</p>}</div>
      </div>
    </div>
  )
}
