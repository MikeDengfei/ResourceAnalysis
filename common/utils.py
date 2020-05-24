# coding: utf-8

import json
from common import const
from datetime import datetime
from models import db, db_commit
import logging


def param_error(errors):
    return {
        'code_success': False,
        'message': '参数错误:%s。' % json.dumps(errors)
    }


def add_by_data(table, data, do_commit=True):
    record = table(**data)
    db.session.add(record)
    resp = [True, '', const.code_success]
    if do_commit:
        resp = db_commit()
    return resp


def update_by_data(records, update_data, do_commit=True):
    records.update(update_data)
    resp = [True, '', const.code_success]
    if do_commit:
        resp = db_commit()
    return resp

