import express from "express";
import ProductManager from "./products/productManager.js";
import cartManager from "./carts/cartManager.js";

const app = express();
app.use( express.json());

const productManager = new ProductManager("./data/products.json");
const carrito = new cartManager("./data/cart.json")
// app.get("/", (req, res) => {
//   res.send("hola mundo! ");
// });

//productos---------------------------------------------------

app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ message: "lista de productos", products });
  } catch (error) {
  }
});

app.delete("/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const productsBorrado = await productManager.deleteProductById(id);
    res.json({ message: "producto borrado", productsBorrado });
  } catch (error) {}
});

app.post("/api/products", async(req,res)=>{
    try {
        const newProduct = req.body;
        const products = await productManager.addProduct(newProduct);
        res.json({message:"producto añadido",products
        })
    } catch (error) {  
    }
})

app.put("/api/products/:pid", async(req,res)=>{
    try {
        const pid = req.params();
        const updates = req.body;
        const products = await productManager.setProductsById(pid, updates);
res.json({message:"productos actualizados",products})
    } catch (error) { 
    }
})

//carrito----------------------------------------------
app.get("/api/carrito", async (req, res) => {
  try {
    const products = await carrito.getProducts();
    res.json({ message: "lista de productos", products });

  } catch (error) {
   throw new error("error al hacer la cosa" + error.message);
  }
});

app.delete("/api/carrito/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const productsBorrado = await carrito.deleteProductById(id);
    res.json({ message: "producto borrado", productsBorrado });
  } catch (error) { throw new error("error al hacer la cosa" + error.message);}
});

app.post("/api/carrito", async(req,res)=>{
    try {
        const newProduct = req.body;
        const products = await carrito.addProduct(newProduct);
        res.json({message:"producto añadido",products
        })
    } catch (error) { throw new error("error al hacer la cosa" + error.message);    
    }
})

app.put("/api/products/:pid", async(req,res)=>{
    try {
        const pid = req.params();
        const updates = req.body;
        const products = await carrito.setProductsById(pid, updates);
res.json({message:"productos actualizados",products})
    } catch (error) { throw new error("error al hacer la cosa" + error.message);      
    }
})




app.listen(8080, () => {
  console.log("servidor ok puerto 8080");
});
