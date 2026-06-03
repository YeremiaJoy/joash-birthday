let _audio: HTMLAudioElement | null = null;

export function registerAudio(audio: HTMLAudioElement) {
  _audio = audio;
}

export function getAudio(): HTMLAudioElement | null {
  return _audio;
}
