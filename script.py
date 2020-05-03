import os
import json
from string import Template



def processField(field):
    d = {'name': '', 'unique': 'false', 'required': 'false'}
    if 'name' in field:
        d['name'] = field['name']
    if 'unique' in field:
        d['unique'] = field['unique']
    if 'type' in field:
        d['type'] = field['type']
    if 'required' in field:
        d['required'] = field['required']
    field_template_file = open('./file_templates/models/simpleField.txt')
    field_template = Template(field_template_file.read())
    field = field_template.substitute(d)
    return field + ",\n\t\t"

print("1. Starting API Builder")

#Look for config.json file, throw error if not found
all_files = os.listdir("./")
config_file = None
if "config.json" in all_files:
    print("2. Config File Found")
    config_file = "config.json"
else:
    print("Error: Config file not found. Exiting")


if config_file:
    MODELS = None

    config_file = open(config_file)
    CONFIG = json.load(config_file)
    # print(CONFIG)    
    
    if "models" in CONFIG and len(CONFIG["models"]) >0:
        MODELS = CONFIG["models"]
        for MODEL in MODELS:
            print(MODEL["fields"])
            Pipe_Fields = ""
            Pipe_Timestamps = ""
            if "fields" in MODEL:
                for field in MODEL["fields"]:
                    Pipe_Fields += processField(field)
            if 'timestamps' in MODEL and MODEL['timestamps']:
                Pipe_Timestamps = '{timestamps: true}'

            d = {'ModelName':MODEL["name"],'Pipe_Fields': Pipe_Fields, 'Pipe_Timestamps': Pipe_Timestamps}
            model_template_file = open('./file_templates/models/model.txt')
            model_template = Template(model_template_file.read())
            model = model_template.substitute(d)
            
            f = open("./models/{ModelName}.js".format(ModelName= MODEL["name"]), "w")
            f.write(model)
            f.close()
            print(model)


        # print(MODELS)

