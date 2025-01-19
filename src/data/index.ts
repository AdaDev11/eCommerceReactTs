import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { configure } from "mobx";

export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    images: string[];
    description: string;
    quantity: number;
    thumbnail: string;
    total: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

configure({
    enforceActions: "always",
});

class ProductStore {
    products: Product[] = [];
    isLoading: boolean = false;
    totalProducts = 0;
    limit = 4;
    skip = 0;
    searchQuery = "";
    cart: { product: Product; quantity: number }[] = [];
    asc = "asc";
    user: User | null = null;
    refreshingPromise: boolean | null = null;
    authError: string | null = null;
    tempCart: { product: Product; quantity: number }[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    async fetchProducts() {
        this.isLoading = true;
        try {
            const response = await axios.get(`https://dummyjson.com/products`);
            runInAction(() => {
                this.products = response.data.products;
                this.totalProducts = response.data.total;
            });
            // console.log("Fetched products:", this.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async searchProducts(query: string) {
        this.isLoading = true;
        try {
            const res = await axios.get(
                `https://dummyjson.com/products/search?q=${query}`
            );
            console.log("search fetching data: " + res.data);
            runInAction(() => {
                this.products = res.data.products;
                console.log("products search " + this.products);
                this.totalProducts = res.data.total;
            });
        } catch (error) {
            console.error("Search error: ", error);
        } finally {
            this.isLoading = false;
        }
    }

    async filterCategories(category: string) {
        this.isLoading = true;
        try {
            const res = await axios.get(
                `https://dummyjson.com/products/category/${category}`
            );
            runInAction(() => {
                this.products = res.data.products;
            });
        } catch (error) {
            console.error("Categories fetching error ", error);
        } finally {
            this.isLoading = false;
        }
    }

    async sortproductsAscDesc() {
        this.isLoading = true;
        try {
            const res = await axios.get(
                `https://dummyjson.com/products?sortBy=title&order=${this.asc}`
            );
            runInAction(() => {
                this.products = res.data.products;
                this.asc = this.asc === "asc" ? "desc" : "asc";
            });
        } catch (error) {
            console.error("Sorting products error: ", error);
        } finally {
            this.isLoading = false;
        }
    }

    setPage(page: number) {
        this.skip = (page - 1) * this.limit;
        this.fetchProducts();
    }

    async addToCart(
        userId: number,
        products: { product: Product; quantity: number }[]
    ) {
        if (!userId || !products.length) return;

        try {
            const res = await axios.post("https://dummyjson.com/carts/add", {
                userId,
                products,
            });

            const cartData = res.data;
            this.cart = cartData.products.map((product: any) => ({
                product: {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                },
                quantity: product.quantity,
                total: product.total,
            }));
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    async authorization(
        username: string,
        password: string,
        expiresInMins: number = 30
    ) {
        this.isLoading = true;
        try {
            const response = await axios.post(
                "https://dummyjson.com/auth/login",
                { username, password, expiresInMins },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const userData = response.data;

            localStorage.setItem("accessToken", userData.accessToken);
            localStorage.setItem("refreshToken", userData.refreshToken);
            localStorage.setItem("user", JSON.stringify(userData));

            this.user = userData;
            console.log("Authorization successful: ", userData);

            const whisTokencart = JSON.parse(
                localStorage.getItem(`${username}_cart`) || "[]"
            );
            this.cart = whisTokencart;

            console.log("whistokencart", whisTokencart);

            localStorage.setItem(
                `${this.user?.username}_cart`,
                JSON.stringify(this.cart)
            );

            console.log(
                "local this cart",
                localStorage.getItem(`${this.user?.username}_cart`)
            );

            runInAction(() => {
                this.user = userData;
            });

            const guestCart = JSON.parse(
                localStorage.getItem("guestCart") || "[]"
            );
            guestCart.push(this.products);
            console.log("guest cart", guestCart);
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            console.log("Product added to guest cart:", this.products);

            // get user cart dinamik
            const userCartResponse = await axios.get(
                "https://dummyjson.com/carts/user",
                {
                    headers: {
                        Authorization: `Bearer ${userData.accessToken}`,
                    },
                }
            );
            console.log("Kart key: ", localStorage.getItem("cart"));

            const userCart =
                userCartResponse.status === 200 ? userCartResponse.data : [];

            const mergedCart = [...userCart, ...guestCart];
            this.cart = mergedCart;

            localStorage.setItem(`${username}_cart`, JSON.stringify(this.cart));
            localStorage.setItem("cart", JSON.stringify(mergedCart));

            localStorage.removeItem("guestCart");

            // set cart to server
            await axios.post(
                "https://dummyjson.com/carts/add",
                { products: mergedCart },
                {
                    headers: {
                        Authorization: `Bearer ${userData.accessToken}`,
                    },
                }
            );

            console.log("Cart synchronized successfully");
        } catch (error) {
            console.error("Authorization error:", error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        runInAction(() => {
            this.user = null;
            this.cart = [];
        });
    }

    // pererenderingda cartti obnovit etiw
    loadCart() {
        const loadcart = JSON.parse(
            localStorage.getItem(`${this.user?.username}_cart`) || "[]"
        );
        this.cart = loadcart;
    }

    async authorizeUser(credentials: { username: string; password: string }) {
        this.isLoading = true;
        try {
            const response = await axios.post(
                "https://dummyjson.com/auth/login",
                credentials
            );
            runInAction(() => {
                this.user = response.data; // save user
            });
        } catch (error) {
            console.error("Authorization error: ", error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async refreshToken() {
        this.isLoading = true;
        try {
            const response = await axios.post(
                "https://dummyjson.com/auth/login/refresh",
                {
                    token: localStorage.getItem("refreshToken"),
                }
            );
            runInAction(() => {
                this.user = response.data; // save refreshing user
            });
        } catch (error) {
            console.error("Refresh token error: ", error);
            runInAction(() => {
                this.authError = "Failed to refresh token";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    get totalPrice() {
        return this.cart.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
    }

    changeQuantity = (id: number, newQuantity: number) => {
        const item = this.cart.find((cartItem) => cartItem.product.id === id);
        if (item) {
            item.quantity = newQuantity;
        }
    };
}

const productStore = new ProductStore();
export default productStore;
