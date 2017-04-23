from flask import Flask, request, jsonify
from pylatex import Document, Section, Subsection, Command, Package, UnsafeCommand, Tabular
from pylatex.base_classes import Environment
from pylatex.utils import italic, NoEscape
from jsonschema import validate, ValidationError, SchemaError
import random, string, json
import tinys3
import sys, fileinput
import requests
import os, time

app = Flask(__name__)

aws_access_id = ''
aws_secret_id = ''
s3_bucket_url = 'https://s3-us-west-2.amazonaws.com/resume-gen/resumes'

class RSectionEnv(Environment):
  _latex_name = 'rSection'

class rSubsectionEnv(Environment):
  _latex_name = 'rSubsection'

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

def fill_document(doc):
  """Add a section, a subsection and some text to the document.

  :param doc: the document
  :type doc: :class:`pylatex.document.Document` instance
  """
  with doc.create(Section('A section')):
      doc.append('Some regular text and some ')
      doc.append(italic('italic text. '))

      with doc.create(Subsection('A subsection')):
          doc.append('Also some crazy characters: $&#{}')

@app.route('/api/hash', methods=['GET'])
def create_hash():
  print 'Creating new hash code..'
  hash_code = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(16))
  print 'Created new hash code: %s' % hash_code

  return jsonify(hash_code)

@app.route('/api/initialize', methods=['POST'])
def initialize_user_data():
  if 'hashId' not in request.args:
      return error_message('hashId missing from request arguments.')

  hash_code = request.args['hashId']

  with open('resume.json', 'wrb') as json_file:
    json.dump({}, json_file)

  r = requests.get(s3_bucket_url + '/%s/resume.pdf' % hash_code)

  if r.status_code == 200:
    return error_message('User data already exists for the given hash code. No need to initialize.')

  populate_aws_credentials()
  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  json_file = open('resume.json', 'rb')
  empty_resume_file = open('empty-resume.pdf', 'rb')
  conn.upload('resume.pdf', empty_resume_file, 'resume-gen/resumes/%s' % hash_code)
  conn.upload('resume.json', json_file, 'resume-gen/resumes/%s' % hash_code)
  json_file.close()

  return jsonify('Ok')

