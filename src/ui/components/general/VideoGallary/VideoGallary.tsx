import type { ComponentProps } from "react"
import type { IVideo } from "../../cards/PostCard/PostCard"
import styles from "./VideoGallary.module.css"

export interface VideoGallaryProps extends ComponentProps<"div"> {
  videos: IVideo[]
}

const VideoGallary = ({ videos, className }: VideoGallaryProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {
        videos?.map((video: IVideo) => (
          <video
            width="280" height="200" controls
            poster={video.poster}
            className={styles.videoPlayer}
          >
            <source src={video.url} />
          </video>
        ))
      }
    </div>
  )
}

export default VideoGallary