import React from 'react';

export const LazyMediaPlayer = React.lazy(() =>
  import('../desktop/dashboard/MediaPlayer').then((m) => ({ default: m.MediaPlayer }))
);

export const LazyPdfViewer = React.lazy(() =>
  import('../desktop/dashboard/PdfViewer').then((m) => ({ default: m.PdfViewer }))
);

export function PreviewLoadingFallback() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-telegram-primary" />
    </div>
  );
}
