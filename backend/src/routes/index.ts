import express, { Request, Response } from "express";
import UserController from "../controllers/userController";
import ProductController from "../controllers/productController";
import authentication from "../middlewares/authentication";
import WishlistController from "../controllers/wishlistController";
import OrderController from "../controllers/orderController";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to my travel app" });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authentication, UserController.getProfile);

router.get("/products", authentication, ProductController.getAllProducts);
router.post("/product", authentication, ProductController.createProduct);
router.get("/product/:id", authentication, ProductController.getProductById);
router.get("/products/favorite", authentication, ProductController.getAllProductsByLikeId);
router.post("/product/:id/like", authentication, ProductController.likeOrUnlikeProduct);
router.put("/product/:id", authentication, ProductController.updateProduct);
router.delete("/product/:id", authentication, ProductController.deleteProduct);

router.post("/wishlist", authentication, WishlistController.createWishlist);
router.get("/wishlist", authentication, WishlistController.getWishlistByUserId);
router.delete("/wishlist/:productId", authentication, WishlistController.deleteWishlist);

router.post("/order", authentication, OrderController.createOrder);
router.get("/order", authentication, OrderController.getOrdersByUserId);
router.put("/order/:orderId", authentication, OrderController.updateOrderStatus);
router.delete("/order/:orderId", authentication, OrderController.deleteOrder);

export default router;
