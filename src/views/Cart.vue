<template>
  <div class="js">
    <Navbar />
    <!-- Breadcrumbs -->
    <div class="breadcrumbs">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="bread-inner">
              <ul class="bread-list">
                <li>
                  <a
                    href=""
                    @click.prevent="$router.push('/').catch((err) => {})"
                    >Home<i class="ti-arrow-right"></i
                  ></a>
                </li>
                <li class="active">Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Breadcrumbs -->

    <!-- Shopping Cart -->
    <div class="shopping-cart section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Shopping Summery -->
            <table class="table shopping-summery">
              <thead>
                <tr class="main-hading">
                  <th>PRODUCT</th>
                  <th>NAME</th>
                  <th class="text-center">UNIT PRICE</th>
                  <th class="text-center">QUANTITY</th>
                  <th class="text-center">TOTAL</th>
                  <th class="text-center">
                    <i class="ti-trash remove-icon"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in $store.state.carts" :key="product.id">
                  <td class="image" data-title="No">
                    <img :src="product.Product.image_url" alt="#" />
                  </td>
                  <td class="product-des" data-title="Description">
                    <p class="product-name">{{ product.Product.name }}</p>
                  </td>
                  <td class="price" data-title="Price">
                    <span
                      >IDR {{ product.Product.price.toLocaleString("id") }}
                    </span>
                  </td>
                  <td class="qty" data-title="Qty">
                    <!-- Input Order -->
                    <div class="input-group">
                      <div class="button minus">
                        <button
                          type="button"
                          class="btn btn-primary btn-number"
                          :class="product.quantity === 1 ? 'disabled' : ''"
                          @click.prevent="
                            patchQuantity(product.id, product.quantity, false)
                          "
                        >
                          <i class="ti-minus"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        name="quant[1]"
                        class="input-number"
                        min="1"
                        :max="product.Product.stock"
                        :value="product.quantity"
                        disabled
                      />
                      <div class="button plus">
                        <button
                          type="button"
                          class="btn btn-primary btn-number"
                          :class="
                            product.quantity === product.Product.stock
                              ? 'disabled'
                              : ''
                          "
                          @click.prevent="
                            patchQuantity(product.id, product.quantity, true)
                          "
                        >
                          <i class="ti-plus"></i>
                        </button>
                      </div>
                    </div>
                    <!--/ End Input Order -->
                  </td>
                  <td class="total-amount" data-title="Total">
                    <span>IDR {{ product.price.toLocaleString("id") }}</span>
                  </td>
                  <td class="action" data-title="Remove">
                    <a href="#" @click.prevent="deleteProduct(product.id)"
                      ><i class="ti-trash remove-icon"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--/ End Shopping Summery -->
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <!-- Total Amount -->
            <div class="total-amount">
              <div class="row">
                <div class="col-lg-8 col-md-5 col-12"></div>
                <div class="col-lg-4 col-md-7 col-12">
                  <div class="right">
                    <ul>
                      <li>
                        Cart Subtotal<span
                          >IDR
                          {{ $store.state.totPrice.toLocaleString("id") }}</span
                        >
                      </li>
                    </ul>
                    <div class="button5 mb-5">
                      <a href="#" @click.prevent="checkout" class="btn"
                        >Checkout</a
                      >
                      <a
                        href="#"
                        @click.prevent="$router.push('/').catch(() => {})"
                        class="btn"
                        >Continue shopping</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/ End Total Amount -->
          </div>
        </div>
      </div>
    </div>
    <!--/ End Shopping Cart -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import swal from "sweetalert";
export default {
  name: "Cart",
  title: "Cart",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    this.fetchCart();
  },
  methods: {
    fetchCart() {
      this.$store.dispatch("fetchCart");
    },
    patchQuantity(cartId, currentQuantity, boolean) {
      const quantity = boolean ? currentQuantity + 1 : currentQuantity - 1;
      const payload = {
        cartId,
        quantity: { quantity },
      };
      this.$store
        .dispatch("patchCart", payload)
        .then(() => {
          this.$store.dispatch("fetchCart");
        })
        .catch((err) => {
          swal("Oops!", err.response.data.message, "error", {
            buttons: false,
            timer: 2000,
          });
        });
    },
    deleteProduct(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            return this.$store.dispatch("deleteProduct", id);
          } else if (result.isDenied) {
            return false;
          }
        })
        .then((data) => {
          if (!data) {
            Swal.fire("Changes are not saved", "", "info");
          } else {
            Swal.fire("Deleted!", "Your product has been removed.", "success");
            this.$store.dispatch("fetchCart");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You Know That Now is Free Purchase Time, Right?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Checkout Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          const payload = {
            totalPrice: this.$store.state.totPrice,
          };
          this.$store.dispatch("addHistory", payload).then(({ data }) => {
            this.$store.state.carts.forEach((product) => {
              const payload = {
                productName: product.Product.name,
                quantity: product.quantity,
                tot_price: product.price,
                historyId: data.id,
              };
              this.$store
                .dispatch("addTransaction", payload)
                .then(() => {
                  return this.$store.dispatch("deleteProduct", product.id);
                })
                .then(() => {
                  const payload = {
                    id: product.Product.id,
                    stock: {
                      stock: product.Product.stock - product.quantity,
                    },
                  };
                  return this.$store.dispatch("patchProduct", payload);
                })
                .then(() => {
                  const payload = {
                    totalBuildPrice: this.$store.state.totPrice,
                  };
                  this.$store.dispatch("checkoutPaymentGateway", payload);
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                });
            });
          });
        }
      });
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
