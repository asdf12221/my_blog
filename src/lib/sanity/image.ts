import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./client";

const builder = createImageUrlBuilder({
  projectId: projectId ?? "abc12345",
  dataset: dataset ?? "production",
});

type ImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: ImageSource) {
  return builder.image(source);
}
