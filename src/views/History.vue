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
                <li class="active">History</li>
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
                  <th>DATE</th>
                  <th>TOTAL PRICE</th>
                  <th>DETAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in $store.state.history" :key="data.id">
                  <td>
                    {{
                      new Date(data.createdAt).toLocaleDateString("id", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </td>
                  <td>IDR {{ data.totalPrice.toLocaleString("id") }}</td>
                  <td>
                    <a
                      href=""
                      @click.prevent="
                        $router.push(`/history/${data.id}`).catch((err) => {})
                      "
                      >Detail</a
                    >
                  </td>
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
    this.fetchHistory();
  },
  methods: {
    fetchHistory() {
      this.$store.dispatch("fetchHistory");
    },
  },
};
</script>

<style></style>
