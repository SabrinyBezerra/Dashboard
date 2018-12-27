#Fazendo conslutas de Causa Acidente

from flask_restful import Resource, marshal_with, abort
from database.PgConector import *

class CausaAcidente(Resource):

    # GET Acidentes
    def get(self):

        #Consulta SQL 
        sql = 'select causa_acidente, count(causa_acidente) from public."MyData" group by causa_acidente'

        cur.execute(sql)
        acidentePesquisa = cur.fetchall()
        #acidentePesquisa = cur.fetchall()[0]


        return acidentePesquisa
