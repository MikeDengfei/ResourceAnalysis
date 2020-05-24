from api.form import LoginForm
from flask import request, flash
from common import utils
from models import ProjectInfo, Result, db
from common import const
from flask_login import login_user, current_user, logout_user
from common.response import reply, query_reply
import os.path as osp
import json

def get_releases():
    project_id = request.args.get("project_id")
    releases = db.session.execute('select id, version_num, release_desc, date, project_name from project_info where id='+project_id)
    rr = []
    for r in releases:
        print(r)
        tmp = {
            'project_id': r[0],
            'project_name': r[4],
            'version_num': r[1],
            'release_desc': r[2],
            'date': r[3]
        }
        rr.append(tmp)
    print(rr)
    return rr