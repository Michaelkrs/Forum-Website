<script>
import { mapActions, mapState } from 'pinia';
import { useDetailStore } from '../stores/posts';
import AddCommentForm from '../components/AddCommentForm.vue';
import { useCommentStore } from '../stores/comments';
import { useLoginStore } from '../stores/loginRegister';
import { useSpotifyStore } from '../stores/spotify';

export default {
  name: "DetailPage",
  data() {
    return {
      PostId: 0
    }
  },
  computed: {
    ...mapState(useDetailStore, ["post"]),
    ...mapState(useLoginStore, ['isLoggedIn']),
    ...mapState(useSpotifyStore, ['track'])
  },
  methods: {
    ...mapActions(useDetailStore, ["postDetail"]),
    ...mapActions(useCommentStore, ['addComment']),
    ...mapActions(useSpotifyStore, ['getSpotifyData']),
    async submitComment(PostId, comment) {
      await this.addComment(PostId, comment)
      this.postDetail(this.$route.params.id)
    },
    getTrackData(id) {
      this.getSpotifyData(id)
    },
    openNewTab(link) {
      window.open(
        link,
        '_blank'
      );
    }
  },
  async created() {
    await this.postDetail(this.$route.params.id);
    this.PostId = this.$route.params.id

    if (this.post.spotifyTrackId) {
      this.getTrackData(this.post.spotifyTrackId)
    }
  },
  components: { AddCommentForm }
}
</script>

<template>
  <div class="card-custom container mt-5 mb-5 pt-3 border rounded col-8">
    <div class="row">
      <div class="row-sm-height">
        <div class="col-md-6 col-height col-middle">
          <div class="image-background">
            <div class="image-container">
              <img :src="post.imgUrl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-2">
      <div class="mt-2">
        <h2>
          <a href="" @click.prevent="toDetail(post.id)">{{ post.title }}</a>
        </h2>
      </div>

      <div class="mb-3 border rounded shadow p-1 embed" v-if="this.post.spotifyTrackId">
        <div class="d-flex">
          <div>
            <img :src="track.album.images[0].url" style="max-width: 200px; max-height: 200px;" alt="">
          </div>
          <div>
            <div class="ms-2">
              <div>
                <div class="mx-3">
                  Title: <span>{{ track.name }}</span>
                </div>
                <div class="mx-3">
                  Artist: <span>{{ track.artists[0].name }}</span>
                </div>
                <div class="mx-3">
                  Album: <span>{{ track.album.name }}</span>
                </div>
              </div>
              <div class="mx-3 mt-5">
                <button class="btn btn-secondary rounded-pill" @click="openNewTab(track.external_urls.spotify)">Open in
                  Spotify</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded col-3 text-center" style="background-color: turquoise;">
        <h6>{{ post.Category.name }}</h6>
      </div>

      <div class="col-12">
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>

  <!-- ================================================== -->

  <div class="container my-5">

    <div class="row  d-flex justify-content-center">

      <div class="col-md-8">

        <div class="headings d-flex justify-content-between align-items-center mb-3">
          <h5 style="color: white;">Comments</h5>

        </div>

        <div class="card p-3 my-2" v-for="comment in post.Comments" :key="comment.id">
          <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center">
              <img src="https://i.imgur.com/hczKIze.jpg" width="30" class="user-img rounded-circle me-2">
              <span><small class="font-weight-bold text-primary">{{ comment.User.username }}</small></span>

            </div>
          </div>
          <div><small class="font-weight-bold">{{ comment.comment }}</small></div>
        </div>

        <AddCommentForm v-if="isLoggedIn" :PostId="PostId" @submitComment="submitComment" />
      </div>

    </div>

  </div>
</template>

<style>
.dots {

  height: 4px;
  width: 4px;
  margin-bottom: 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.user-img {

  margin-top: 4px;
}

.check-icon {

  font-size: 17px;
  color: #c3bfbf;
  top: 1px;
  position: relative;
  margin-left: 3px;
}

.form-check-input {
  margin-top: 6px;
  margin-left: -24px !important;
  cursor: pointer;
}


.form-check-input:focus {
  box-shadow: none;
}


.icons i {

  margin-left: 8px;
}

body {
  background: #1C3738;
}

a {
  color: black;
}

.card-custom {
  background: #F2F4F3;
  box-shadow: 0px 5px 15px 6px rgba(0, 0, 0, 0.4);
}

.row-height {
  display: table;
  table-layout: fixed;
  height: 100%;
  width: 100%;
}

.col-height {
  display: table-cell;
  float: none;
  height: 100%;
}

.col-top {
  vertical-align: top;
}

.col-middle {
  vertical-align: middle;
}

.col-bottom {
  vertical-align: bottom;
}

@media (min-width: 480px) {
  .row-xs-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-xs-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-xs-top {
    vertical-align: top;
  }

  .col-xs-middle {
    vertical-align: middle;
  }

  .col-xs-bottom {
    vertical-align: bottom;
  }
}

@media (min-width: 768px) {
  .row-sm-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-sm-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-sm-top {
    vertical-align: top;
  }

  .col-sm-middle {
    vertical-align: middle;
  }

  .col-sm-bottom {
    vertical-align: bottom;
  }
}

@media (min-width: 992px) {
  .row-md-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-md-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-md-top {
    vertical-align: top;
  }

  .col-md-middle {
    vertical-align: middle;
  }

  .col-md-bottom {
    vertical-align: bottom;
  }
}

@media (min-width: 1200px) {
  .row-lg-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-lg-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-lg-top {
    vertical-align: top;
  }

  .col-lg-middle {
    vertical-align: middle;
  }

  .col-lg-bottom {
    vertical-align: bottom;
  }
}

/* --------------------- */
.image-background {
  background: #000;
  display: table;
  width: 100%;
  height: 100%;
  position: relative;
}

.image-container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
}

img {
  display: block;
  max-height: 80%;
  max-width: 80%;
  margin: auto;
}
</style>