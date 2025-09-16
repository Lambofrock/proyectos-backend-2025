import fs from "fs/promises";
import crypto from "crypto";

class cartManager {
  constructor(pathfile) {
    this.pathfile = pathfile;
  }
  generateNewId() {
    return crypto.randomUUID();
  }
  async getProducts() {
    try {
      const fileData = await fs.readFile(this.pathfile, "utf-8");
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {}
  }
  async setProductsById(productID, updates) {
    try {
      const fileData = await fs.readFile(this.pathfile, "utf-8");
      const products = JSON.parse(fileData);
      const indexProduct = products.findIndex(
        (product) => product.id === productID
      );
      if (indexProduct === -1) {
        throw new error("producto no encontrado en el carrito");
      }
      products[indexProduct] = { ...products[indexProduct], ...updates };
      await fs.writeFile(
        this.pathfile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {}
  }
  async deleteProductById(productId) {
    try {
      const fileData = await fs.readFile(this.pathfile, "utf-8");
      const products = JSON.parse(fileData);
      const filteredProduct = products.filter(
        (product) => product.id !== productId
      );

      await fs.writeFile(
        this.pathfile,
        JSON.stringify(filteredProduct, null, 2),
        "utf-8"
      );
      return filteredProduct;
    } catch (error) {}
  }
  async addProduct(newProduct) {
    try {
      const fileData = await fs.readFile(this.pathfile, "utf-8");
      const products = JSON.parse(fileData);
      const newId = this.generateNewId();
      const product = { id: newId, ...newProduct };
      products.push(product);
      await fs.writeFile(
        this.pathfile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
export default cartManager;