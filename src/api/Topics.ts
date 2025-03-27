export async function fetchTopics() {
    const FORUM_DOMAIN = "https://forum.sparcles.dev/";
    const LATEST_TOPICS = "latest.json?order=created&ascending=false";

    const SINGLE_POST = (id: number) => `posts/${id}.json`;
    const SINGLE_TOPIC = (id: number) => `t/${id}.json`;

    const parseThumbnail = async (postId: number) => {
        const postResponse = await fetch(FORUM_DOMAIN + SINGLE_POST(postId));
        const postData = await postResponse.json();
        const content = postData.raw;
        const match = content.match(/\[comment\]: <(.*?)>/);
        return match ? match[1] : '';
    };

    const parseTopic = async (topic: any) => {
        const title = topic.title;
        const icon = topic.image_url.startsWith("https:") ? topic.image_url : "https:" + topic.image_url;
        const link = `${FORUM_DOMAIN}t/${topic.slug}/${topic.id}`;
        const thumbnail = await parseThumbnail(topic.post_stream.posts[0].id);
        return {
            icon,
            title,
            description: thumbnail,
            link,
        };
    };

    try {
        const response = await fetch(FORUM_DOMAIN + LATEST_TOPICS);
        if (!response.ok) {
            throw new Error(`Failed to fetch topics: ${response.statusText}`);
        }
        const data = await response.json();
        const topics = data.topic_list.topics;

        const parsedTopics = [];
        for (const topic of topics) {
            if (parsedTopics.length === 2) break;
            const topicDetailsResponse = await fetch(FORUM_DOMAIN + SINGLE_TOPIC(topic.id));
            const topicDetails = await topicDetailsResponse.json();
            if (topicDetails.category_id === 7) {
                parsedTopics.push(await parseTopic(topicDetails));
            }
        }

        return parsedTopics;
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
}
