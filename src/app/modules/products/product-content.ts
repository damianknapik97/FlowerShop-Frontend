export interface ProductContent {
  /**
   * Defines action that will be performed when the page button is clicked
   *
   */
  onPageChange(pageNumber: number): void;

  /**
   * Defines action that will be performed when the user enters component url
   * that will be responsible for presenting products from the shop offer.
   */
  retrieveProductsPage(pageNumber: number): void;

  /**
   * Defines action that will be performed when user clicks button responsible
   * for adding particular product to his shopping cart.
   */
  addToShoppingCart(productID: string): void;
}
