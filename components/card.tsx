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
    <div className="">
      <div>
        {avatar_url && (
          <>
            <Image
              src={avatar_url}
              className="avatar"
              alt="ImageUser"
              width={400}
              height={400}
            />
          </>
        )}
      </div>
      <div className="">
        <a target="_blank" href={`https://github.com/${login}`}>{name || login}</a>
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
        <div> {public_repos && <p>Public Repos: {public_repos}</p>}</div>
        <div>
          {followers === 0
            ? "No followers"
            : followers && <p>Followers: {followers}</p>}
        </div>
        <div>
          {following === 0
            ? "Don't follow any users"
            : following && <p> Following: {following}</p>}
        </div>
      </div>
    </div>
  )
}
