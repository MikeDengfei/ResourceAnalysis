# coding: utf-8
from models import *
from common import  utils
from common.response import *
from flask import request
import logging
import json
from flask_login import login_user, current_user, logout_user

def register():
    data = request.get_json()
    user_exist = UserInfo.query.filter_by(
        user_name=data["user_name"]
    ).first()
    if user_exist:
        return reply(success=False, message='user exists!')

    user_exist = UserInfo.query.filter_by(
        email=data["email"]
    ).first()
    if user_exist:
        return reply(success=False, message='email has been registered!')

    user_data = {
        'user_name': data["user_name"],
        'email': data["email"],
        'password': data["password"],
    }
    res = utils.add_by_data(UserInfo, user_data)
    return reply(success=res[0], message=res[1])

def update_pwd():
    old_pwd = request.form.get("old_pwd")
    new_pwd = request.form.get("new_pwd")
    print(old_pwd, new_pwd)
    user = UserInfo.query.filter_by(
        user_name=current_user.user_name
    ).first()
    print(user.password)
    if old_pwd!=user.password:
        return reply(success=False, message='old password is wrong!')
    
    pwd = {'password':new_pwd}
    res = utils.update_by_data(user, pwd)
    return reply(success=res[0], message=res[1])
    
