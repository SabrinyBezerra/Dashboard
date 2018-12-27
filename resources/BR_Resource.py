#Fazendo consultas de BR
from builtins import print

from flask_restful import Resource, marshal_with, abort
from database.PgConector import *

class BR_Acidente(Resource):

        # GET Acidentes
        #Excecoes do mapa do Brasil, no qual os estados do Acre e de Roraima estao apenas com numeros e nao sua sigla
        def get(self, estado):
            if (estado == "BR.1099"):
                estado = "AC"
            elif (estado == "BR.153"):
                estado = "RO"
            else:
                estado = estado[3] + estado[4]

        #consulta SQL ao PostgreSQL
            cur.execute(
                'select BR, count(BR) from public."MyData" where uf like \'{}\' group by BR'.format(estado))
        
            acidentePesquisa = cur.fetchall()
            # acidentePesquisa = cur.fetchall()[0]

            return acidentePesquisa
