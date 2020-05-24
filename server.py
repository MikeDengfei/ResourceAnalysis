# coding: utf-8
from flask import render_template
import api
from models import db, UserInfo
from flask_login import LoginManager, login_required, current_user
from config import config
from app import app
import argparse

parser = argparse.ArgumentParser(description="set ip")
parser.add_argument('--ip', type=str, default='127.0.0.1')
args = parser.parse_args()

db.init_app(app)
db.app = app
db.create_all()
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "http://localhost:5000"

@login_manager.user_loader
def load_user(userid):
    return UserInfo.query.get(int(userid))
  
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['Post'])
def login():
    reply = api.login()
    return reply

@app.route('/register', methods=['Post'])
def register():
    reply = api.register()
    return reply


@app.route('/create', methods=["Get"])
@login_required
def create():
    return render_template("create.html", username = current_user.user_name)
  
@app.route('/logout')
@login_required
def logout():
    api.logout()
    return render_template('index.html')

@app.route('/project/create', methods=["Post"])
@login_required
def create_project():
    return api.create_project()

@app.route('/project/result', methods=["Get"])
@login_required
def get_result():
    project_info = api.get_project()
    static_result, dynamic_result = api.get_result()
    return render_template('project_result.html', 
        username=current_user.user_name, 
        project_info=project_info,
        static_result=static_result,
        dynamic_result=dynamic_result)

@app.route('/project/get_result', methods=["Post"])
@login_required
def result():
    reply = api.result()
    print(reply)
    return reply

@app.route('/project/get_configuration', methods=['Post'])
@login_required
def get_configuration():
    reply = api.get_configuration()
    print(reply)
    return reply

@app.route('/project/modify', methods=["Get"])
@login_required
def modify():
    project_info = api.get_project()
    types = {
        'Database connection': False,
        'Process': False,
        'Thread': False,
        'Socket': False,
        'File handler': False,
        'Memory': False
    }
    for type in project_info['types']:
        types[type] = True
        
    return render_template('project_modify.html', 
        username=current_user.user_name, 
        project_info=project_info,
        types = types)

@app.route('/project/modify_project', methods=["Post"])
@login_required
def modify_project():
    return api.update_project()    

@app.route('/project/list', methods=["Get"])
@login_required
def project_list():
    project_list, pro_size = api.get_all_project()
    return render_template("project_list.html", 
        project_list=project_list, project_size=pro_size, username = current_user.user_name)

@app.route('/modify_pwd', methods=["Get"])
@login_required
def modify_pwd():
    return render_template("modify_pwd.html", username = current_user.user_name)

@app.route('/update_pwd', methods=["Post"])
@login_required
def update_pwd():
    return api.update_pwd()

@app.route('/project/releases', methods=["Get"])
@login_required
def project_releases():
    project_info = api.get_project()
    releases = api.get_releases()
    return render_template('project_releases.html', 
        username=current_user.user_name, 
        project_info=project_info,
        releases = releases)

@app.route('/project/details', methods=["Get"])
@login_required
def project_details():
    project_info = api.get_project()
    return render_template('project_details.html', 
        username=current_user.user_name, 
        project_info=project_info)

@app.route('/project/version', methods=['Get'])
@login_required
def project_version():
    project_info = api.get_project_by_version()
    return render_template('project_version.html',
        username=current_user.user_name,
        project_info=project_info)
    


if __name__ == '__main__':
    app.run(host=args.ip, port=80, debug=True)
