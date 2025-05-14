import type { ComponentProps } from "react"
import styles from "./PostCard.module.css"
import { CommentIcon, ExternalLinkIcon, HeartIcon, LaughEmojiIcon, LikeIcon } from "../../../svgs/icons"
import { formatDatetime } from "../../../../utils/datetime.utils"
import { ImageGallary, VideoGallary } from "../../general"
import type { IUser } from "../UserCard/UserCard"
import UserCard from "../UserCard/UserCard"

export interface IVideo {
  url: string
  duration: number
  poster: string
}

export interface IImage {
  width: number
  height: number
  url: string
}

export interface IResharedPost {
  isBrandPartnership: boolean
  text: string
  author: IUser
  video: IVideo[]
  image: IImage[]
}

export interface IActivityCounts {
  likeCount: number
  numComments: number
  empathyCount: number
  appreciationCount: number
  funnyCount: number
  maybeCount: number
  totalReactionCount: number
}

export interface IPost {
  urn: string
  url: string
  text: string
  postedDate: string
  reposted: boolean
  resharedPost?: IResharedPost
  author: IUser
  video: IVideo
  socialActivityCountsInsight: IActivityCounts
}

export interface PostCardProps extends ComponentProps<"div"> {
  post: IPost
}

const PostCard = ({
  post,
  className
}: PostCardProps) => {
  return (
    <article className={`${styles.card} ${className}`}>
      <UserCard user={post.author} />
      <div className={styles.postContainer}>
        {post.text}
        {
          post.resharedPost ? (
            <div className={styles.sharedPostContainer}>
              <UserCard user={{
                fullName: `${post.resharedPost.author?.firstName} ${post.resharedPost.author?.lastName}`,
                headline: `@${post.resharedPost.author?.username}`,
                url: post.resharedPost.author?.url,
              }} />
              {
                post.resharedPost?.text ? (
                  <p>{post.resharedPost?.text}</p>
                ) : null
              }
              {
                post.resharedPost?.image?.length ? (
                  <ImageGallary images={[post.resharedPost.image[0]]} className={styles.gallery} />
                ) : null
              }
              {
                post.resharedPost.video?.length ? (
                  <VideoGallary videos={[post.resharedPost.video[0]]} className={styles.gallery} />
                ) : null
              }
            </div>
          ) : null
        }
      </div>
      <div className={styles.postStats}>
        <p className={styles.statItem}>
          <LikeIcon className={styles.statIcon} />
          {post.socialActivityCountsInsight.likeCount ?? 0}
        </p>
        <span className={styles.separator}>
          &bull;
        </span>
        <p className={styles.statItem}>
          <CommentIcon className={styles.statIcon} />
          {post.socialActivityCountsInsight.numComments ?? 0}
        </p>
        <span className={styles.separator}>
          &bull;
        </span>
        <p className={styles.statItem}>
          <HeartIcon className={styles.statIcon} />
          {post.socialActivityCountsInsight.empathyCount ?? 0}
        </p>
        <span className={styles.separator}>
          &bull;
        </span>
        <p className={styles.statItem}>
          <LaughEmojiIcon className={styles.statIcon} />
          {post.socialActivityCountsInsight.funnyCount ?? 0}
        </p>
        <p className={styles.postDate}>{formatDatetime(post.postedDate)}</p>
        <span className={styles.separator}>
          &bull;
        </span>
        <a href={post.url} target="_blank" className={styles.linkedinLink}>
          LinkedIn
          <ExternalLinkIcon />
        </a>
      </div>
    </article>
  )
}

export default PostCard