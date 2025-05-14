import { SkeletonLoader } from "../../loaders"
import styles from "./PostCardSkeleton.module.css"

const PostCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.authorInfo}>
        <SkeletonLoader className={styles.photo} />
        <div className={styles.authorDetails}>
          <SkeletonLoader className={styles.name} />
          <SkeletonLoader className={styles.headline} />
        </div>
      </div>
      <SkeletonLoader className={styles.postContainer} />
      <div className={styles.postStats}>
        <SkeletonLoader className={styles.statItem} />
        <SkeletonLoader className={styles.statItem} />
        <SkeletonLoader className={styles.statItem} />
        <SkeletonLoader className={styles.date} />
      </div>
    </div>
  )
}

export default PostCardSkeleton