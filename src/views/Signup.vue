<template>
    <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h2 class="text-center">Sign Up</h2>
        
        <Errors :errors="errors" />
        <form @submit.prevent="signUp">
          <div class="form-group">
            <input v-model.trim="username"
                   class="form-control"
                   placeholder="Username"
                   required>
          </div>
          <div class="form-group">
            <input v-model.trim="password"
                   class="form-control"
                   type="password"
                   placeholder="Password"
                   required>
          </div>
          <button type="submit" class="btn btn-color btn-block">
            Sign Up
          </button>
        </form>
        
          <router-link to="/sign-in">
            Already have an account?
          </router-link>
        
      </div>
    </div>
  </div>
</template>

<script>
import Errors from "@/components/Errors";

export default {
  components: { Errors },
  data() {
    return {
      username: "",
      password: "",
      errors: {}
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch("signUp", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.errors = {};
          this.$router.push("photos");
        })
        .catch(errors => {
          this.errors = errors;
        });
    }
  }
};
</script>

<style scoped lang="scss">
form {
  margin-top: 1rem;
}
.btn-color {
  background-color: green;
}
</style>
