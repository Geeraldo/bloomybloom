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
                <li>
                  <a
                    href=""
                    @click.prevent="$router.push('/history').catch((err) => {})"
                    >History<i class="ti-arrow-right"></i
                  ></a>
                </li>
                <li class="active">Detail</li>
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
                  <th>PRODUCT NAME</th>
                  <th>QUANTITY</th>
                  <th>TOTAL PRICE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in $store.state.transaction" :key="data.id">
                  <td>
                    {{ data.productName }}
                  </td>
                  <td>
                    {{ data.quantity }}
                  </td>
                  <td>IDR {{ data.tot_price.toLocaleString("id") }}</td>
                </tr>
              </tbody>
            </table>
            <!--/ End Shopping Summery -->
          </div>
        </div>
      </div>
    </div>
    <!--/ End Shopping Cart -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  title: "Transaction History",
  components: {
    Navbar,
    Footer,
  },
  created() {
    this.fetchTransaction();
  },
  methods: {
    fetchTransaction() {
      this.$store.dispatch("fetchTransaction", this.$route.params.id);
    },
  },
};
</script>

<style></style>
