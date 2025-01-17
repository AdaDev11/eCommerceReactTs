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
    totalProducts: number = 0;
    limit: number = 4;
    skip: number = 0;
    searchQuery: string = "";
    cart: { product: Product; quantity: number }[] = [];
    asc: string = "asc";
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

    async updateOldCart(merge: boolean, products: Product) {
        this.isLoading = true;
        try {
            if (this.cart.length > 0) {
                const res = await axios.put("https://dummyjson.com/carts/1", {
                    merge,
                    products,
                });

                const cartData = res.data;

                const newUpdateCart = cartData.products.map((product) => ({
                    product: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        thumbnail: product.thumbnail,
                    },
                    quantity: product.quantity,
                    total: product.total,
                    discountedPrice: product.discountedPrice,
                }));

                const mergeCart = [this.cart, ...newUpdateCart].reduce(
                    (acc, item) => {
                        const existing = acc.find(
                            (p) => p.product.id === item.product.id
                        );
                        if (existing) {
                            existing.quantity += item.quantity;
                            existing.total += item.total;
                        } else {
                            acc.push(item);
                        }
                        return acc;
                    },
                    []
                );

                this.cart = mergeCart;
            } else {
                console.log("Cart is empty");
            }
        } catch (error) {
            console.error("Update cart error: ", error);
        } finally {
            this.isLoading = false;
        }
    }

    async addToCart(userId: number, products: { product: Product }[]) {
        try {
            const newProduct = products[0]; // get first product
            if (!newProduct || !newProduct.quantity) return; // if product not quantity exit

            // this.tempCart =
            //     JSON.parse(localStorage.getItem("this.tempCart")) || [];
            // this.tempCart.push(this.product);
            // localStorage.setItem("tempCart", JSON.stringify(this.tempCart));
            // console.log("Product added to guest cart:", this.product);
            // this.cart = [...this.tempCart];
            // having product check
            const existingItem = this.cart.find(
                (item) => item.product.id === newProduct.id
            );

            if (existingItem) {
                // if have product + qunatity
                existingItem.quantity += newProduct.quantity;
                this.changeQuantity(
                    existingItem.product.id,
                    existingItem.quantity
                );
            } else {
                // add new product
                const res = await axios.post(
                    "https://dummyjson.com/carts/add",
                    {
                        userId,
                        products,
                    }
                );

                const cartData = res.data;

                // get new products cart
                const newCartItems = cartData.products.map((product) => ({
                    product: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        thumbnail: product.thumbnail,
                    },
                    quantity: product.quantity,
                    total: product.total,
                    discountedPrice: product.discountedPrice,
                }));

                // refresh or updeate cart
                this.cart = [...this.cart, ...newCartItems];

                // save products localstorage
                localStorage.setItem(
                    `${this.user.username}_cart`,
                    JSON.stringify(this.cart)
                );

                if (!this.user.username) {
                    // if  user bez login
                    this.tempCart =
                        JSON.parse(localStorage.getItem("temp_cart")) || [];
                    this.tempCart.push(product);
                    localStorage.setItem(
                        "temp_cart",
                        JSON.stringify(this.tempCart)
                    );
                } else {
                    // if user login
                    this.cart.push(product);
                    localStorage.setItem(
                        `${this.user.username}_cart`,
                        JSON.stringify(this.cart)
                    );
                }
            }

            console.log("Add to cart cart:", this.cart);
        } catch (error) {
            console.error("Add to cart error:", error);
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

            const whisTokencart =
                JSON.parse(localStorage.getItem(`${username}_cart`)) || [];
            this.cart = whisTokencart;

            console.log("whistokencart", whisTokencart);

            localStorage.setItem(
                `${this.user.username}_cart`,
                JSON.stringify(this.cart)
            );

            console.log(
                "local this cart",
                localStorage.getItem(`${this.user.username}_cart`)
            );

            runInAction(() => {
                this.user = userData;
                this.isLoggedIn = true;
            });

            const guestCart =
                JSON.parse(localStorage.getItem("guestCart")) || [];
            guestCart.push(this.product);
            console.log("guest cart", guestCart);
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            console.log("Product added to guest cart:", this.product);

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
            this.isLoggedIn = false;
            this.cart = [];
        });
    }

    removeFromCart(productId) {
        let removecart =
            JSON.parse(localStorage.getItem(`${this.user.username}_cart`)) ||
            [];
        localStorage.setItem(
            `${this.user.username}_cart`,
            JSON.stringify(this.cart)
        );
    }

    // pererenderingda cartti obnovit etiw
    loadCart() {
        const loadcart =
            JSON.parse(localStorage.getItem(`${this.user.username}_cart`)) ||
            [];
        this.cart = loadcart;
    }

    async signup(firstName: string, lastName: string, age: number) {
        this.isloading = true;
        try {
            const res = await axios.post("https://dummyjson.com/users/add", {
                firstName,
                lastName,
                age,
            });
            runInAction(() => {
                this.user = res.data;
            });
        } catch (error) {
            console.log("Sign up error: ", error);
        } finally {
            runInAction(() => {
                this.isloading = false;
            });
        }
    }

    async authorizeUser(credentials: { username: string; password: string }) {
        this.isLoading = true;
        this.authError = null; // update every time
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
            runInAction(() => {
                this.authError =
                    error.response?.data?.message || "Authorization failed";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false; // stop isloading
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
