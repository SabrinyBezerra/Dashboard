#Faznedo cunsultas sobre o sexo dos involvidos
from flask_restful import Resource, marshal_with, abort
from database.PgConector import *

class Sexo(Resource):

    # GET Acidentes
    def get(self):

    #Consulta SQL
        sql = 'select sexo, count(sexo) from public."MyData" group by sexo'

        cur.execute(sql)
        acidentePesquisa = cur.fetchall()
        #acidentePesquisa = cur.fetchall()[0]


        return acidentePesquisa