@app.route('/api/generate', methods=['POST'])
def generate_latex():
  if 'hashId' not in request.args:
      return error_message('hashId missing from request arguments.')

  hash_code = request.args['hashId']

  try:
    json_body = json_loads_byteified(json.dumps(request.get_json(), ensure_ascii=False))
  except:
    return error_message('Unable to convert json in request body to readable format.')

  if json_body is None:
    return error_message('No valid json found in request body.')

  # TODO: Fix JSON Validation once JSON schema is determined
  # if (not is_json_valid(json_body)):
    # return error_message('Problem validating json in request body with json-schema.')
  print json_body

  doc = Document('resume', documentclass='resume')

  geometry_options = 'left=0.25in,top=0.25in,right=0.25in,bottom=0.25in'
  doc.preamble.append(Package('geometry', options=geometry_options))

  resume_sections = json_body['sections'] if 'sections' in json_body else []

  section_dict = {}
  for i in range(0, len(resume_sections)):
    section_dict[resume_sections[i]['sectionName']] = resume_sections[i]

  if 'header' in section_dict:
    header_data = section_dict['header']
    # TODO: Perform phone number and email validation on FE
    phone_number = header_data['phoneNumber']
    phone_number_first_part = phone_number[0:3] if len(phone_number) >= 3 else phone_number[0:]
    phone_number_second_part = phone_number[3:6] if len(phone_number) >= 6 else phone_number[3:]
    phone_number_third_part = phone_number[6:10] if len(phone_number) >= 10 else phone_number[6:]
    # phone_number_str = ('(%s)~$\cdot$~%s~$\cdot$~%s' % (
    phone_number_str = ('(%s) %s - %s' % (
      phone_number_first_part,
      phone_number_second_part,
      phone_number_third_part
    ))
    phone_num_sanitized = sanitizeString(phone_number_str) + ' \\\\' if len(phone_number) > 0 else ''
    address_str = ('%s \\\\' % sanitizeString(header_data['address'])) if header_data['address'] != '' else ''
    website_str = ('%s \\\\' % sanitizeString(header_data['website'])) if header_data['website'] != '' else ''
    email_str = ('%s' % sanitizeString(header_data['email'])) if header_data['email'] != '' else ''
    subheader_str = NoEscape('%s %s %s %s' % (
      address_str,
      phone_num_sanitized,
      website_str,
      email_str,
    ))
    doc.preamble.append(Command('name', header_data['name']))
    doc.preamble.append(Command('address', subheader_str))

  if 'education' in section_dict:
    with doc.create(RSectionEnv(arguments='Education')) as education_section:
      education_data = section_dict['education']
      grad_str = ('%s' % education_data['graduationDate']) if education_data['graduationDate'] != '' else ''
      university_str = NoEscape('{\\bf %s} \\hfill {\\em %s}' % (
        sanitizeString(education_data['school']),
        sanitizeString(grad_str)
      ))
      degree_str = NoEscape('\\\\ %s' % (sanitizeString(education_data['degreeType'])))
      education_section.append(university_str)
      education_section.append(degree_str)
      if 'gpa' in education_data and education_data['gpa'] != '':
        is_major_gpa_str = 'Major ' if education_data['isMajorGpa'] else ''
        max_gpa_str = ('/%s' % sanitizeString(education_data['maxGpa'])) if education_data['maxGpa'] != '' else ''
        gpa_str = NoEscape('\\\\ %sGPA: {\\bf %s%s}' % (
          is_major_gpa_str,
          sanitizeString(education_data['gpa']),
          max_gpa_str
        ))
        education_section.append(gpa_str)

  for i in range(0, len(resume_sections)):
    section_data = resume_sections[i]
    section_name = section_data['sectionName']
    if is_special_section(section_name) or len(section_data['listItems']) == 0 or section_data['sectionCount'] == 0:
      continue
    with doc.create(RSectionEnv(arguments=section_name.title())) as curr_section:
      section_items = section_data['listItems']
      for j in range(0, len(section_items)):
        curr_item = section_items[j]
        start_date_str = ('%s' % curr_item['startDate']) if curr_item['startDate'] != '' else ''
        end_date_str = (' - %s' % curr_item['endDate']) if curr_item['endDate'] != '' else ''
        date_worked_str = ('%s%s' % (start_date_str, end_date_str))
        description_items = section_items[j]['descriptionItems'] if len(section_items[j]['descriptionItems']) > 0 else []
        with doc.create(rSubsectionEnv(arguments=(
          curr_item['primaryText'],
          date_worked_str,
          curr_item['secondaryText'],
          curr_item['location'])
        )) as curr_subsection:
          if len(description_items) == 0:
            curr_subsection.append(NoEscape('\\item'))
          for k in range(0, len(description_items)):
            description_str = NoEscape('\\item %s' % sanitizeString(description_items[k]))
            curr_subsection.append(description_str)

  if 'skills' in section_dict and len(section_data['listItems']) != 0:
    with doc.create(RSectionEnv(arguments='Skills')) as skills_section:
      with doc.create(Tabular(NoEscape('@{} >{\\bfseries}l @{\\hspace{6ex}} l'))) as skills_table:
        skills_list = section_dict['skills']['listItems']
        for i in range(0, len(skills_list)):
          skill_name = sanitizeString(skills_list[i]['listName'])
          list_items = sanitizeString(skills_list[i]['items'])
          skills_str = NoEscape('%s & %s \\\\' % (skill_name, list_items))
          skills_table.append(skills_str)


  print 'Generating pdf..'
  doc.generate_pdf()
  doc.generate_tex()

  with open('resume.json', 'wrb') as json_file:
    json.dump(json_body, json_file)

  populate_aws_credentials()
  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  pdf_file = open('resume.pdf', 'rb')
  tex_file = open('resume.tex', 'rb')
  json_file = open('resume.json', 'rb')
  print 'Uploading file..'
  conn.upload('resume.pdf', pdf_file, 'resume-gen/resumes/%s' % hash_code)
  conn.upload('resume.tex', tex_file, 'resume-gen/resumes/%s' % hash_code)
  conn.upload('resume.json', json_file, 'resume-gen/resumes/%s' % hash_code)

  pdf_file.close()
  tex_file.close()
  json_file.close()

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
