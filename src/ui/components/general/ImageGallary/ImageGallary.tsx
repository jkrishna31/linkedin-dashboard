import type { ComponentProps } from "react"
import type { IImage } from "../../cards/PostCard/PostCard"
import styles from "./ImageGallary.module.css"

export interface ImageGallaryProps extends ComponentProps<"div"> {
  images: IImage[]
}

const ImageGallary = ({ images, className }: ImageGallaryProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {
        images?.map((image: IImage) => (
          <a href={image.url} className={styles.item}>
            <img src={image.url} width={80} height={80} className={styles.image} />
          </a>
        ))
      }
    </div>
  )
}

export default ImageGallary