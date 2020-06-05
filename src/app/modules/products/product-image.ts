export interface ProductImage {
  /**
   * Check that is performed on image inside provided boolean array
   */
  isImageLoaded(
    imageStatusArray: boolean[],
    imageIndex: number,
    pageSize: number
  ): boolean;

  /**
   * Resets provided boolean array that indicates
   * each product readdiness for displaying.
   */
  resetLoadedImages(
    imageStatusArray: boolean[],
    totalImages: number
  ): boolean[];

  /**
   * Defines action that will be taken when the product image
   * is fully loaded and ready for displaying.
   */
  onImageLoad(
    imageStatusArray: boolean[],
    pageSize: number,
    imageIndex: number
  ): void;
}
