<script>
import { mapActions, mapState } from 'pinia';
import { useSpotifyStore } from '../stores/spotify';

export default {
  name: 'PostCard',
  data() {
    return {
      currentTrack: {
        name: "",
        album: {
          name: "",
          images: [
            {
              url: "",
            },
          ],
        },
        artists: [
          {
            name: "",
          },
        ],
        external_urls: {
          spotify: "",
        },
      }
    }
  },
  props: ['post', 'currentUserId'],
  emits: ['toDetail', 'toEdit', 'submitDelete'],
  computed: {
    ...mapState(useSpotifyStore, ['track'])
  },
  methods: {
    ...mapActions(useSpotifyStore, ['getSpotifyData']),

    openNewTab(link) {
      window.open(
        link,
        '_blank'
      );
    }
  },
  async created() {
    if (this.post.spotifyTrackId) {
      await this.getSpotifyData(this.post.spotifyTrackId)
      this.currentTrack = this.track
    }
  }
}
</script>

<template>
  <div class="card-custom container mt-5 mb-5 pt-3 border rounded">
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
          <a href="" @click.prevent="$emit('toDetail', post.id)">{{ post.title }}</a>
        </h2>
      </div>

      <div v-if="post.spotifyTrackId" class="mb-3 border rounded shadow p-1 embed">
        <div class="d-flex">
          <div>
            <img :src="currentTrack.album.images[0].url" style="max-width: 150px; max-height: 150px;" alt="">
          </div>
          <div>
            <div>
              <div>
                <div class="mx-3">
                  Title: <span>{{ currentTrack.name }}</span>
                </div>
                <div class="mx-3">
                  Artist: <span>{{ currentTrack.artists[0].name }}</span>
                </div>
                <div class="mx-3">
                  Album: <span>{{ currentTrack.album.name }}</span>
                </div>
              </div>
              <div class="mx-3 mt-4">
                <button class="btn btn-secondary rounded-pill"
                  @click="openNewTab(currentTrack.external_urls.spotify)">Open in
                  Spotify</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded col-3 text-center" style="background-color: turquoise;">
        <h6>{{ post.Category.name }}</h6>
      </div>

      <div>
        <p>{{ post.content.length > 200 ? post.content.slice(0, 200) + '...' :
          post.content }}</p>
      </div>

      <div class="mb-2" v-if="currentUserId == post.UserId">
        <a href="" style="font-size: large;" class="me-2" @click.prevent="$emit('toEdit', post.id)"><i
            class="bi bi-pencil-square"></i></a>
        <a href="" style="font-size: large;" class="me-2" @click.prevent="$emit('submitDelete', post.id)"><i
            class="bi bi-trash3-fill"></i></a>
      </div>
    </div>
  </div>
</template>

<style>
span {
  font-weight: 500;
}
</style>