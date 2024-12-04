import { Metadata } from "next";

export function metadataConstructor({
  title = "YK Innovations",
  description = "YK Innovations is here to help you bring your ideas to life",
  image = "url-preview-image.png",
  icons = "/favicon.ico",
  noIndex = false,
  customMetadata = {},
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  customMetadata?: Partial<Metadata>;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...customMetadata, // Merge custom metadata with default metadata
  };
}
