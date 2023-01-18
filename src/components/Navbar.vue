<template>
  <header class="header shop">
    <div class="middle-inner">
      <div class="container">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-12">
            <!-- Logo -->
            <div class="logo">
              <a href="#" @click.prevent="$router.push('/').catch((err) => {})"
                ><img src="images/New Project.png" alt="logo"
              /></a>
            </div>
            <!--/ End Logo -->
            <!-- Search Form -->
            <div class="search-top">
              <div class="top-search">
                <a href="#0"><i class="ti-search"></i></a>
              </div>
              <!-- Search Form -->
              <div class="search-top">
                <form class="search-form">
                  <input
                    type="text"
                    placeholder="Search here..."
                    name="search"
                  />
                  <button value="search" type="submit">
                    <i class="ti-search"></i>
                  </button>
                </form>
              </div>
              <!--/ End Search Form -->
            </div>
            <!--/ End Search Form -->
            <div class="mobile-nav"></div>
          </div>
          <div class="col-lg-8 col-md-7 col-12">
            <div class="search-bar-top">
              <div class="search-bar">
                <select v-model="searchData.category">
                  <option selected="selected" value="0">All Category</option>
                  <option value="1">Flower Bouquet</option>
                  <option value="2">Hand Crafts</option>
                </select>
                <form>
                  <input
                    name="search"
                    placeholder="Search Products Here....."
                    type="search"
                    v-model="searchData.search"
                  />
                  <button class="btnn" @click.prevent="searchProduct">
                    <i class="ti-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-12">
            <div class="right-bar">
              <!-- Search Form -->
              <div
                class="sinlge-bar shopping"
                v-if="$store.state.isAuthenticated === true"
              >
                <a
                  href=""
                  @click.prevent="$router.push('/cart').catch((err) => {})"
                  class="single-icon"
                  ><i class="ti-bag"></i
                ></a>
              </div>
              <div
                class="sinlge-bar"
                v-if="$store.state.isAuthenticated === true"
              >
                <a
                  href="#"
                  class="single-icon"
                  @click.prevent="$router.push('/history').catch((err) => {})"
                  ><i class="fa fa-history" aria-hidden="true"></i
                ></a>
              </div>
              <div
                class="sinlge-bar"
                v-if="$store.state.isAuthenticated === true"
              >
                <a href="#" class="single-icon" @click.prevent="submitLogout"
                  ><i class="fa fa-sign-out" aria-hidden="true"></i
                ></a>
              </div>
              <div
                class="sinlge-bar"
                v-if="$store.state.isAuthenticated === false"
              >
                <a
                  href="#"
                  class="single-icon"
                  @click.prevent="$router.push('/login').catch((err) => {})"
                  ><i class="fa fa-sign-in" aria-hidden="true"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    submitLogout() {
      localStorage.removeItem("access_token");
      this.$store.dispatch("authenticate", false);
    },
    searchProduct() {
      if (this.searchData.category !== "0") {
        const category =
          this.searchData.category == "1" ? "Flower Bouquet" : "Hand Craft";
        const searchPayload = {
          search: this.searchData.search,
          category,
        };
        this.$store.dispatch("search", searchPayload);
      } else {
        this.$store.dispatch("fetchProducts");
        this.$store.dispatch("fetchHandcrafts");
      }
    },
  },
  data() {
    return {
      searchData: {
        search: "",
        category: "0",
      },
    };
  },
};
</script>

<style></style>
