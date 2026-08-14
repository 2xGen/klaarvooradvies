import type { Metadata } from "next";
import { HypotheekTopicPage } from "@/components/HypotheekTopicPage";
import { getHypotheekTopic } from "@/lib/hypotheekTopicPages";

const topic = getHypotheekTopic("hypotheek-met-lening")!;

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
  alternates: { canonical: `/${topic.slug}` },
  openGraph: { title: topic.title, description: topic.description },
};

export default function Page() {
  return <HypotheekTopicPage topic={topic} />;
}
