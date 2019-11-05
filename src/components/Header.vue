<template>
  <header>
      <nav class="navbar navbar-expand navbar-primary">
      <div class="container">
        <a class="navbar-brand"></a>
        <ul class="navbar-nav">
            <template v-if="isAuthenticated">
            <li class="nav-item">
              <a @click="signOut">Sign Out</a>
            </li>
            <li class="nav-item user">
              <i class="far fa-user"></i>
              {{ username }}
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/sign-in">Sign In</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sign-up">Sign Up</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <div class="brand">
      <span class="name">Photo Collection</span>
    </div>

    <nav class="navbar navbar-expand navbar-secondary">
      <div class="container justify-content-center">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/photos">Photos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/collection">Collection</router-link>
          </li>
        
        </ul>
      </div>
    </nav>

  </header>
</template>

<script>
export default {
computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    signOut: function() {
      this.$store.dispatch("signOut").then(() => {
        this.$router.push("sign-in");
      });
    }
  }
};
</script>
  
<style scoped lang="scss">
.nav-item {
  a {
    color: $brand-text-color;
    opacity: 0.7;
    text-decoration: none;
    padding-bottom: 2px;

    &.active,
    &:hover {
      color: $brand-text-color;
      opacity: 1;
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.navbar-primary {
  background-color: $nav-primary-color;
  padding-bottom: 15px;

  .nav-item {
    margin-right: 15px;

    a {
      font-size: 1rem;
    }

    &.user {
      color: $muted-text-color;
    }
  }
}

.navbar-secondary {
  background-color: $nav-secondary-color;
  padding-bottom: 25px;

  .nav-item {
    margin: 0 15px;
    a {
      font-size: 1.5rem;
      padding: 0;
    }
  }


}

a.router-link-exact-active {
  border-bottom: 2px solid rgb(21, 98, 157);
  opacity: 1;
}

.brand {
  text-align: center;
  background-color: $nav-secondary-color;
  padding: 20px 0 20px 0;

  .logo {
    display: inline-block;
    vertical-align: top;
    margin-right: 12px;
  }

  .name {
    font-size: 2.6rem;
    font-weight: 600;
    // text-transform: uppercase;
    display: inline-block;
    color: $brand-text-color;
  }
}
</style>
