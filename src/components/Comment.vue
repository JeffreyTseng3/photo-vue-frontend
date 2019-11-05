<template>
    <div class="comment-format">
        <span style="font-weight: bold">{{this.author.username}} </span>
          <span>({{comment.created_at.split('T')[0]}}): </span>
        <span>{{comment.comment_body}}</span>
    </div>
</template>


<script>
import api from "@/api";

export default {
    data () {
        return {

            author: ""
        }
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    created() {
        api.loadUsernames().then(response => {
        let authorId = this.comment.user_id
        let users = response.data
        this.author = users.filter(user => user.id == authorId )[0]
    })
    }
}
</script>

<style scoped lang="scss">
    .comment-format {
        border-bottom: solid 1px grey;
        margin: 5px;
    }

</style>
