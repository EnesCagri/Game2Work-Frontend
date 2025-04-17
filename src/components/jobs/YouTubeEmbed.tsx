interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-900/50 border border-gray-800">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "Job Description Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
