# coding: utf-8
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import (
    BIGINT, VARCHAR, DATETIME, BOOLEAN, TINYINT, INTEGER, TIME, DATETIME
)
from flask_login import UserMixin
import functools
from datetime import datetime
from common import const
import logging

db = SQLAlchemy()


def ensure_session_removed(func):
    @functools.wraps(func)
    def _func(*args, **kws):
        try:
            return func(*args, **kws)
        finally:
            db.session.remove()

    return _func


def db_commit():
    try:
        db.session.commit()
        return True, '操作成功', const.code_success
    except Exception as exc:
        logging.warning(exc)
        return False, '数据库操作失败', const.code_db_err


class MySQLMixin(object):
    __table_args__ = {
        'mysql_engine': 'InnoDB',
        'mysql_charset': 'utf8mb4',
    }


class UserInfo(db.Model, MySQLMixin, UserMixin):
    id = db.Column(BIGINT(unsigned=True), primary_key=True)
    user_name = db.Column(VARCHAR(255), nullable=False)
    email = db.Column(VARCHAR(255), nullable=False)
    password = db.Column(VARCHAR(255), nullable=False)
   
    def update(self, data):
        self.password = data['password'] 
        
    def to_json(self):
        _dict = self.__dict__
        if "_sa_instance_state" in _dict:
            del _dict["_sa_instance_state"]
        return _dict

class ProjectInfo(db.Model, MySQLMixin):
    id = db.Column(BIGINT(unsigned=True), primary_key=True)
    user_name = db.Column(VARCHAR(255), nullable=False)
    project_name = db.Column(VARCHAR(255), nullable=False)
    description = db.Column(VARCHAR(1000), nullable=False)
    types = db.Column(VARCHAR(255), nullable=False)
    program_file = db.Column(VARCHAR(255), nullable=False)
    version_num = db.Column(BIGINT(unsigned=True), primary_key=True)
    release_desc = db.Column(VARCHAR(255))
    date = db.Column(DATETIME)
    def update(self, data):
        self.project_name = data['project_name'] 
        self.description = data['description']
        self.types = data['types']
        if 'program_file' in data:
            self.program_file = data['program_file']

    __mapper_args__ = {
            "order_by": version_num.desc()
    }

    def to_json(self):
        _dict = self.__dict__
        if "_sa_instance_state" in _dict:
            del _dict["_sa_instance_state"]
        return _dict

class Result(db.Model, MySQLMixin):
    id = db.Column(BIGINT(unsigned=True), primary_key=True)
    project_id = db.Column(BIGINT(unsigned=True))
    flag = db.Column(VARCHAR(1))
    socket = db.Column(VARCHAR(5))
    process = db.Column(VARCHAR(5))
    memory = db.Column(VARCHAR(5))
    db_connection = db.Column(VARCHAR(5))
    file_handler = db.Column(VARCHAR(5))
    thread = db.Column(VARCHAR(5))
    available = db.Column(VARCHAR(1))
    version_num = db.Column(BIGINT(unsigned=True))
    def to_json(self):
        _dict = self.__dict__
        if "_sa_instance_state" in _dict:
            del _dict["_sa_instance_state"]
        return _dict

class Configuration(db.Model, MySQLMixin):
    id = db.Column(BIGINT(unsigned=True), primary_key=True)
    socket = db.Column(VARCHAR(5))
    process = db.Column(VARCHAR(5))
    memory = db.Column(VARCHAR(5))
    db_connection = db.Column(VARCHAR(5))
    file_handler = db.Column(VARCHAR(5))
    thread = db.Column(VARCHAR(5))
    def to_json(self):
        _dict = self.__dict__
        if "_sa_instance_state" in _dict:
            del _dict["_sa_instance_state"]
        return _dict