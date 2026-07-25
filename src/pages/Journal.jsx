import { useEffect, useRef, useState } from 'react';
import { getJournal, saveReflection } from '../utils/storage.js';

const getSpeechRecognition = () => window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Journal() {
  const [entries, setEntries] = useState(() => getJournal());
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const keepListeningRef = useRef(false);
  const sessionErroredRef = useRef(false);

  useEffect(() => () => {
    keepListeningRef.current = false;
    recognitionRef.current?.abort();
  }, []);

  const saveTranscript = () => {
    const transcript = `${finalTranscriptRef.current} ${interimTranscriptRef.current}`
      .replace(/\s+/g, ' ')
      .trim();

    if (!transcript) {
      setStatus('idle');
      setError("I couldn't hear anything. Tap the microphone and try again.");
      return;
    }

    saveReflection('voice-journal', transcript);
    setEntries(getJournal());
    setStatus('saved');
    window.setTimeout(() => setStatus('idle'), 1800);
  };

  const startJournal = async () => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError('Voice journaling is not supported by this browser. Try Chrome or Safari.');
      return;
    }

    setError('');
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    keepListeningRef.current = true;
    sessionErroredRef.current = false;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const words = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          finalTranscriptRef.current += ` ${words}`;
        } else {
          interim += words;
        }
      }
      interimTranscriptRef.current = interim;
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') return;
      keepListeningRef.current = false;
      sessionErroredRef.current = true;
      setStatus('idle');
      setError(event.error === 'not-allowed'
        ? 'Microphone access is needed to record your journal.'
        : 'Something interrupted the recording. Please try again.');
    };

    recognition.onend = () => {
      if (keepListeningRef.current) {
        try {
          recognition.start();
        } catch {
          keepListeningRef.current = false;
          setStatus('idle');
          setError('The recording stopped unexpectedly. Please try again.');
        }
        return;
      }

      if (!sessionErroredRef.current) saveTranscript();
    };

    recognitionRef.current = recognition;
    setStatus('listening');

    try {
      recognition.start();
    } catch {
      keepListeningRef.current = false;
      setStatus('idle');
      setError('Unable to start the microphone. Please try again.');
    }
  };

  const finishJournal = () => {
    keepListeningRef.current = false;
    setStatus('processing');
    recognitionRef.current?.stop();
  };

  const handlePrimaryAction = () => {
    if (status === 'idle' || status === 'saved') startJournal();
    if (status === 'listening') finishJournal();
  };

  return (
    <div className="app-panel min-h-[calc(100dvh-8.5rem)] px-4 py-10 sm:px-8 sm:py-14">
      <div className="app-panel-backdrop" />
      <div className="app-panel-content">
      <section className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200/70">Your reflections</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">Journal</h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-blue-100/70">
          Speak what’s on your heart. Saved entries stay on this device.
        </p>

        <div className="mt-10 flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-inner shadow-black/30">
          <div className={`flex h-24 w-24 items-center justify-center rounded-full transition ${
            status === 'listening'
              ? 'animate-pulse bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.45)]'
              : 'bg-emerald-400 text-emerald-950 shadow-[0_0_30px_rgba(52,211,153,0.25)]'
          }`}>
            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path strokeLinecap="round" d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
            </svg>
          </div>
        </div>

        <p className="mt-6 min-h-6 text-sm font-semibold text-blue-100/75" aria-live="polite">
          {status === 'idle' && 'Tap to begin'}
          {status === 'listening' && 'Listening… say whatever comes to mind'}
          {status === 'processing' && 'Transcribing your reflection…'}
          {status === 'saved' && 'Saved to your journal'}
        </p>

        <button
          type="button"
          onClick={handlePrimaryAction}
          disabled={status === 'processing'}
          className={`mt-4 w-full max-w-md rounded-2xl px-8 py-5 text-lg font-extrabold tracking-wide shadow-xl shadow-black/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-wait disabled:opacity-70 ${
            status === 'listening'
              ? 'border border-red-300/60 bg-red-500 text-white hover:bg-red-400'
              : 'border border-emerald-300/60 bg-emerald-400/90 text-emerald-950 hover:bg-emerald-400'
          }`}
        >
          {status === 'idle' && 'Start journal'}
          {status === 'listening' && 'Done'}
          {status === 'processing' && 'Transcribing…'}
          {status === 'saved' && 'Saved ✓'}
        </button>

        {error ? <p className="mt-4 text-sm text-red-200" role="alert">{error}</p> : null}
      </section>

      <section className="mx-auto mt-14 max-w-2xl">
        <h2 className="text-lg font-bold text-white">Past entries</h2>
        {entries.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-blue-100/55">
            Your spoken reflections will appear here.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {entries.map((entry, index) => (
              <article key={`${entry.date}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-inner shadow-black/20">
                <time className="text-xs font-bold uppercase tracking-[0.14em] text-blue-200/60">{entry.date}</time>
                <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-blue-50/90">{entry.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
