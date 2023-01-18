<template>
  <div class="js">
    <NavbarVue />
    <div class="product-area section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h2>Products</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="product-info">
              <div class="nav-main">
                <!-- Tab Nav -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li
                    class="nav-item"
                    v-for="category in $store.state.categories"
                    :key="category.id"
                  >
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      :href="'#' + category.id"
                      @click.prevent="changeCategory(category.category)"
                      role="tab"
                      >{{ category.category }}</a
                    >
                  </li>
                </ul>
                <!--/ End Tab Nav -->
              </div>
              <div class="tab-content" id="myTabContent">
                <!-- Start Single Tab -->
                <div
                  class="tab-pane fade show"
                  :id="category.id"
                  role="tabpanel"
                  v-for="category in $store.state.categories"
                  :key="category.id"
                  :class="[
                    category.category == productByCategory ? 'active' : '',
                  ]"
                >
                  <div class="tab-single">
                    <div class="row mb-5">
                      <ProductCardVue
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                      />
                    </div>
                  </div>
                </div>
                <!--/ End Single Tab -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
</template>

<script>
import NavbarVue from "../components/Navbar.vue";
import FooterVue from "../components/Footer.vue";
import ProductCardVue from "../components/ProductCard.vue";

export default {
  name: "Home",
  components: {
    NavbarVue,
    FooterVue,
    ProductCardVue,
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();

    if (localStorage.access_token) {
      this.$store.dispatch("authenticate", true);
    }
  },
  data() {
    return {
      searchData: {
        search: "",
        category: "Flower Bouquet",
      },
      productByCategory: "Flower Bouquet",
    };
  },
  computed: {
    products() {
      return this.$store.getters.filteredProducts(this.productByCategory);
    },
  },
  methods: {
    searchProduct() {
      if (this.searchData.search !== null)
        this.$store.dispatch("search", this.searchData);
      else this.$store.dispatch("fetchProducts", this.searchData.category);
    },
    submitLogout() {
      localStorage.removeItem("access_token");
      this.$store.dispatch("authenticate", false);
    },

    changeCategory(id) {
      this.productByCategory = id;
    },
    fetchProducts() {
      this.$store.dispatch("fetchProducts");
    },
    fetchCategories() {
      this.$store.dispatch("fetchCategories");
    },
  },
};
</script>
