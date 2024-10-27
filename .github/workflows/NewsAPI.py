import os, sys
import re
import subprocess
import json

try:
    import requests
except Exception as e:
    subprocess.run([sys.executable, 'pip', 'install', 'requests'])
    subprocess.run([sys.executable, '-m', 'pip', 'install', 'requests'])
    import requests


WORKSPACE = ''
ci_deploy = False
try:
    if os.environ('GITHUB_WORKSPACE'):
        WORKSPACE = os.getenv('GITHUB_WORKSPACE')
        ci_deploy = True
except Exception as e:
    WORKSPACE = os.getcwd()
    print("NewsAPI: script is not run by a part of CI, behaviour is undefined.")

#DISCOURSE_KEY = os.environ['DISCOURSE_KEY']
#if not DISCOURSE_KEY or DISCOURSE_KEY == "":
#    raise Exception("NewsAPI: No Discourse key was provided.")


FORUM_DOMAIN = "https://forum.sparcles.dev/"
LATEST_TOPICS = "latest.json?order=created&ascending=false"
RELATIVE_OUTPUT_PATH = "src/data/news.json"
def SINGLE_POST(id): return f"posts/{id}.json"
def SINGLE_TOPIC(id): return f"t/{id}.json"

def parse_thumbnail(post_id):
    post_response = requests.get(FORUM_DOMAIN + SINGLE_POST(post_id)).json()
    content = post_response['raw']
    thumbnail = ''
    match = re.search(r'\[comment\]: <(.*?)>', content)
    if match:
        thumbnail = match.group(1)
    return thumbnail

def parse_topic(topic):
    title = topic['title']

    icon = ''
    if topic['image_url']:
        icon = "https:" + topic['image_url']

    link = FORUM_DOMAIN + f"t/{topic['slug']}/{topic['id']}"
    thumbnail = parse_thumbnail(topic['post_stream']['posts'][0]['id'])
    json = {
        "icon" : icon,
        "title" : title,
        "description" : thumbnail,
        "link" : link
    }
    return json

request_failed = false
try:
    latest_topics = requests.get(FORUM_DOMAIN + LATEST_TOPICS).json()
except ConnectionError:
    print("NewsAPI: (error) failed to connect. Aborting.")
    request_failed = True
except Timeout:
    print("NewsAPI: (error) the request timed out. Aborting.")
    request_failed = True
except RequestException as e:
    print(f"NewsAPI: (error) aborting. An error occurred: {e}")
    request_failed = True

if request_failed:
    if ci_deploy:
        sys.exit(0)
    else:
        sys.exit(1)

i = 0
parsed_topics = []
for latest_topic in latest_topics['topic_list']['topics']:
    if i == 2:
        break

    topic = requests.get(FORUM_DOMAIN + SINGLE_TOPIC(latest_topic['id'])).json()
    if topic['category_id'] == 7:
        parsed_topics.append(parse_topic(topic))
        i += 1

output_json = {
    "news" : parsed_topics
}

output_path = WORKSPACE + '/' + RELATIVE_OUTPUT_PATH
print(f"NewsAPI: output path is '{output_path}'")

with open(output_path, "w") as outfile:
    json.dump(output_json, outfile)
