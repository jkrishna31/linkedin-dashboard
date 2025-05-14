import type { ComponentProps } from "react"
import styles from "./UserCard.module.css"
import type { IImage } from "../PostCard/PostCard"
import type { RequireOnly } from "../../../../utils/types.utils"

export interface IProfilePicture extends IImage {
  alt: string
}

export interface IUser {
  firstName: string
  lastName: string
  fullName: string
  username: string
  url: string
  headline: string
  profilePictures: IProfilePicture[]
}

export interface UserCardProps extends ComponentProps<"a"> {
  user: RequireOnly<IUser, "fullName" | "headline" | "url">
}

const UserCard = ({ user, className, ...props }: UserCardProps) => {
  return (
    <a href={user?.url} className={`${styles.authorInfo} ${className}`} target="_blank" {...props}>
      {
        user?.profilePictures?.[0]?.url ? (
          <div className={styles.photoContainer}>
            <img src={user?.profilePictures?.[0]?.url} alt={user?.fullName} />
          </div>
        ) : null
      }
      <div className={styles.authorDetails}>
        <b>{user?.fullName}</b>
        <p>{user?.headline}</p>
      </div>
    </a>
  )
}

export default UserCard