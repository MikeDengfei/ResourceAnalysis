# coding: utf-8
from api.form import LoginForm
from flask import request, flash
from common.utils import param_error
from models import UserInfo
from common import const
from flask_login import login_user, current_user, logout_user
from common.response import reply
import logging
import json

def login():
    data = request.get_json()
    user = UserInfo.query.filter_by(
        user_name=data["user_name"]
    ).first()
    if not user or user.password != data['password']:
        return reply(
            success=False,
            message="username or password is wrong!"
        )
    login_user(user)
    flash("login successfully!")
    return reply(
        success=True,
        message="登陆成功",
    )

def logout():
    logout_user()

