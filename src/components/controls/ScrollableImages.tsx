interface ScrollableImagesProps {
  images: string | string[];
}

const ScrollableImages = ({ images }: ScrollableImagesProps) => {
  const imageList = Array.isArray(images) ? images : [images];
  return (
    <div>
      <img src={imageList[0]} />
    </div>
  );
};

export { ScrollableImages };
export type { ScrollableImagesProps };
