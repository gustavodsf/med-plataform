import 'shaka-player/dist/controls.css';

import { ShakaPlayer } from '@components/ShakaPlayer';

function Video() {
  return (
    <ShakaPlayer url="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd">
      {' '}
    </ShakaPlayer>
  );
}

export { Video };
