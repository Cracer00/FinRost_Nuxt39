<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
    <button @click="startPlayback">Play</button>
    <div class="video-container">
      <div v-if="isLoading" class="loading-indicator">
        Loading... {{ loadedPercent }}%
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      loadedPercent: 0,
      isLoading: false,
      player: null,
    }
  },
  mounted() {
    this.fetchVideo().then(stream => {
      this.isLoading = false;
      const player = videojs(document.querySelector('.video-js'));
      const videoBlob = new Blob([stream], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);

      player.src({
        src: videoUrl,
        type: 'video/mp4',
      });

      player.load();
    });
    // this.player = videojs(this.$refs.videoPlayer, this.options, () => {
    //   this.player.log('onPlayerReady', this)
    // })
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    startPlayback() {
      const player = videojs(document.querySelector('.video-js'));
      player.play(); // Начать воспроизведение
    },
    async fetchVideo() {
      try {
        this.isLoading = true;
        const response = await fetch('https://krk-finance-test-bucket.hb.bizmrg.com/5103adc8-37c9-449e-84c4-65a7fc662c12.mp4\n');
        const totalSize = response.headers.get('content-length');
        let loadedSize = 0;
        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value);
          loadedSize += value.length;
          this.loadedPercent = Math.floor((loadedSize / totalSize) * 100);
        }

        const stream = new Uint8Array(loadedSize);
        let offset = 0;

        for (const chunk of chunks) {
          stream.set(chunk, offset);
          offset += chunk.length;
        }

        return stream.buffer;
      } catch (error) {
        console.error('Error fetching video:', error);
        this.isLoading = false;
      }
    },
  },
}
</script>
