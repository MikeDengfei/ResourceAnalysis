# coding: utf-8
import wtforms

from wtforms.validators import *


class LoginForm(wtforms.Form):
    user_name = wtforms.StringField(validators=[DataRequired()])
    password = wtforms.StringField(validators=[DataRequired()])