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

player.on('timeupdate', throttle(onSaveCurrentTime, 500));

const lastTime = localStorage.getItem('videoplayer-current-time')
if (lastTime) {
  player.setCurrentTime(lastTime);
} 
