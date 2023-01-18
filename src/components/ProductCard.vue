<template>
  <div class="col-xl-3 col-lg-4 col-md-4 col-12">
    <div class="single-product">
      <div class="product-img">
        <div class="tengahkan">
          <img
            class="default-img"
            :src="product.image_url"
            alt=""
            :class="product.stock === 0 ? 'nostock' : ''"
          />
          <div class="nostocktext" v-if="product.stock === 0">
            <b class="text-danger h3">SOLD OUT</b>
          </div>
        </div>
        <div class="button-head" v-if="product.stock > 0">
          <div class="product-action">
            <a title="Compare" href="#"
              ><i class="ti-bar-chart-alt"></i
              ><span>Stock: {{ product.stock }}</span></a
            >
          </div>
          <div class="product-action-2">
            <a title="Add to cart" href="#" @click.prevent="addCart(product.id)"
              >Add to cart</a
            >
          </div>
        </div>
      </div>
      <div class="product-content">
        <h3>
          <a href="" @click.prevent>{{ product.name }}</a>
        </h3>
        <div class="product-price">
          <span>IDR {{ product.price.toLocaleString("id") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  props: ["product"],
  methods: {
    addCart(id) {
      if (localStorage.access_token) {
        const payload = {
          productId: id,
          quantity: 1,
        };
        this.$store
          .dispatch("addCart", payload)
          .then(() => {
            this.$router.push("/cart");
          })
          .catch((err) => {
            swal("Oops!", err.response.data.message, "error", {
              buttons: false,
              timer: 2000,
            });
          });
      } else {
        this.$router.push("/login").catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
.nostock {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}
.nostocktext {
  position: absolute;
  top: 65%;
  left: 25%;
  /* transform: translate(-50%, -50%); */
  transform-origin: 0% 0%;
  transform: rotate(-39deg);
}
img {
  height: 280px;
  width: 100%;
  object-fit: cover;
}
</style>
