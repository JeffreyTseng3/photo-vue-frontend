<template>
  <div class="container">
    <div v-show="isLoading" class="spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <div class="col">
      <div v-for="photo in photos" :key="photo.id" class="photo-col"> 
        <Photo :photo="photo"/> 
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import Photo from "@/components/Photo";

export default {
  components: {
    Photo
  },
  data() {
    return {
      photos: [],
      isLoading: true
    };
  },
  computed: {
    collectionItems() {
      return this.$store.state.collectionItems;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
    created() {
    api.getPhotos().then(response => {
      this.photos = response.data;
      this.isLoading = false;
      this.$store.dispatch("getCollectionItems");
    });
  }
}
</script>

<style scoped lang="scss">
.photo-col {

}
.spinner {
  font-size: 7rem;
  text-align: center;
}
</style>
