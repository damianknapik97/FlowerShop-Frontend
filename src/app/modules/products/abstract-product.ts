import { ProductContent } from './product-content';
import { ProductImage } from './product-image';

export abstract class AbstractProduct implements ProductImage, ProductContent {
  constructor() {}

  /**
   * Check that is performed on image inside provided boolean array
   * Position of particular product image in provided array should based on provided image index and page size
   *
   * @param imageStatusArray - array to search for image status.
   * @param imageIndex - index of the image.
   * @param pageSize - size of the product page.
   */
  isImageLoaded(
    imageStatusArray: boolean[],
    imageIndex: number,
    pageSize: number
  ): boolean {
    return imageStatusArray[imageIndex % pageSize];
  }

  /**
   * Resets provided boolean array that indicates
   * each product readdiness for displaying.
   *
   * @param imageStatusArray - array to reset all the statuses in
   * @param totalImages - number of total images that will be represented inside returned array
   */
  resetLoadedImages(
    imageStatusArray: boolean[],
    totalImages: number
  ): boolean[] {
    for (let i = 0; i < totalImages; i++) {
      imageStatusArray[i] = false;
    }
    return imageStatusArray;
  }

  /**
   * Delays image load time in order to avoid annyoing image flickering when changing
   * product page with already cached images by the web browser.
   *
   * // TODO: investigate better possibility to avoid mentioned flickering.
   */
  onImageLoad(
    imageStatusArray: boolean[],
    pageSize: number,
    imageIndex: number
  ): void {
    /* Timeout is set in order to avoid flickering during fast page changing. */
    setTimeout(() => (imageStatusArray[imageIndex % pageSize] = true), 150);
  }

  /**
   * Defines action that will be performed when the page button is clicked
   */
  abstract onPageChange(): void;

  /**
   * Defines action that will be performed when the user enters component url
   * that will be responsible for presenting products from the shop offer.
   */
  abstract retrieveProductsPage(): void;

  /**
   * Defines action that will be performed when user clicks button responsible
   * for adding particular product to his shopping cart.
   */
  abstract addToShoppingCart(): void;
}
