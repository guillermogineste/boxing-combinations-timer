type AudioNodes = {
  oscillator: OscillatorNode;
  gainNode: GainNode;
};

// Helper function to create and configure oscillator and gain nodes
const createAudioNodes = (
  audioCtx: AudioContext,
  frequency: number,
  volume: number,
  startTime: number,
  duration: number,
): AudioNodes => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Set the oscillator frequency and type
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  // Set the initial gain value
  gainNode.gain.setValueAtTime(volume, startTime);
  // gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  // Connect the oscillator to the gain node and the gain node to the audio context destination
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  return { oscillator, gainNode };
};

const playSingleBeep = (
  audioCtx: AudioContext,
  frequency: number,
  volume: number,
  startTime: number,
  duration: number,
): void => {
  const { oscillator, gainNode } = createAudioNodes(
    audioCtx,
    frequency,
    volume,
    startTime,
    duration,
  );

  // Set initial gain to 0
  gainNode.gain.setValueAtTime(0, startTime);

  // Attack phase: ramp up to the desired volume
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.001); // 1ms

  // Decay and Sustain phase: ramp down to 80% of the volume
  gainNode.gain.linearRampToValueAtTime(volume * 0.8, startTime + 0.001); // 1ms

  // Release phase: ramp down to 0
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  // Start the oscillator
  oscillator.start(startTime);

  // Schedule the stop time for the oscillator
  oscillator.stop(startTime + duration);
};

/**
 * playBeep - Plays a beep sound using the Web Audio API.
 *
 * @param duration  - The duration of the beep in milliseconds. Default is 100 ms.
 * @param frequency - The frequency of the beep in Hz. Default is 1000 Hz.
 * @param volume    - The volume level of the beep from 0 to 1. Default is 1.
 * @param beepCount - The number of beeps to play. Default is 1.
 * @param timeGapBetweenBeeps - The time gap between each beep in milliseconds. Default is 100 ms.
 *
 * @returns void
 */

export const playBeep = (
  duration: number = 100,
  frequency: number = 1000,
  volume: number = 1,
  beepCount: number = 1,
  timeGapBetweenBeeps: number = 100,
  delay: number = 0,
): void => {
  const audioCtx = new ((window.AudioContext ||
    (window as any).webkitAudioContext) as typeof AudioContext)();
  let startTime = audioCtx.currentTime + delay;
  // Play beeps
  for (let i = 0; i < beepCount; i++) {
    playSingleBeep(audioCtx, frequency, volume, startTime, duration / 1000);
    startTime += duration / 1000 + timeGapBetweenBeeps / 1000;
  }
};