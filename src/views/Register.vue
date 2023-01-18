<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="images/image0.jpg" alt="IMG" />
        </div>

        <form
          class="login100-form validate-form"
          @submit.prevent="submitRegister"
        >
          <span class="login100-form-title">
            Hello New User!
          </span>

          <div
            class="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              class="input100"
              type="text"
              name="email"
              placeholder="Email"
              v-model="userData.email"
            />
            <span class="focus-input100"></span>
          </div>

          <div
            class="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              class="input100"
              type="password"
              name="pass"
              placeholder="Password"
              v-model="userData.password"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn">
              Create Your Account
            </button>
          </div>

          <div class="text-center p-t-136">
            <a
              class="txt2"
              href="#"
              @click.prevent="$router.push('/login').catch((err) => {})"
            >
              Already have an Account? Login Here
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  title: "Login",
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitRegister() {
      this.$store
        .dispatch("register", this.userData)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
