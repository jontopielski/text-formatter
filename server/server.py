from flask import Flask, request, jsonify
import random, string, json
import tinys3
import os, time
# from sklearn.svm import SVC
from textblob import TextBlob
# import nltk
# from nltk.tokenize import RegexpTokenizer
# import numpy as np

app = Flask(__name__)

aws_access_id = ''
aws_secret_id = ''
s3_bucket_url = 'https://s3-us-west-2.amazonaws.com/resume-gen/resumes'

def populate_aws_credentials():
  global aws_access_id
  global aws_secret_id
  f = open('.aws_credentials', 'r+')
  keys = f.read().splitlines()
  aws_access_id = keys[0]
  aws_secret_id = keys[1]
  f.close()

@app.route('/')
def hello_world():
  return 'Hello, World!'


@app.route('/api/hash', methods=['GET'])
def create_hash():
  print 'Creating new hash code..'
  hash_code = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(16))
  print 'Created new hash code: %s' % hash_code

  return jsonify(hash_code)

@app.route('/api/process', methods=['POST'])
def process_string():
  try:
    json_body = json_loads_byteified(json.dumps(request.get_json(), ensure_ascii=False))
  except:
    return error_message('Unable to convert json in request body to readable format.')

  if json_body is None:
    return error_message('No valid json found in request body.')

  print json_body

  if json_body['inputString'] is None:
    return error_message('inputString not found in request body.')

  input_string = json_body['inputString']

  if input_string == '':
    return error_message('inputString is empty.')

  blob = TextBlob(input_string)
  POS_tags = blob.tags
  first_word = POS_tags[0]

  output_data = {
    'sentiment_score': blob.sentiment.polarity,
    'subjectivity_score': blob.sentiment.subjectivity,
    'is_verb': first_word[1][:2] == 'VB'
  }

  return jsonify(output_data)

@app.route('/api/pages', methods=['POST'])
def update_page():
  if 'hashId' not in request.args:
      return error_message('hashId missing from request arguments.')

  hash_code = request.args['hashId']
  print hash_code

  try:
    json_body = json_loads_byteified(json.dumps(request.get_json(), ensure_ascii=False))
  except:
    return error_message('Unable to convert json in request body to readable format.')

  if json_body is None:
    return error_message('No valid json found in request body.')

  print json_body

  with open('editor_state.json', 'wrb') as json_file:
    json.dump(json_body, json_file)
  json_file = open('editor_state.json', 'rb')

  populate_aws_credentials()
  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  print 'Uploading file..'
  conn.upload('editor_state.json', json_file, 'paraform/pages/%s' % hash_code)

  return jsonify('Ok')

def error_message(message):
  return jsonify({
    'error_message': message
    }
  )

def json_load_byteified(file_handle):
    return byteify(
        json.load(file_handle, object_hook=byteify),
        ignore_dicts=True
    )

def json_loads_byteified(json_text):
    return byteify(
        json.loads(json_text, object_hook=byteify),
        ignore_dicts=True
    )


def byteify(data, ignore_dicts = False):
    # if this is a unicode string, return its string representation
    if isinstance(data, unicode):
        return data.encode('utf-8')
    # if this is a list of values, return list of byteified values
    if isinstance(data, list):
        return [ byteify(item, ignore_dicts=True) for item in data ]
    # if this is a dictionary, return dictionary of byteified keys and values
    # but only if we haven't already byteified it
    if isinstance(data, dict) and not ignore_dicts:
        return {
            byteify(key, ignore_dicts=True): byteify(value, ignore_dicts=True)
            for key, value in data.iteritems()
        }
    # if it's anything else, return it in its original form
    return data

if __name__ == "__main__":
  app.run()
