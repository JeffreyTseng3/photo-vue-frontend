<template>
    <div class="card">
      <img class="image-dim photo"  :src="photo.imageUrl" :alt="photo.imageUrl">   
      <div class="card-body">
      <h3 class="card-title">{{ photo.title }}</h3>
      
      <button v-if="isInCollection(photo)"
                   class="btn btn-secondary"
                   @click="removeFromCollection(photo)">
          Remove from collection
      </button>

      <button v-else
              class="btn btn-outline-secondary"
              @click="addToCollection(photo)">
        
        Add to collection
      </button>
      <router-link :to="{path: '/photos/' + photo.id}" class="comments-link">view comments</router-link> 

      </div>
    </div>


</template>


<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true
    }
  },
  computed: {
    collectionItems() {
      return this.$store.state.collectionItems;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    isInCollection(photo) {
      return this.collectionItems.find(item => item.photo.id === photo.id);
    },
    addToCollection(photo) {
      if (this.isAuthenticated) {
        this.$store.dispatch("createCollectionItem", photo.id);
      } else {
        this.$router.push("sign-in");
      }
    },
    removeFromCollection(photo) {
       this.$store.dispatch("deleteCollectionItem", photo.id);
    }
  }

};
</script>
<style scoped lang="scss">
    .image-dim {
      width: 25vw;
    }
    .card {
      margin-bottom: 1.5rem;
      width: 50vw;
      padding: 10px;

  .btn {
    text-transform: lowercase;
    font-size: 0.85rem;
  }

  img.photo {
    margin: 0.75rem;
  }
  .comments-link {
    margin-left: 20px;
  }
}

</style>
