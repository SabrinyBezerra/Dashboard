#Fazendo consultas sobre Dia da Semana

from flask_restful import Resource, marshal_with, abort
from database.PgConector import *

class DiaSemana(Resource):

    # GET Acidentes
    def get(self):

        #Consulta SQL
        sql = 'select dia_semana, count(dia_semana) from public."MyData" group by dia_semana'

        cur.execute(sql)
        acidentePesquisa = cur.fetchall()
        #acidentePesquisa = cur.fetchall()[0]


        return acidentePesquisa
