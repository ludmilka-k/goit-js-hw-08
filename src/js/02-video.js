import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onSaveCurrentTime = function () {
  player.getCurrentTime().then(function(seconds) {
    localStorage.setItem('videoplayer-current-time', seconds);
  }).catch(function(error) {
    // an error occurred
  });  
};

const throttledOnSaveCurrentTime = throttle(onSaveCurrentTime, 500);

player.on('timeupdate', throttledOnSaveCurrentTime);

const lastTime = localStorage.getItem('videoplayer-current-time')
player.setCurrentTime(lastTime);
