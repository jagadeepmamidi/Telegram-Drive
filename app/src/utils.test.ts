import { describe, expect, it } from 'vitest';
import {
  formatBytes,
  isAudioFile,
  isImageFile,
  isMediaFile,
  isPdfFile,
  isVideoFile,
  sanitizeFilename,
} from './utils';

describe('formatBytes', () => {
  it('formats zero bytes', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
  });

  it('formats kilobytes', () => {
    expect(formatBytes(1024)).toBe('1 KB');
  });
});

describe('file type helpers', () => {
  it('detects media files', () => {
    expect(isVideoFile('clip.MP4')).toBe(true);
    expect(isAudioFile('song.flac')).toBe(true);
    expect(isMediaFile('song.flac')).toBe(true);
    expect(isImageFile('photo.webp')).toBe(true);
    expect(isPdfFile('notes.pdf')).toBe(true);
    expect(isVideoFile('readme.txt')).toBe(false);
  });
});

describe('sanitizeFilename', () => {
  it('replaces illegal characters', () => {
    expect(sanitizeFilename('bad:name?.txt')).toBe('bad_name_.txt');
  });

  it('falls back when name is empty after sanitization', () => {
    expect(sanitizeFilename('...')).toBe('file');
  });
});
