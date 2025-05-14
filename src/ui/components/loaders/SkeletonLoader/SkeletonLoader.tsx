import type { ComponentProps } from "react"
import styles from "./SkeletonLoader.module.css"

const SkeletonLoader = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={`${styles.loader} ${className}`}></div>
  )
}

export default SkeletonLoader