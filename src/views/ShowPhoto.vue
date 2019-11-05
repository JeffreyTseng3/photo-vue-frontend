<template>
    <div class="container">
        <div class="card-temp">
            <img class="image-dim"  :src="this.imageUrl" >   
        </div>
        <h1 class="text-center">{{this.photo.title}}</h1>
        <div>
            <h3>Comments</h3>


            <form v-if="isAuthenticated"  @submit="makeComment">
                <div class="form-group">
                    <input class="form-control" v-model="commentBody" type="text" placeholder="What are your thoughts?">
                </div>
                <button 
                    type="submit" 
                    class="btn btn-color btn-block">submit comment</button>
            </form>

            <div v-else>
                 <router-link  to="/sign-in">Sign in to comment</router-link>
            </div>
            
                <div v-for="comment in comments" :key="comment.id" > 
                    <Comment :comment="comment"/>
                </div>
            
        </div>
    </div>
   
</template>

<script>
import api from "@/api";
import Comment from "@/components/Comment";

export default {
  components: {
      Comment
  },
  data() {
    return {
        photos: [],
        photo: [],
        imageUrl: "",
        isLoading: true,
        commentBody: '',
        photoId: '',
        comments: [],
        
    };
  },
  computed: {
      isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
      makeComment() {
              this.$store.dispatch('makeComment', {
              commentBody: this.commentBody,
              photoId: this.photo.id
          })
      },
      
  },
    created() {
       
    api.getPhotos().then(response => {
        this.photos = response.data;
        this.photo = response.data.filter(d => d.id == this.$route.params.id)[0];
        this.comments = this.photo.comments;
        this.imageUrl = this.photo.imageUrl
        this.isLoading = false;
        this.$store.dispatch("getCollectionItems");
    });

   

  }
}

</script>

<style scoped lang="scss">
    .card-temp {
        display: flex;
        justify-content: center;
        align-content: center;
        margin-bottom: 1.5rem;
        
      
    }
    .image-dim {
        height: 400px;
       
    }
    .btn-color {
        background-color: green;
    }
</style>
