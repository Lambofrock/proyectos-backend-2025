import fs from "fs/promises";
import crypto from "crypto";

class ProductManager {
  constructor(pathfile) {
    this.pathfile = pathfile;
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
        throw new error("producto no encontrado");
      }
      products[indexProduct] = { ...products[indexProduct], ...updates };
      await fs.writeFile(
        this.pathfile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products ;
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
  generateNewId() {
    return crypto.randomUUID();
  }
  async addProduct(newProduct) {
    try {
      //recuperar productos
      const fileData = await fs.readFile(this.pathfile, "utf-8");
      const products = JSON.parse(fileData);
      const newId = this.generateNewId();

      // Creamos el nuevo producto y lo agregamos al array
      const product = { id: newId, ...newProduct };
      products.push(product);

      // Guardar productos en el JASON
      await fs.writeFile(
        this.pathfile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products ;
    } catch (error) {
      console.log(error);
    }
  }
}

// async function main() {
//   try {
//     const manager = new ProductManager("../data/products.json");
//     const products = await manager.getProducts();
//     console.log(products);
    
//     // await manager.addProduct({titulo:"camizon", price:3500,stock: 15});
// //     await manager.setProductsById("59210e90-4f16-42db-8829-1daf683ab240", {
// //       price: 500,
// //     });
// // await manager.deleteProductById("60d71135-7953-4bfa-a750-3348656a54f8")

//   } catch (error) {
//     console.log(error);
//     return[]
//   }
// }

// main();

// throw new error("error al hacer la wea"+ error.message)

export default ProductManager;
