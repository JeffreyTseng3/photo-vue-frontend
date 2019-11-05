<template>
  <div class="card">
      <img class="photo image-dim" 
           :src="item.photo.imageUrl"
           :alt="item.photo.title">
    <div class="card-body">
      <h3 class="card-title">{{ item.photo.title }}</h3>
      <button class="btn btn-secondary" @click="removeFromCollection(item.photo)">
          Remove from collection
      </button>
    <router-link :to="{path: '/photos/' + item.photo.id}" class="comments-link">view comments</router-link> 

    </div>
    
  </div>
</template>

<script>
import api from "@/api";


export default {
  components: {
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: []
    };
  },
  created() {
    // api.getComments(this.item.photo.id).then(response => {
    //   this.comments = response.data;
    // });
  },
   methods: {
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
  width: 30vw;

}

  img.photo {
    margin: 0.75rem;
  }

  .btn {
    text-transform: lowercase;
    font-size: 0.85rem;
  }
  .comments-link {
    margin-left: 20px;
  }

</style>
