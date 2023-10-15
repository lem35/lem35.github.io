/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Bad",
          artist: "Wave to Earth",
          cover: "https://i.scdn.co/image/ab67616d0000b273c21555708975ad94b1faf422",
          source: "https://od.lk/s/MjZfNTkzNDUzMjZf/wave%20to%20earth%20-%20bad%20%28Official%20Lyric%20Video%29%20%281%29.mp3",
          url: "https://www.youtube.com/watch?v=6Q5xqNkCk7w",
          favorited: false
        },
        {
          name: "Everything",
          artist: "Cliff",
          cover: "https://i.scdn.co/image/ab67616d00001e02e2f80a5ef462a58a07a5d1fd",
          source: "https://od.lk/s/MjZfNTkzNDUzMzBf/Cliff%20-%20Everything%20%28Official%20Lyric%20Video%29.mp3",
          url: "https://www.youtube.com/watch?v=wLM_Zodfx0s",
          favorited: true
        },
        {
          name: "Mundo",
          artist: "IV Of Spades",
          cover: "https://i.scdn.co/image/ab67616d0000b273b13cedfd0561ede2aaaa0947",
          source: "https://od.lk/s/MjZfNTkzNDUzNTNf/Mundo.mp3",
          url: "https://www.youtube.com/watch?v=OZY1aG2VkAg",
          favorited: false
        },
        {
          name: "Painkiller",
          artist: "Ruel",
          cover: "https://i.scdn.co/image/ab67616d0000b273f7406e9cbd7f974e7ddf7b0e",
          source: "https://od.lk/s/MjZfNTkzNDUzMzRf/Ruel%20-%20Painkiller%20%28Official%20Video%29.mp3",
          url: "https://www.youtube.com/watch?v=dTwj7PhpY9M",
          favorited: false
        },
        {
          name: "My Favorite Part ft. Ariana Grande",
          artist: "Mac Miller",
          cover: "https://i.scdn.co/image/ab67616d0000b2732e92f776279eaf45d14a33fd",
          source: "https://od.lk/s/MjZfNTkzNDUzMzNf/My%20Favorite%20Part%20%20Mac%20Miller%20ft.%20Ariana%20Grande%20Lyrics.mp3",
          url: "https://www.youtube.com/watch?v=2vkko-vX06I",
          favorited: true
        },
        {
          name: "Congratulations ft. Bilal",
          artist: "Mac Miller",
          cover: "https://i.scdn.co/image/ab67616d0000b2732e92f776279eaf45d14a33fd",
          source: "https://od.lk/s/MjZfNTkzNDUzMzFf/Mac%20Miller%20-%20Congratulations%20%28feat.%20Bilal%29.mp3",
          url: "https://www.youtube.com/watch?v=JoFkQ7iAQcw",
          favorited: false
        },
        {
          name: "million little reasons",
          artist: "Oscar Lang",
          cover: "https://i.scdn.co/image/ab67616d0000b273518be10648dfed9a0754e344",
          source: "https://od.lk/s/MjZfNTkzNDUzMzJf/million%20little%20reasons.mp3",
          url: "https://www.youtube.com/watch?v=ilZAUXSSk8A",
          favorited: true
        },
        {
          name: "you.",
          artist: "Oscar Lang",
          cover: "https://i.scdn.co/image/ab67616d0000b273518be10648dfed9a0754e344",
          source: "https://od.lk/s/MjZfNTkzNDUzMThf/you..mp3",
          url: "https://www.youtube.com/watch?v=r66QZlJoQTM",
          favorited: false
        },
        {
          name: "Easily",
          artist: "Bruno Major",
          cover: "https://i.scdn.co/image/ab67616d0000b273a74b5540eb5322f0bca74c7d",
          source: "https://od.lk/s/MjZfNTkzNDUzMjlf/Bruno%20Major%20-%20Easily%20%28Official%20Audio%29.mp3",
          url: "https://www.youtube.com/watch?v=sRJ4RywOPvA",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});