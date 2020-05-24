# coding: utf-8
from api.form import LoginForm
from flask import request, flash
from common import utils
from models import ProjectInfo, Result, db, Configuration
from common import const
from flask_login import login_user, current_user, logout_user
from common.response import reply, query_reply
import os.path as osp
import json
import time

def create_project():
    program = request.files["program"]
    program.save(osp.join("program", program.filename))
    project_name = request.form.get("project_name")
    description = request.form.get("description")
    types = request.form.get("types")

    project = {
        "user_name": current_user.user_name,
        "project_name": project_name,
        "description": description,
        "types": types,
        "program_file": program.filename,
        "version_num":1,
        "date": time.strftime("%Y-%m-%d ",time.localtime(time.time()))+time.strftime("%H:%M:%S",time.localtime(time.time()))
    }

    res = utils.add_by_data(ProjectInfo, project) 
    project = ProjectInfo.query.filter_by(project_name=project_name).first()

    add_result(project.id, project.version_num)   
    return reply(success=res[0], message=res[1])

def add_result(project_id, version_num):
    static_result = {
        "project_id":project_id,
        "version_num": version_num,
        "flag":0,
        "available":0
    }
    dynamic_result = {
        "project_id":project_id,
        "version_num": version_num,
        "flag":1,
        "available":0
    }
    utils.add_by_data(Result, static_result)
    utils.add_by_data(Result, dynamic_result)


def get_project():
    project_id = request.args.get("project_id")
    project = ProjectInfo.query.filter_by(id=project_id).first()
    project_info = {
        'project_id': project.id,
        'user_name': project.user_name,
        'project_name': project.project_name,
        'description': project.description,
        'types': project.types.split(','),
        'program_file':project.program_file,
        'version_num':project.version_num
    }
    return project_info

def get_project_by_version():
    project_id = request.args.get('project_id')
    version_num = request.args.get('version_num')
    project = ProjectInfo.query.filter_by(id=project_id, version_num=version_num).first()
    project_info = {
        'project_id': project.id,
        'user_name': project.user_name,
        'project_name': project.project_name,
        'description': project.description,
        'types': project.types.split(','),
        'program_file':project.program_file,
        'version_num':project.version_num
    }
    return project_info

def get_result():
    project_id = request.args.get("project_id")
    result = Result.query.filter_by(project_id=project_id).all()
    if result[0].flag==0: #0-static   
        static_re = result[0]
        dynamic_re = result[1]
    else:
        static_re = result[0]
        dynamic_re = result[1] 
          
    static_result = {
        'Socket': static_re.socket,
        'Process': static_re.process,
        'Memory': static_re.memory,
        'DB connection': static_re.db_connection,
        'File handler': static_re.file_handler,
        'Thread': static_re.thread
    }
    dynamic_result = {
        'Socket': dynamic_re.socket,
        'Process': dynamic_re.process,
        'Memory': dynamic_re.memory,
        'DB connection': dynamic_re.db_connection,
        'File handler': dynamic_re.file_handler,
        'Thread': dynamic_re.thread
    }
    return static_result, dynamic_result

def get_all_project():
    # project = ProjectInfo.query.filter_by(user_name=current_user.user_name).all()
    project1 = db.session.execute('select * from project_info where (id, version_num) in (select id, max(version_num) from project_info where user_name=\''+current_user.user_name+'\' group by id)')
    project=[]
    for p in project1:
        pp = {
            'id': p[0],
            'user_name': p[1],
            'project_name': p[2],
            'description': p[3],
            'types':p[4].split(','),
            'program_file': p[5],
            'version_num': p[6]}
        project.append(pp)
        
    # for i in range(len(project)):
    #     project[i].types = project[i].types.split(',')
    return project, len(project)

def update_project():
    project_id = request.form.get("project_id")
    project_name = request.form.get("project_name")
    description = request.form.get("description")
    release_desc = request.form.get("release_desc")
    types = request.form.get("types")
    flag = int(request.form.get("flag"))
    
    project_info = ProjectInfo.query.filter_by(id=project_id).first()
    
    project = {
        "project_name": project_name,
        "description": description,
        "types": types,
        "date": time.strftime("%Y-%m-%d ",time.localtime(time.time()))+time.strftime("%H:%M:%S",time.localtime(time.time()))
    }

    if flag == 1:# create a new version
        program = request.files["program"]
        program.save(osp.join("program", program.filename))
        project["id"] = project_info.id
        project["program_file"] = program.filename
        project['release_desc'] = release_desc
        project['version_num'] = project_info.version_num+1
        project['user_name'] = project_info.user_name
        res =  utils.add_by_data(ProjectInfo, project)
        add_result(project_info.id, project_info.version_num+1)
    else:
        res = utils.update_by_data(project_info, project) 

    return reply(success=res[0], message=res[1])

def result():
    project_id = request.form.get("project_id")
    version_num = request.form.get("version_num")
    flag = request.form.get('flag')
    re = Result.query.filter_by(project_id=project_id, version_num=version_num, flag=flag).first()
    if(re.available=='1'):          
        data = {
            'Socket': re.socket,
            'Process': re.process,
            'Memory': re.memory,
            'DB connection': re.db_connection,
            'File handler': re.file_handler,
            'Thread': re.thread
        }
        print(data)
        return reply(success=True, data=data)
    return reply(success=False)

def get_configuration():
    project_id = request.form.get("project_id")
    re = Configuration.query.filter_by(id=project_id).first()
    data = {
            'Socket': re.socket,
            'Process': re.process,
            'Memory': re.memory,
            'DB connection': re.db_connection,
            'File handler': re.file_handler,
            'Thread': re.thread
        }
    return reply(success=True, data=data)
