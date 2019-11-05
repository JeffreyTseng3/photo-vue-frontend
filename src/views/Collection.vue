<template>
  <div v-if="isEmpty">
    <div class="container empty-box">
      <p>
       Fill up your collection!
      </p>
      <router-link to="/photos">Browse</router-link>
    </div>
  </div>
  <div v-else>
    <div class="container">
        <div class="row">
          <div v-for="item in items" :key="item.id" class="col-md-6"> 
            <CollectionItem :item="item"/> 
          </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import CollectionItem from "@/components/CollectionItem";

export default {
  components: {
    CollectionItem
  },
  data() {
    return {
      selectedItem: null
    };
  },
  created() {
    this.$store.dispatch("getCollectionItems");
  },
  computed: {
    items() {
      return this.$store.state.collectionItems;
    },
    isEmpty() {
      return this.items.length == 0;
    },
  
  }
};
</script>

<style scoped lang="scss">
#items {
  img {
    width: 175px;
    padding: 10px;
    cursor: pointer;
  }

  img.selected {
    border: 4px solid $muted-text-color;
  }
}

.empty-box {
  font-size: 2rem;
  color: $primary-text-color;
  text-align: center;
  padding: 2rem;

}
</style>
